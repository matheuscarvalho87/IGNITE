import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { api } from '../services/api';

interface Transaction{
  id:string,
  title:string,
  type:string,
  category:string,
  amount:number,
  createdAt: string
}
interface TransactionsProviderProps{
  children: ReactNode;
}
//POde ser dessa forma ou =>>
// interface TransacitionInput{
//   title:string,
//   type:string,
//   category:string,
//   amount:number
// }

//OUTRA FORMA
type TransactionInput = Omit<Transaction,'id' | 'createdAt'>;
//OUTRA FORMA
//type TransactionInput = Pick<Transaction,'title' | 'amount' | 'type'| 'category'>;

interface TransactionsContextData{
  transactions: Transaction[];
  createTransaction: (transaction:TransactionInput )=> Promise<void>;
}

 const TransactionsContext = createContext<TransactionsContextData>(
  //esse erro nao tem como corrigir por isso passa 'as TransactionsContextData'
  {} as TransactionsContextData
  );

export function TransactionProvider({children}:TransactionsProviderProps){
  const [transactions,setTransactions] = useState<Transaction[]>([])
  
  useEffect(()=>{
   api.get('/transactions')
    .then(response =>setTransactions(response.data.transactions))
  },[])

  async function createTransaction(transactionInput:TransactionInput){
    const response = await api.post('/transactions',{
     ...transactionInput,
     createdAt:new Date()
    })
    const { transaction } = response.data;
    setTransactions([...transactions,transaction])
  }

  return (
    <TransactionsContext.Provider value={{transactions,createTransaction}}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions(){
  const context = useContext(TransactionsContext);

  return context;
}