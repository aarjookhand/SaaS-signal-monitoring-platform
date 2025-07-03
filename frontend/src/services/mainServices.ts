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
