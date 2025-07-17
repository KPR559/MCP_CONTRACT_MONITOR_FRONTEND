import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export async function sendContractUpdate(data) {
  // POST to /omni/update (or your actual endpoint)
  const response = await axios.post(`${API_URL}/update`, data);
  return response.data;
}

// You can add more API functions here as needed
