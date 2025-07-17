# 🟦 Cube Monitor – MCP Contract Visualizer (Frontend)

> _Real-time 3D dashboard using React + Three.js to visualize contract locations via WebSocket._

---

## 📁 Project Structure

```
Frontend/Monitor/
├── src/
│   ├── App.jsx            # Main React component (WebSocket, 3D scene, overlays)
│   ├── main.jsx           # React entry point
│   └── ...                # Styles, assets, etc.
├── package.json           # Project dependencies
├── vite.config.js         # Vite configuration
└── README.md              # This file
```

---

## 🚀 Overview
Cube Monitor is a web application that connects to the MCP Contract Monitor backend via WebSocket and displays the current status and location of contracts as animated 3D cubes. Each cube represents a contract and moves smoothly to its assigned location, with color and labels indicating contract status and details.

---

## ✨ Features
- Real-time updates via WebSocket
- 3D visualization with smooth animated cube movement
- Multiple contract support (each as a labeled cube)
- Status color coding (active, inactive, etc.)
- Location legend overlay
- Responsive, modern UI with gradient background
- Easy customization of locations and status colors

---

## 🛠️ Tech Stack
- [React](https://react.dev/) (UI framework)
- [Vite](https://vitejs.dev/) (build tool)
- [three.js](https://threejs.org/) & [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/) (3D rendering)
- [@react-three/drei](https://docs.pmnd.rs/drei/) (3D helpers)

---

## ⚡ Quick Start

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Start the development server:**
   ```sh
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173).

3. **Backend:**
   Make sure the MCP Contract Monitor backend is running and accessible at `ws://localhost:8000/api/ws`.

---

## 📡 Example WebSocket Payload

The frontend expects contract updates in the following format:

```json
{
  "contract_id": "abc123",
  "location": "chennai", // or { "x": 0, "y": 0, "z": 0 }
  "status": "active"     // e.g., "active", "inactive"
}
```
- For multiple contracts, send an array of such objects.
- The `location` string must match a key in `LOCATION_COORDS` in `App.jsx` (case-insensitive).

---

## 🖥️ Usage
- The dashboard shows a 3D scene with cubes representing contracts.
- When a contract update is received (location/status), the corresponding cube will move and update its color/label in real time.
- Overlays show connection status, current location, and a legend of all possible locations.
- Each cube is labeled with its location and colored by status (active = green, inactive = red, other = orange).

---

## 🧩 Customization
- **Add locations:** Edit the `LOCATION_COORDS` object in `src/App.jsx` to add or change location mappings.
- **Status colors:** Cube color is determined by contract status (see `AnimatedCube` in `src/App.jsx`).
- **UI/UX:** All overlays and styles are inlined in `App.jsx` for easy modification.
- **Legend:** The legend overlay updates automatically based on `LOCATION_COORDS`.

---

## 🤝 Contributing
Pull requests and suggestions are welcome! Please open an issue or PR for improvements, bug fixes, or new features.

---

