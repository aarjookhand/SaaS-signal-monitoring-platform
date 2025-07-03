import React, { useEffect, useState } from "react";
import { fetchSignals, Signal } from "../services/signalServices";
import "../styles/SignalList.css"

interface SignalListProps {
  onSelect: (id: number) => void;
  onClick: (id: number) => void;
}

const SignalList: React.FC<SignalListProps> = ({ onSelect, onClick }) => {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadSignals = async () => {
      try {
        const data = await fetchSignals();
        setSignals(data);
      } catch (error) {
        console.error("Failed to load signals", error);
      } finally {
        setLoading(false);
      }
    };

    loadSignals();
  }, []);

  if (loading) return <p>Loading signals...</p>;

  return (
    <div className="signal-list-container">
      <h2>Available Signals</h2>
      <ul className="signal-list">
        {signals.map((signal) => (
          <li key={signal.id}>
            <button onClick={() =>{
              onSelect(signal.id);
              onClick(signal.id);}}>
              Signal #{signal.id} - Duration: {signal.duration} seconds <br/>
              Components: {signal.components.length} sine wave{signal.components.length > 1 ? 's' : ''}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SignalList;
