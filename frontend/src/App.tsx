import './App.css';
import TransactionForm from './components/TransactionForm/TransactionForm';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TransactionView from './components//TransactionView/TransactionView';
import Home from './components/Home/Home';
import { useState } from 'react';

export interface Transaction {
  id: string;
  type: 'expense' | 'income';
  amount: number;
  category: string;
  note?: string;
  date: string;
}

function App() {

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  function addTransaction(tx: Transaction) {
    setTransactions(prev => [...prev, tx]);
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
