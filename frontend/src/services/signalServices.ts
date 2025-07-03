import axios from "axios";

export interface Signal {
  id: number;
  duration: number;
  sampling_rate: number;
  components: Array<{ freq: number; amp: number }>;
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

