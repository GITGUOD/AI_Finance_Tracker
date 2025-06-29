import './App.css';
import TransactionForm from './components/TransactionForm/TransactionForm';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TransactionView from './components//TransactionView/TransactionView';
import Home from './components/Home/Home';
import { useEffect, useState } from 'react';
import axios from 'axios';

//Export i typescript är som att göra filen static, så alla alla komponenter kan använda de
export interface Transaction {
  id: string;
  type: 'expense' | 'income';
  amount: number;
  category: string;
  note?: string;
  date: string;
}

function App() {

  //Skapar en state variable transactions som är typen Transaction[], initieras som en tom Array
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Hämta transactions från backend när komponenten laddas
  useEffect(() => {
    axios.get<Transaction[]>('http://localhost:5000/api/transactions')
      .then(response => setTransactions(response.data))
      .catch(err => console.error('Failed to fetch transactions', err));
  }, []);

  //Tar in en transaction objekt, kopierar alla prev transaktioner med operanden '...' och lägg till den nya transaktionen
  function addTransaction(transaction: Transaction) {
    setTransactions(prev => [...prev, transaction]);
  }
  
  return (
    <Router>
      <Routes>
        {/*When route is by default '/'. Path is directed towards /home*/}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />

        {/*Path is directed towards /form and the element is the imported Transaction form component*/}

        <Route path="/form" element={<TransactionForm type="expense" amount="" category="" note="" onAddTransaction={addTransaction}/>} />

        {/*View Transactions*/}

        <Route path="/transactions" element={<TransactionView transactions={transactions} />} />

        {/*Else, 404 error, not found site*/}

        <Route path="*" element={<div>404 - Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
