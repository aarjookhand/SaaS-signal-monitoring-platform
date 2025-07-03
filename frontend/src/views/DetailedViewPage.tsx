import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SignalCard from '../components/SignalCard';
import AnalysisInfo from '../components/AnalysisInfo';
import ComponentSines from '../components/ComponentSines';
import "../styles/DetailedViewPage.css"

function DetailedViewPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  

  const signalId = id ? parseInt(id, 10) : null;
  
  if (!signalId) {
    return <div>Signal not found</div>;
  }
  
  return (
    <div className="signal-page">
      <button className="back-button" onClick={() => navigate("/")}>
        ← Go Back
      </button>
      <AnalysisInfo id={signalId} />
      <SignalCard id={signalId} />
      <ComponentSines id={signalId} />
      
    </div>

  );
}

export default DetailedViewPage;