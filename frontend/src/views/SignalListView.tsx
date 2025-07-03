import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import SignalList from '../components/SignalList';

const SignalListView: React.FC = () => {
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

    const handleSignalClick = (signal_id: number) => {
      navigate(`/${signal_id}`);
    };
  

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <SignalList onSelect={setSelectedSignal} onClick={handleSignalClick}/>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default SignalListView;