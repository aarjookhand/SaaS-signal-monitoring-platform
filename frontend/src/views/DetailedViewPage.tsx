import React from 'react';
import { useParams } from 'react-router-dom';
import SignalCard from '../components/SignalCard';

function DetailedViewPage() {
  const { id } = useParams<{ id: string }>();
  

  const signalId = id ? parseInt(id, 10) : null;
  
  if (!signalId) {
    return <div>Signal not found</div>;
  }
  
  return (
    <div>
      <SignalCard id={signalId} />
    </div>
  );
}

export default DetailedViewPage;