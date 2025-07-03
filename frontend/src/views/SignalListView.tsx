import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import SignalList from '../components/SignalList';
import "../styles/SignalPage.css"

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
    <div className="dashboard-container">     
      <div className="dashboard-bar">
        <h1 className='dashboard-title'>Welcome to the Dashboard</h1>
        <div className="logout-bar">
          <button onClick={logout}>Logout</button>
        </div>       
      </div> 
      <SignalList onSelect={setSelectedSignal} onClick={handleSignalClick} />
    </div>
  );

};

export default SignalListView;