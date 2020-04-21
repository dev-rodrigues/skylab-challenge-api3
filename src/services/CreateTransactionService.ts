// import AppError from '../errors/AppError';
import { getCustomRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import TransactionRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const repository = getCustomRepository(TransactionRepository);

    const transaction = repository.create({
      title,
      value,
      type,
    });

    await repository.save(transaction);
    return transaction;
  }
}

export default CreateTransactionService;
