import React, { useEffect, useState } from "react";
import { getSignalById } from "../services/signalServices";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface SignalCardProps {
  id: number;
}

interface SamplePoint {
  time: number;
  value: number;
}

const SignalCard: React.FC<SignalCardProps> = ({ id }) => {
  const [data, setData] = useState<SamplePoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSignal = async () => {
      try {
        const values = await getSignalById(id);
        const formatted = values.map((v, i) => ({
          time: i * 0.01, 
          value: v,
        }));
        setData(formatted);
      } catch (err) {
        console.error("Failed to load signal", err);
      } finally {
        setLoading(false);
      }
    };

    loadSignal();
  }, [id]);

  if (loading) return <p>Loading signal #{id}...</p>;

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>Signal #{id}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            tickFormatter={(t) => t.toFixed(2)}
            label={{ value: "Time (s)", position: "insideBottom", offset: -5 }}
          />
          <YAxis label={{ value: "Amplitude", angle: -90, position: "insideLeft" }} />
          <Tooltip formatter={(value: number) => value.toFixed(3)} />
          <Line type="monotone" dataKey="value" stroke="#8884d8" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SignalCard;
