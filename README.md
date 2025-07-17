# MCP Contract Monitor – Frontend

> This repository contains the frontend applications for the MCP Contract Monitor system: a contract update/admin app and a real-time 3D contract monitor dashboard.

---

## 📦 Repository Structure

```
Frontend/
├── React/      # Contract Update/Admin App (Vite + React)
├── Monitor/    # 3D Contract Monitor Dashboard (Vite + React + Three.js)
└── README.md   # This file
```

---

## 📝 Overview
- **React/**: A web app for creating and updating contract information. Users/admins can submit contract location and status updates, which are sent to the backend via REST API.
- **Monitor/**: A real-time 3D dashboard that visualizes contract locations and statuses as animated cubes. Receives updates from the backend via WebSocket and displays them in a modern, interactive UI.

Both apps are independent Vite+React projects with their own dependencies and can be run separately.

---

## 🔗 Backend Repository
- [MCP Contract Monitor Backend (FastAPI)](https://github.com/KPR559/MCP_CONTRACT_MONITOR_BACKEND.git)
  - Make sure the backend is running and accessible for both frontend apps to function correctly.

---

## 🚀 Quick Start

### 1. **Contract Update/Admin App**
```sh
cd React
npm install
npm run dev
```
- Runs at [http://localhost:3333](http://localhost:3333) 

### 2. **3D Monitor Dashboard**
```sh
cd Monitor
npm install
npm run dev
```
- Runs at [http://localhost:5173](http://localhost:5173) (default)
- Connects to backend WebSocket at `ws://localhost:8000/api/ws` by default.

---

## 🛠️ Tech Stack
- React, Vite, Three.js, @react-three/fiber, @react-three/drei
- Modern JavaScript/ESLint

---

## 📄 Additional Info
- Each app has its own README with more details and customization instructions.
- For backend setup, API docs, and deployment, see the backend repository.

---

## 🤝 Contributing
Pull requests and suggestions are welcome! Please open an issue or PR for improvements, bug fixes, or new features.
