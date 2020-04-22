// import AppError from '../errors/AppError';
import { getCustomRepository, getRepository } from 'typeorm';

import Transaction from '../models/Transaction';
import Category from '../models/Category';

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
    const repositoryTransaction = getCustomRepository(TransactionRepository);
    const repositoryCategory = getRepository(Category);

    // verificar se categoria já existe
    let transactionCategory = await repositoryCategory.findOne({
      where: {
        title: category,
      },
    });

    if (!transactionCategory) {
      transactionCategory = repositoryCategory.create({ title: category });
      await repositoryCategory.save(transactionCategory);
    }

    const transaction = repositoryTransaction.create({
      title,
      value,
      type,
      category: transactionCategory,
    });

    await repositoryTransaction.save(transaction);
    return transaction;
  }
}

export default CreateTransactionService;
