import { request, response, Router } from 'express';
import uuid from 'uuidv4';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    console.log(" transactions ", transactionsRepository.all());
    return response.json(transactionsRepository.all());

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});
transactionRouter.get('/hello', (request, response)=>{
  return response.json({message: 'hello'})
})

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type} = request.body;
    const createTransaction = new CreateTransactionService(transactionsRepository);
    const trasaction = createTransaction.execute({title, value, type});
     
     return response.json(trasaction);
    
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
