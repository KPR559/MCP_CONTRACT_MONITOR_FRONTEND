import { useState, useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Html } from '@react-three/drei'

const LOCATION_COORDS = {
  chennai: [0, 0, 0],
  mumbai: [2, 0, 0],
  bengaluru: [-2, 0, 0],
  hyderabad: [0, 2, 0]
}

function AnimatedCube({ position, color, label }) {
  const meshRef = useRef()
  useFrame(() => {
    if (!meshRef.current) return
    meshRef.current.position.x += (position[0] - meshRef.current.position.x) * 0.1
    meshRef.current.position.y += (position[1] - meshRef.current.position.y) * 0.1
    meshRef.current.position.z += (position[2] - meshRef.current.position.z) * 0.1
  })
  return (
    <>
      <mesh ref={meshRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Label above the cube */}
      <Html position={[position[0], position[1] + 0.8, position[2]]} center style={{ pointerEvents: 'none' }}>
        <div style={{
          background: 'rgba(0,0,0,0.7)', color: 'white', padding: '2px 8px', borderRadius: 4, fontSize: 14
        }}>{label}</div>
      </Html>
    </>
  )
}

export default function App() {
  const [status, setStatus] = useState('Connecting...')
  const [contracts, setContracts] = useState([])
  const [currentLocation, setCurrentLocation] = useState('')

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/api/ws')
    socket.onopen = () => setStatus('Connected')
    socket.onclose = () => setStatus('Disconnected')
    socket.onerror = () => setStatus('Error')
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // Ignore heartbeat or non-contract messages
      if (data.type === 'heartbeat') return;

      // Support both single and multiple contract updates
      const updates = Array.isArray(data) ? data : [data];
      const newContracts = updates
        .filter(item => item.location) // Only process items with a location
        .map((item, idx) => {
          let coords = [0, 0, 0];
          let locationName = '';
          let status = item.status || 'unknown';
          let id = item.contract_id || idx;
          if (typeof item.location === 'string') {
            locationName = item.location;
            coords = LOCATION_COORDS[item.location.toLowerCase()] || [0, 0, 0];
          } else if (
            item.location &&
            typeof item.location.x === 'number' &&
            typeof item.location.y === 'number' &&
            typeof item.location.z === 'number'
          ) {
            locationName = 'Custom';
            coords = [item.location.x, item.location.y, item.location.z];
          }
          return {
            id,
            position: coords,
            status,
            label: locationName
          };
        });

      if (newContracts.length > 0) {
        setContracts(newContracts);
        setCurrentLocation(newContracts[0].label);
      }
      // Do not update state if no valid contracts
    }
    return () => socket.close()
  }, [])

  return (
    <div style={{
      minHeight: '100vh', minWidth: '100vw',
      background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: 10, left: 10, color: 'white', zIndex: 1,
        background: 'rgba(0,0,0,0.5)', padding: '4px 12px', borderRadius: 6
      }}>
        WebSocket status: {status}
      </div>
      <div style={{
        position: 'absolute', top: 50, left: 10, color: 'white', zIndex: 1,
        background: 'rgba(0,0,0,0.5)', padding: '4px 12px', borderRadius: 6
      }}>
        {currentLocation && `Current Location: ${currentLocation}`}
      </div>
      <div style={{
        position: 'absolute', top: 10, right: 10, color: 'white', zIndex: 1,
        background: 'rgba(0,0,0,0.5)', padding: '8px 16px', borderRadius: 8,
        minWidth: 180
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: 6 }}>Location Coordinates</div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {Object.entries(LOCATION_COORDS).map(([name, coords]) => (
            <li key={name} style={{ marginBottom: 4 }}>
              <span style={{ textTransform: 'capitalize' }}>{name}</span>: [
              {coords.join(', ')}]
            </li>
          ))}
        </ul>
      </div>
      <Canvas style={{ height: '100vh', width: '100vw', background: 'transparent' }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {contracts.map(contract => (
          <AnimatedCube
            key={contract.id}
            position={contract.position}
            color={contract.status === 'active' ? 'green' : contract.status === 'inactive' ? 'red' : 'orange'}
            label={contract.label}
          />
        ))}
        <OrbitControls />
      </Canvas>
    </div>
  )
}
