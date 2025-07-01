import React, {useState} from 'react';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useAuth();

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { username, password});
            login(res.data.token);
            alert('Logged in!');
        } catch (error) {
            alert('Login failed!');
        }
    }


    return <>
    <form onSubmit={handleSubmit}>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>;
    </>
}