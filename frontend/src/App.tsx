import './App.css';
import TransactionForm from './components/TransactionForm/TransactionForm';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TransactionView from './components//TransactionView/TransactionView';
import Home from './components/Home/Home';
import { useAuth } from './components/Context/AuthContext';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ProtectedRoute from './components/Redirection';
import Chatbot from './components/chatbot';

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
  const { token } = useAuth();

  
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
                onAddTransaction={() => ""}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <TransactionView />
            </ProtectedRoute>
          }
        />

         <Route
          path="/chatbot"
          element={
            <ProtectedRoute>
              <Chatbot/>
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
