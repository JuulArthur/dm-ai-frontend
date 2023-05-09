import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

async function fetchData(url: string) {
  console.log(`${process.env.REACT_APP_API_URL}${url}`);
  const response = await fetch(`${process.env.REACT_APP_API_URL}${url}`);
  return await response.json();
}

async function fetchAiData(message: string) {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/chatgpt`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });
  return await response.json();
}

function App() {
  const [message, setMessage] = useState('');
  const [aiMessage, setAiMessage] = useState('');

  useEffect(() => {
    fetchData('/api/hello')
        .then((data) => {
          setMessage(data.message)
        });
    fetchAiData('Can you help me make a Dungeons and Dragons character?').then((data => {
      console.log('data', data);
      setAiMessage(data?.response?.content)
    }))
  }, []);

  return (
      <div className="App">
        <h1>This is the message: {message}</h1>
        <h1>This is the Ai message: {aiMessage}</h1>
      </div>
  );
}

export default App;
