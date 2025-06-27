import "./Home.css"
import { Link } from 'react-router-dom';

function home() {

    return <>
        <div className = "Home.css">
            <label>
                <Link to="Transactions">View transactions</Link>
                <Link to="/form">Add transaction</Link>
            </label>
        </div>
    </>

}

export default home;