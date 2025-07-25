import React, {useState} from 'react';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import "./Login.css"


export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useAuth();
    const navigate = useNavigate();


    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/users/login', { username, password});
            login(username, res.data.token);
            alert('Logged in!');
            navigate('/home');
        } catch (error) {
            alert('Login failed!');
        }
    };

    const handleGoToRegister = () => {
        navigate('/register');
    };


    return <>
    <form onSubmit={handleSubmit}>
    <h2>Login</h2>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>;

    <p>Don't have an account?</p>
      <button onClick={handleGoToRegister}>Register</button>
    </>
}