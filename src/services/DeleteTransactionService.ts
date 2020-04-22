import { getCustomRepository, getConnection } from 'typeorm';

import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionRepository = getCustomRepository(TransactionsRepository);

    const transaction = await transactionRepository.findOne(id);

    if (!transaction) {
      throw new AppError('Transaction does not exist');
    }

    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Transaction)
      .where('id = :id', { id })
      .execute();
  }
}

export default DeleteTransactionService;
