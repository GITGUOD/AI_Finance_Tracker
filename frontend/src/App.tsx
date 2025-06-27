import './App.css';
import TransactionForm from './components/TransactionForm/TransactionForm';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/form" element={<TransactionForm type="expense" amount="" category="" note=""/>} />
        <Route path="*" element={<div>404 - Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
//<div>
      //<TransactionForm type="expense" amount="" category="" note="" />
    //</div>