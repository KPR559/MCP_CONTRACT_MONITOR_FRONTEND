
import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    return () => document.body.classList.remove('dark');
  }, [darkMode]);

  return (
    <>
      <div className="hero-bar" />
    <div className={`app-container ${darkMode ? 'dark' : 'light'}`}>
      <header>
          <div className="logo-title">
            <span className="logo-svg">
              {/* Placeholder SVG logo */}
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" stroke="#3498db" strokeWidth="4" fill="#2ecc71" />
                <text x="50%" y="55%" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold" dy=".3em">M</text>
              </svg>
            </span>
        <h1>MCP Contract Hub</h1>
          </div>
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="theme-toggle"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>
      <main>
        <Dashboard />
      </main>
      <footer>
          <p>&copy; {new Date().getFullYear()} MCP Contract Management System</p>
      </footer>
    </div>
    </>
  );
}

export default App;