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
  const [aiMessage, setAiMessage] = useState('');
  const [userQuery, setUserQuery] = useState('');

    const fetchDataFromMessage = () => {
        fetchAiData(userQuery).then((data => {
            setAiMessage(data?.response?.content)
        }))
    }

  return (
      <div className="App">
        <input onChange={(e) => setUserQuery(e.target.value)} value={userQuery}/>
          <button onClick={() => fetchDataFromMessage()}>Post</button>
        <h1>This is the Ai message:</h1>
          <div>{aiMessage}</div>
      </div>
  );
}

export default App;
