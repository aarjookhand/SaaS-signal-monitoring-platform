import React, { useEffect, useState } from "react";
import { fetchSignals, Signal } from "../services/mainServices";

interface SignalListProps {
  onSelect: (id: number) => void;
}

const SignalList: React.FC<SignalListProps> = ({ onSelect }) => {
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
    <div>
      <h2>Available Signals</h2>
      <ul>
        {signals.map((signal) => (
          <li key={signal.id}>
            <button onClick={() => onSelect(signal.id)}>
              Signal #{signal.id} (Duration: {signal.duration}s)
              No. of sine waves :{signal.components.length}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SignalList;
