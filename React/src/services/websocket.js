import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export async function sendContractUpdate(data) {
  // POST to /omni/update (or your actual endpoint)
  const response = await axios.post(`${API_URL}/update`, data);
  return response.data;
}

// You can add more API functions here as needed

const WEBSOCKET_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8000/api/ws';

export function createWebSocket(onMessage, onStatusChange) {
  const ws = new WebSocket(WEBSOCKET_URL);

  ws.onopen = () => {
    onStatusChange('connected');
  };

  ws.onclose = () => {
    onStatusChange('disconnected');
  };

  ws.onerror = (error) => {
    onStatusChange('error', error);
  };

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      onMessage(data);
    } catch (e) {
      onMessage({ type: 'error', message: 'Invalid JSON from server' });
    }
  };

  return ws;
}
