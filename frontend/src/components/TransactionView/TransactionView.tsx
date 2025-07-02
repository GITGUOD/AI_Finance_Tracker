import "./TransactionView.css";
import { Transaction } from "../../App";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";


function TransactionView() {
  const { token } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (!token) return;

    axios.get<Transaction[]>("http://localhost:5000/api/transactions", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => setTransactions(response.data))
      .catch((err) => console.error("Failed to fetch transactions", err));
  }, [token]);

  
  console.log('Transaction IDs:', transactions.map(tx => tx.id));

  return (
    <div className="transaction-view">
      <h2>Made Transactions</h2>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <ul className="transaction-list">
          {transactions.map(tx => (
            <li key={tx.id} className="transaction-item">
              <span
                className={`transaction-type ${tx.type}`}
              >
                {tx.type}
              </span>
              <span className="transaction-amount">
                {tx.amount} SEK
              </span>
              <span className="transaction-category">
                {tx.category}
              </span>
              {tx.note && (
                <span className="transaction-note">
                  {tx.note}
                </span>
              )}
              <span className="transaction-date">
                {new Date(tx.date).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TransactionView;
