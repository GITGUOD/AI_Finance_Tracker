import "./TransactionView.css";
import { Transaction } from "../../App";

interface Props {
  transactions: Transaction[];
}

function TransactionView({ transactions }: Props) {
  return (
    <div className="transaction-view">
      <h2>Made Transactions</h2>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <ul>
          {transactions.map(tx => (
            <li key={tx.id} className="transaction-item">
              <p><strong>Amount:</strong> {tx.amount} SEK</p>
              <p><strong>Category:</strong> {tx.category}</p>
              {tx.note && <p><strong>Note:</strong> {tx.note}</p>}
              <p><strong>Date:</strong> {new Date(tx.date).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TransactionView;
