import './App.css';
import TransactionForm from './components/TransactionForm';

function App() {
  return (
    <div>
      <h2>Add a transaction</h2>
      <TransactionForm type="expense" amount="" category="" note="" />
    </div>
  );
}

export default App;
