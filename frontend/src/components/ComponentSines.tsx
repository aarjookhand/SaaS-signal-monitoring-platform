import React, { useEffect, useState } from "react";
import { getSignalMeta } from "../services/signalServices";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface ComponentSinesProps {
  id: number;
}

interface SamplePoint {
  time: number;
  [key: string]: number; 
}

const ComponentSines: React.FC<ComponentSinesProps> = ({ id }) => {
  const [data, setData] = useState<SamplePoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateSineWaves = async () => {
      try {

        const meta = await getSignalMeta(id);
        const dt = 1 / meta.sampling_rate;
        const totalSamples = Math.floor(meta.duration * meta.sampling_rate); 

        const fullData: SamplePoint[] = Array.from({length: totalSamples}, (_, i) => {
          const time = i * dt;
          const point: SamplePoint = { time};

          meta.components.forEach((comp, idx) => {
            const sineVal = comp.amp * Math.sin(2 * Math.PI * comp.freq * time);
            point[`sine${idx + 1}`] = sineVal;
          });
          return point;
        });

        setData(fullData);
      } catch (err) {
        console.error("Failed to load signal or metadata", err);
      } finally {
        setLoading(false);
      }
    };

    generateSineWaves();
  }, [id]);

  if (loading) return <p>Loading signal #{id}...</p>;

  const colors = ["#8884d8", "#82ca9d", "#ff7300", "#ff3c6f"];


  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>Component Sine Waves (Signal #{id})</h3>
      <ResponsiveContainer width="200%" height={500}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            label={{ value: "Time (s)", position: "insideBottom", offset: -5 }}
          />
          <YAxis label={{ value: "Amplitude", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          {Object.keys(data[0])
            .filter((key) => key.startsWith("sine"))
            .map((key, idx) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[idx % colors.length]}
                strokeWidth={1}
                dot={false}
              />
            ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ComponentSines;
