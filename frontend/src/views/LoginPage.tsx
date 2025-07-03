import React from 'react'
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm'

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    
    const handleLoginSuccess = (access_token: string) => {
        console.log('Login successful!', access_token);
        navigate('/');
    };

  return (
    <div>
      <LoginForm onLoginSuccess={handleLoginSuccess} />      
    </div>
  )
}

export default LoginPage
