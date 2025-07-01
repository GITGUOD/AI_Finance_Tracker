import "./Home.css"
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Home() {
    const { username, logout, token } = useAuth();
    console.log('Token:', token, 'Username:', username);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

    return <>
        <div className="home-container">
        <h2>Welcome to Finance Tracker</h2>
        {token ? (
        <>
          <p>You are logged in as <strong>{username}</strong>.</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Please <a href="/login">login</a> to continue.</p>
      )}
        <div className="home-links">
            <Link to="/transactions">View Transactions</Link>
            <Link to="/form">Add Transaction</Link>
            <Link to="/AI_Chat_Bot">Transaction assistent </Link>
        </div>
    </div>
    </>

}

export default Home;