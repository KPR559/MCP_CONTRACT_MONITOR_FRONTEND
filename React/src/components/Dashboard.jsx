import React, { useState, useEffect, useCallback } from 'react';
import './Dashboard.css';
import { sendContractUpdate } from '../services/api';
import { createWebSocket } from '../services/websocket';


const Dashboard = () => {
    const [formData, setFormData] = useState({
        location: '',
        status: 'active'
    });
    const [logs, setLogs] = useState([]);
    const [connectionStatus, setConnectionStatus] = useState('disconnected');
    const [isLoading, setIsLoading] = useState(false);
    const [clientId, setClientId] = useState('');

    const addLog = useCallback((message, type = 'info') => {
        const timestamp = new Date().toLocaleTimeString();
        setLogs(prev => [...prev.slice(-50), {
            id: Date.now(),
            message,
            type,
            timestamp
        }]);
    }, []);

    useEffect(() => {
        const newClientId = `react-${Date.now()}`;
        setClientId(newClientId);

        const ws = createWebSocket(
            (data) => {
                // handle incoming message (was ws.onmessage)
                if (data.type === "connection" && data.status === "confirmed") {
                    setConnectionStatus('connected');
                    addLog('WebSocket connection confirmed', 'success');
                    return;
                }
                if (data.location && data.status) {
                    addLog(`Update: ${data.status} at ${data.location}`, 'incoming');
                }
            },
            (status, error) => {
                // handle status change (was ws.onopen, ws.onclose, ws.onerror)
                setConnectionStatus(status);
                if (status === 'connected') addLog('WebSocket connection initiated', 'system');
                if (status === 'disconnected') addLog('WebSocket connection closed', 'system');
                if (status === 'error') addLog(`WebSocket error: ${error?.message || ''}`, 'error');
            }
        );

        const heartbeatInterval = setInterval(() => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({type: "heartbeat"}));
            }
        }, 25000);

        return () => {
            clearInterval(heartbeatInterval);
            if (ws.readyState === WebSocket.OPEN) {
                ws.close();
            }
        };
    }, [addLog]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.location) {
            addLog('Please select a location', 'error');
            return;
        }

        setIsLoading(true);
        try {
            const result = await sendContractUpdate({
                contract_id: `react-${Date.now()}`,
                location: formData.location,
                status: formData.status,
                timestamp: new Date().toISOString()
            });

            if (result.broadcasted_to === 0) {
                addLog('Warning: No active receivers', 'warning');
            } else {
                addLog(`Update sent to ${result.broadcasted_to} client(s)`, 'success');
            }
        } catch (error) {
            addLog(`Failed to send update: ${error.message}`, 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="dashboard-container">
            <div className="control-panel">
                <h2>Contract Update</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Location:</label>
                        <select
                            value={formData.location}
                            onChange={(e) => setFormData({...formData, location: e.target.value})}
                            required
                        >
                            <option value="">Select location</option>
                            <option value="Chennai">Chennai</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Bengaluru">Bengaluru</option>
                            <option value="Hyderabad">Hyderabad</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Status:</label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({...formData, status: e.target.value})}
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    <button 
                        type="submit" 
                        disabled={isLoading || !formData.location}
                        className="submit-btn"
                    >
                        {isLoading ? 'Sending...' : 'Send Update'}
                    </button>
                </form>
            </div>

            <div className="status-panel">
                <div className={`connection-status ${connectionStatus}`}>
                    {connectionStatus.toUpperCase()} ({clientId.slice(-6)})
                </div>
                <div className="log-container">
                    {logs.map(log => (
                        <div key={log.id} className={`log-item ${log.type}`}>
                            <span className="timestamp">[{log.timestamp}]</span>
                            <span className="message">{log.message}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;