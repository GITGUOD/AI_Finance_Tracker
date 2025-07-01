import './App.css';
import TransactionForm from './components/TransactionForm/TransactionForm';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TransactionView from './components//TransactionView/TransactionView';
import Home from './components/Home/Home';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './components/Context/AuthContext';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ProtectedRoute from './components/Redirection';

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
  const { token } = useAuth();
  // Hämta transactions från backend när komponenten laddas
  useEffect(() => {
    if (!token) {
      return;
    }

    axios.get<Transaction[]>('http://localhost:5000/api/transactions', {
      headers: {
      Authorization: `Bearer ${token}`,
    }
    })
      .then(response => setTransactions(response.data))
      .catch(err => console.error('Failed to fetch transactions', err));
  }, [token]);

  //Tar in en transaction objekt, kopierar alla prev transaktioner med operanden '...' och lägg till den nya transaktionen
  function addTransaction(transaction: Transaction) {
    setTransactions(prev => [...prev, transaction]);
  }
  
  return (
    <Router>
      <Routes>
        {/* Redirect root to home */}
        <Route path="/" element={<Navigate to="/home" />} />
        {/* Public routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/form"
          element={
            <ProtectedRoute>
              <TransactionForm
                type="expense"
                amount=""
                category=""
                note=""
                onAddTransaction={addTransaction}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <TransactionView transactions={transactions} />
            </ProtectedRoute>
          }
        />

        {/* 404 fallback */}
        <Route path="*" element={<div>404 - Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
