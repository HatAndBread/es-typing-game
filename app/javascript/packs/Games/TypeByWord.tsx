import React, { useState, useEffect, useRef } from "react";
import ProgressChart from "./ProgressChart";
import { Quiz, Player } from "../Types/JsonTypes";
import useTimer from "../Hooks/useTimer";
import useLatestKey from "../Hooks/useLatestKey";
import { useVoices } from "../Hooks/useVoices";
import { saveBestTime } from "../saveBestTime";
let lastNumberOfMistakes = 0;

const TypeByWord = ({
  quiz,
  words,
  player,
  setPlayer,
}: {
  quiz: Quiz;
  words: string[];
  player: Player | null;
  setPlayer: React.Dispatch<React.SetStateAction<Player | null>>;
}): JSX.Element => {
  const [started, setStarted] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState(words[currentWordIndex]);
  const [bestTime, setBestTime] = useState<null | number>(null);
  const [numberOfMistakes, setNumberOfMistakes] = useState(0);
  const [time, setTime] = useState(0);
  const [times, setTimes] = useState<number[]>([]);
  const [voice, setVoice] = useState<null | SpeechSynthesisVoice>(null);
  const [utterance, setUtterance] = useState<null | SpeechSynthesisUtterance>(
    null
  );
  const btnRef = useRef<null | HTMLButtonElement>(null);
  const reset = () => {
    lastNumberOfMistakes = 0;
    setTime(0);
    setCurrentWordIndex(0);
    setNumberOfMistakes(0);
    setStarted(true);
  };
  useVoices(setVoice);
  useTimer({ started, time, setTime });
  useLatestKey(
    currentWord,
    setCurrentWord,
    numberOfMistakes,
    setNumberOfMistakes
  );
  useEffect(() => {
    if (utterance && started) {
      if (voice) utterance.voice = voice;
      speechSynthesis.speak(utterance);
    }
  }, [utterance, started]);
  useEffect(() => {
    setCurrentWord(words[currentWordIndex]);
    setUtterance(new SpeechSynthesisUtterance(words[currentWordIndex]));
  }, [currentWordIndex, setCurrentWord, words]);
  useEffect(() => {
    if (numberOfMistakes > 0 && numberOfMistakes !== lastNumberOfMistakes) {
      lastNumberOfMistakes += 1;
      setTime(time + 1);
    }
  }, [numberOfMistakes, time]);

  useEffect(() => {
    if (started && currentWord === "" && currentWordIndex < words.length - 1) {
      setCurrentWord(".");
      setCurrentWordIndex(currentWordIndex + 1);
      setUtterance(null);
    } else if (
      started &&
      currentWord === "" &&
      currentWordIndex === words.length - 1
    ) {
      const oldTimes = [...times];
      oldTimes.push(time);
      setTimes(oldTimes);
      setStarted(false);
      setUtterance(null);
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
      if (quiz.id && player) {
        saveBestTime(quiz.id, player.name, time, setPlayer);
      }
    }
  }, [started, bestTime, setBestTime, time]);
  return (
    <div className='WordGame'>
      <div className='stats-display'>
        <div className='stats-item'>
          BEST TIME: {bestTime ? bestTime.toLocaleString() : "--"}
        </div>
        <div className='stats-item'>MISTAKES: {numberOfMistakes}</div>
      </div>

      {<div className='time-display'>{time.toFixed(1)}</div>}
      <button
        ref={btnRef}
        className='start-btn'
        onClick={() => {
          if (btnRef.current) {
            btnRef.current.blur();
          }
          bestTime ? reset() : setStarted(true);
        }}>
        {bestTime ? "TRY AGAIN" : "START"}
      </button>
      {started && <div style={{ fontSize: "50px" }}>{currentWord}</div>}
      <div className='canvas-container'>
        <ProgressChart times={times} />
      </div>
    </div>
  );
};
export default TypeByWord;
