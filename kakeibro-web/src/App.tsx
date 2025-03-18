import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const messageCallback = (event: any) => {
    if (event.origin !== 'http://localhost:5173') {
      return;
    }
    setMessage(JSON.stringify(event.data));
  };

  useEffect(() => {
    window.addEventListener('message', messageCallback);

    return () => {
      window.removeEventListener('message', messageCallback);
    };
  }, []);
  async function startOAuth() {
    const url = 'http://localhost:5214/api/v1/auth/o-auth-uri/';

    const response = await fetch(url);
    const responseBody = await response.json();

    window.open(responseBody.uri, '_blank');
  }

  function openMinifiedWindow() {
    const width = 450;
    const height = 600;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    const popup = window.open(
      'https://duckduckgo.com', // URL to open
      'GoogleAuth', // Window name
      `width=${width},height=${height},top=${top},left=${left}`
    );

    if (popup?.opener) {
      popup.opener.postMessage({ msg: 'Brother' }, 'http://localhost:5173');
      // popup.close();
    }
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}.
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <button onClick={() => startOAuth()}>OAuth</button>
      <button onClick={() => openMinifiedWindow()}>Minified Window</button>
      <p>Message: {message}</p>
    </>
  );
}

export default App;
