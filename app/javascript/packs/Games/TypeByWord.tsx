import React, { useState, useEffect } from "react";
import { Quiz } from "../Types/JsonTypes";
import useTimer from "../Hooks/useTimer";
import useLatestKey from "../Hooks/useLatestKey";

const TypeByWord = ({
  quiz,
  words,
}: {
  quiz: Quiz;
  words: string[];
}): JSX.Element => {
  const [started, setStarted] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState(words[currentWordIndex]);
  const [bestTime, setBestTime] = useState<null | number>(null);
  const [playerAnswer, setPlayerAnswer] = useState("");
  const [numberOfMistakes, setNumberOfMistakes] = useState(0);
  const [time, setTime] = useState(0);
  const reset = () => {
    setTime(0);
    setCurrentWordIndex(0);
    setNumberOfMistakes(0);
    setStarted(true);
  };
  useTimer({ started, time, setTime });
  useLatestKey(
    currentWord,
    setCurrentWord,
    numberOfMistakes,
    setNumberOfMistakes
  );
  useEffect(() => {
    setCurrentWord(words[currentWordIndex]);
  }, [currentWordIndex, setCurrentWord, words]);
  useEffect(() => {
    if (started && currentWord === "" && currentWordIndex < words.length - 1) {
      setCurrentWord(".");
      setCurrentWordIndex(currentWordIndex + 1);
    } else if (
      started &&
      currentWord === "" &&
      currentWordIndex === words.length - 1
    ) {
      console.log("FEFAFDEFA");
      setStarted(false);
    }
  }, [
    currentWord,
    started,
    setStarted,
    currentWordIndex,
    setCurrentWordIndex,
    words,
  ]);

  useEffect(() => {
    if (!started && (!bestTime || bestTime > time) && time !== 0) {
      setBestTime(time);
    }
  }, [started, bestTime, setBestTime, time]);
  return (
    <div className='WordGame'>
      {time.toFixed(1)}
      <button
        className='start-btn'
        onClick={() => {
          bestTime ? reset() : setStarted(true);
        }}>
        {bestTime ? "TRY AGAIN" : "START"}
      </button>
      <div className=''>
        Best time: {bestTime ? bestTime.toLocaleString() : "--"}
      </div>
      <div className=''>Number of mistakes: {numberOfMistakes}</div>
      {started && <div>{currentWord}</div>}
    </div>
  );
};

export default TypeByWord;
