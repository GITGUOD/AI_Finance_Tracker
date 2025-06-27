import "./TransactionView.css"

interface Props {
  id: string;
  amount: number;
  category: string;
  note?: string;
  date: string; // or Date if you parse it
}


function TransactionView(items : Props) {
    return <> 
        <div className="transaction-view">
            <h2>TransactionList</h2>
        </div>
    </>
}

export default TransactionView;