import React, { useState, useEffect } from "react";

const TextToSpeech = ({ text }: { text: string }) => {
  const synth = window.speechSynthesis;
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState(null);

  useEffect(() => {
    const u = new SpeechSynthesisUtterance(text);

    // @ts-ignore
    setUtterance(u);

    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePlay = () => {
    if (isPaused) {
      synth.resume();
    }

    // @ts-ignore
    synth.speak(utterance);

    setIsPaused(false);
  };

  const handlePause = () => {
    synth.pause();

    setIsPaused(true);
  };

  const handleStop = () => {
    synth.cancel();

    setIsPaused(false);
  };

  return (
    <div>
      <button onClick={handlePlay}>{isPaused ? "Resume" : "Play"}</button>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handleStop}>Stop</button>
    </div>
  );
};

export default TextToSpeech;
