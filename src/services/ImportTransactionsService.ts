import csvParse from 'csv-parse';
import fs from 'fs';
import Transaction from '../models/Transaction';

class ImportTransactionsService {
  async execute(filePath: string): Promise<Transaction[]> {
    const contactsReadStream = fs.createReadStream(filePath);

    const parsers = csvParse({
      from_line: 2,
    });

    const transactions = [];
    const categories = [];

    const parserCSV = contactsReadStream.pipe(parsers);

    parserCSV.on('data', async line => {
      const [title, type, value, category] = line.map((cell: string) =>
        cell.trim(),
      );
      if (!title || !type || !value) return;

      categories.push(category);

      transactions.push({ title, type, value, category });
    });

    await new Promise(resolve => parserCSV.on('end', resolve));

    return {
      categories,
      transactions,
    };
  }
}

export default ImportTransactionsService;
