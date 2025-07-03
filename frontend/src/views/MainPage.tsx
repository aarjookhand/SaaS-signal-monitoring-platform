import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import SignalList from '../components/SignalList';

const MainPage: React.FC = () => {
    const navigate = useNavigate();
    const [selectedSignal, setSelectedSignal] = useState<number | null>(null);

    const [token, setToken] = useState<string | null>(() => {
        return localStorage.getItem('token');
    });

    const logout = () => {
        localStorage.removeItem('token'); 
        setToken(null);    
        navigate('/login');               
    };
  

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <SignalList onSelect={setSelectedSignal} />
      {selectedSignal && <p>Selected signal: #{selectedSignal}</p>}
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default MainPage;