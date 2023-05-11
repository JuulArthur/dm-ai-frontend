import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import TextToSpeech from './TextToSpeech';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import SpeechToText from './SpeechToText';

/*
#264653
#2a9d8f
#e9c46a
#f4a261
#e76f51
 */

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

const fixedAIMessage =
    'Of course! Here are some steps to follow:\n' +
    '\n' +
    '1. Choose a Theme: Decide what kind of world you want to create. Will it be high or low fantasy? Will it be a medieval or futuristic setting? What kind of tone do you want to portray in this world? Is it dark, light-hearted, or somewhere in between?\n' +
    '\n' +
    '2. Create a Map: Think about the geography of the world and create a map. Consider the different regions within the world, their climates, landmarks, and cities. This will help build a sense of realism for your players.\n' +
    '\n' +
    '3. Develop the History: Every world has a history. Think about who lived in this world before the current inhabitants, what were the major events that shaped the world, and how did the current political situation come to be. This will give your players context for their characters and create a compelling backstory for their adventures.\n' +
    '\n' +
    '4. Create Unique Races: Players will want to play different types of races, so creating unique and interesting races will be key. Consider making up some new races or tweaking existing races for your setting.\n' +
    '\n' +
    '5. Decide on Magic: Magic is a critical part of fantasy settings. Consider what types of magic will exist, how it will be learned, and what limitations it will have.\n' +
    '\n' +
    '6. Develop Factions: Factions can add depth and complexity to your setting. Create several factions with their own agendas, goals, and lore. This will give the players many potential story hooks and goals to pursue.\n' +
    '\n' +
    "7. Establish NPC's: Create a list of important NPCs that the players may encounter throughout the campaign. This list should include their story, personality, goals, and how they fit into the world.\n" +
    '\n' +
    '8. Plan Adventures: Plan a few adventures that will help introduce players to the world and set them off on their campaign.\n' +
    '\n' +
    "Keep in mind that this is just a starting point. Your players' actions will undoubtedly change the direction of your campaign and help shape the world you create.";

function App() {
    const [aiMessage, setAiMessage] = useState('');
    const [userQuery, setUserQuery] = useState('');

    const fetchDataFromMessage = () => {
        fetchAiData(userQuery).then((data) => {
            setAiMessage(data?.response?.content);
        });
    };

    return (
        <div className="App">
            <div className="App-content">
                <h1>Your AI Dungeon Master</h1>
                <button onClick={() => fetchDataFromMessage()}>Post</button>
                <h2>This is the Ai message:</h2>
                <div className="AI-message">{fixedAIMessage}</div>
                <TextToSpeech text={fixedAIMessage} />
                <div className="AI-message">{aiMessage}</div>
                <label>User input</label>
                {
                    //<textarea className="User-input" onChange={(e) => setUserQuery(e.target.value)} value={userQuery} />
                }
                <SpeechToText setExternalValue={setUserQuery} />
            </div>
        </div>
    );
}

export default App;
