# MCP Contract Monitor Frontend

A modern, visually-attractive React frontend for the MCP Contract Monitor system. This app connects to the backend via REST and WebSocket to display contract status, send updates, and show real-time logs.

---

## Features
- **Live WebSocket connection** to backend (`/omni/ws`)
- **Send contract updates** via REST (`/omni/update`)
- **Dashboard UI** with contract status, logs, and manual controls
- **Dark/Light mode toggle** with smooth transitions
- **Modern glassmorphism design** with hero accent bar and logo
- **Responsive and accessible** for all devices
- **Modular code**: API/WebSocket logic in `src/services/`

---

## Project Structure

```
Frontend/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx      # Main dashboard UI
│   │   └── Dashboard.css     # Dashboard styles
│   ├── services/
│   │   ├── api.js            # REST API logic
│   │   └── websocket.js      # WebSocket logic
│   ├── App.jsx               # App shell, theme toggle, logo, hero bar
│   ├── App.css               # App-wide styles (modern, glassmorphism)
│   └── main.jsx              # React entry point
├── package.json              # Project config
├── vite.config.js            # Vite config
├── index.html                # HTML entry
└── ... (other config files)
```

---

## Getting Started

### 1. **Install dependencies**
```bash
npm install
```

### 2. **Configure environment (optional)**
Create a `.env` file for custom API/WS URLs:
```
VITE_API_URL=http://localhost:8000/api
VITE_WS_URL=ws://localhost:8000/api/ws
```

### 3. **Run the app**
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

---

## Usage
- **Dashboard**: View contract status, logs, and send updates.
- **WebSocket**: Real-time updates from backend.
- **REST API**: Send contract updates to backend.
- **Theme Toggle**: Switch between dark and light mode.
- **Modern UI**: Enjoy a glassmorphism dashboard, animated buttons, and a hero accent bar with logo.

---

## Customization
- **Endpoints**: Change API/WS URLs in `.env` or `src/services/api.js` and `websocket.js`.
- **Logo**: Replace the SVG in `App.jsx` with your own logo for branding.
- **Add Components**: Place new UI components in `src/components/`.
- **Add Services**: Place new API/WebSocket logic in `src/services/`.
- **Colors/Theme**: Edit `App.css` for custom colors or effects.

---

## Development
- **Linting**: `npm run lint` (if configured)
- **Formatting**: Use Prettier or your preferred formatter.
- **Testing**: Add tests as needed (not included by default).

---

## Backend Link
This frontend is designed to work with the MCP Contract Monitor backend (FastAPI). Make sure the backend is running on the correct port (default: 8000).

---