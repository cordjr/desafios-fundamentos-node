import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Transactions {
  transactions: Transaction[],
  balance: Balance
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transactions {
    return {transactions: this.transactions,
            balance: this.getBalance()};
  }

  public getBalance(): Balance {
     let income = this.transactions
                          .filter(t=>t.type == 'income')
                            .reduce((a, b)=> a + b.value, 0);
      let outcome = this.transactions
                            .filter(t=>t.type == 'outcome')
                              .reduce((a, b)=> a + b.value, 0);
      return {
        income,
        outcome,
        total: income - outcome
      }
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    let trans = new Transaction({title, value, type});
    this.transactions.push(trans);
    return trans;
  }
}

export default TransactionsRepository;
