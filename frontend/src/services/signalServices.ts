import axios from "axios";

export interface Signal {
  id: number;
  duration: number;
  sampling_rate: number;
  components: Array<{ freq: number; amp: number }>;
}

export interface DominantInfo {
  dominant_frequency: number;
  amplitude: number;
}

export const fetchSignals = async (): Promise<Signal[]> => {
  const token = localStorage.getItem("token");

  const response = await axios.get<Signal[]>("http://localhost:8000/signals", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};


export const getSignalById = async (id: number): Promise<number[]> => {
  const token = localStorage.getItem("token");

  const response = await axios.get<{ id: number; values: number[] }>(
    `http://localhost:8000/signals/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.values;
};


export const getDominantInfo = async (id: number): Promise<DominantInfo> => {
  const token = localStorage.getItem("token");

  const response = await axios.get<DominantInfo>(
    `http://localhost:8000/signals/${id}/analysis`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

