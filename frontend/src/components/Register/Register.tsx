import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Register.css"


function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
        //Vår route är så pga av backenden har redan inställt som (/api/users, sedan routern), se rad 25. Likadant för login pga av routern authentication
      await axios.post('http://localhost:5000/api/users/register', {
        username,
        password
      });
      alert('Registration successful!');
      navigate('/login'); // Redirect to login after register
    } catch (err) {
      alert('Could not register.');
      console.error(err);
    }
  }

  return (
    <div className="register-form">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input value={username} onChange={e => setUsername(e.target.value)} required />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
