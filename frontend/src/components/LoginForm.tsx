import React, { useState } from 'react';
import { login } from '../services/authServices';

interface LoginFormProps {
  onLoginSuccess: (access_token: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);            

        try {
            const data = await login(email, password);
            localStorage.setItem('token', data.access_token);
            onLoginSuccess(data.access_token);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        <div>
            <label>Email:</label><br />
            <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            />
        </div>

        <div>
            <label>Password:</label><br />
            <input
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            />
        </div>

        <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
        </button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default LoginForm;
