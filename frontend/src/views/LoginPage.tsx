import React from 'react'
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm'
import "../styles/LoginPage.css"

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    
    const handleLoginSuccess = (access_token: string) => {
        console.log('Login successful!', access_token);
        navigate('/');
    };

  return (
    <div className='login-container'>
      <h2 className="login-title">Visualize Vital Waves</h2>
      <LoginForm onLoginSuccess={handleLoginSuccess} />      
    </div>
  )
}

export default LoginPage
