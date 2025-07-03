import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage: React.FC = () => {
    const [token, setToken] = useState<string | null>(() => {
        return localStorage.getItem('token');
    });

    const logout = () => {
        localStorage.removeItem('token'); 
        setToken(null);                   
    };

    if (!token) {
        return <LoginForm onLoginSuccess={setToken} />;
    }

  return (
    <div>
      <h1>Main page - User logged in</h1>
      <p>Your token: {token}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default LoginPage;
