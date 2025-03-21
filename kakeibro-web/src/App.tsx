import { useCallback, useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { useNavigate } from 'react-router';

function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');
  const [eventList, setEventList] = useState(new Array<string>());
  const navigate = useNavigate();

  const messageCallback = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (event: any) => {
      if (event.origin !== window.location.origin) {
        return;
      }

      if (event.data?.event !== 'OAuth') {
        return;
      }

      const newEventList = [...eventList, event.data.authCode];
      setEventList(newEventList);
      setMessage(JSON.stringify(newEventList));
    },
    [eventList]
  );

  useEffect(() => {
    window.addEventListener('message', messageCallback);

    return () => {
      window.removeEventListener('message', messageCallback);
    };
  }, [messageCallback]);

  useEffect(() => {
    async function postAuthCode() {
      const url = new URL('http://localhost:5214/api/v1/auth/o-auth-code/');
      url.searchParams.set('code', eventList[eventList.length - 1]);

      const response = await fetch(url, { method: 'POST' });
      const responseBody = await response.json();

      if (response.status === 200) {
        navigate('/login', { state: { response: responseBody } });
      }
    }
    if (eventList.length < 1) {
      return;
    }

    postAuthCode();
  }, [eventList, navigate]);

  async function startOAuth() {
    const url = 'http://localhost:5214/api/v1/auth/o-auth-uri/';

    const response = await fetch(url);
    const responseBody = await response.json();

    const width = 450;
    const height = 600;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    window.open(
      responseBody.uri, // URL to open
      'GoogleAuth', // Window name
      `width=${width},height=${height},top=${top},left=${left},popup`
    );
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
