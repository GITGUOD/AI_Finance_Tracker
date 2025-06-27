import './App.css';
import TransactionForm from './components/TransactionForm';

function App() {
  return (
    <div>
      <TransactionForm type="expense" amount="" category="" note="" />
    </div>
  );
}

export default App;
