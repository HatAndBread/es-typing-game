import React, { useState, useEffect } from "react";
import { Quiz } from "../Types/JsonTypes";
import useTimer from "../Hooks/useTimer";

const TypeByWord = ({ quiz, words }: { quiz: Quiz; words: string[] }) => {
  const [started, setStarted] = useState(false);
  const [time, setTime] = useState(0);
  useTimer({ started, time, setTime });
  return (
    <div className='WordGame'>
      {time.toFixed(1)}
      <button
        className='start-btn'
        onClick={() => {
          setStarted(true);
        }}>
        START
      </button>
      <button onClick={() => setStarted(false)}>Stop timer</button>
      <button onClick={() => setTime(0)}>Reset time</button>
    </div>
  );
};

export default TypeByWord;
