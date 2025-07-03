import React, { useEffect, useState } from "react";
import { getDominantInfo, DominantInfo } from "../services/signalServices";
import "../styles/AnalysisInfo.css"

interface AnalysisInfoProps {
  id: number;
}

const AnalysisInfo: React.FC<AnalysisInfoProps> = ({ id }) => {
  const [info, setInfo] = useState<DominantInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const data = await getDominantInfo(id);
        setInfo(data);
      } catch (err) {
        console.error("Failed to fetch dominant info", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
  }, [id]);

  if (loading) return <p>Loading dominant frequency...</p>;
  if (!info) return <p>No dominant frequency found in range.</p>;

  return (
    <div className="info-card">
      <h3>Signal Analysis (10–20 Hz)</h3>
      <p><strong>Frequency:</strong> {info.dominant_frequency} Hz</p>
      <p><strong>Amplitude:</strong> {info.amplitude}</p>
    </div>

  );
};

export default AnalysisInfo;
