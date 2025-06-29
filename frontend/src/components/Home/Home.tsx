import "./Home.css"
import { Link } from 'react-router-dom';

function Home() {

    return <>
        <div className="home-container">
        <h2>Welcome to Finance Tracker</h2>
        <div className="home-links">
            <Link to="/transactions">View Transactions</Link>
            <Link to="/form">Add Transaction</Link>
            <Link to="/AI_Chat_Bot">Transaction assistent </Link>
        </div>
    </div>
    </>

}

export default Home;