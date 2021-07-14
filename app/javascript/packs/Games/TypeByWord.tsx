import React, { useState, useEffect, useRef } from "react";
import ProgressChart from "./ProgressChart";
import { Quiz, Player } from "../Types/JsonTypes";
import useTimer from "../Hooks/useTimer";
import useLatestKey from "../Hooks/useLatestKey";
import { useVoices } from "../Hooks/useVoices";
import { saveBestTime } from "../saveBestTime";
import { randomizeArr } from "../randomizeArr";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import buzzPath from "../../../assets/audios/buzz.mp3";
let lastNumberOfMistakes = 0;

const TypeByWord = ({
  quiz,
  words,
  player,
  setPlayer,
  listening,
  setCurrentGame,
}: {
  quiz: Quiz;
  words: string[];
  player: Player | null;
  setPlayer: React.Dispatch<React.SetStateAction<Player | null>>;
  listening?: boolean;
  setCurrentGame: React.Dispatch<React.SetStateAction<string | null>>;
}): JSX.Element => {
  const [started, setStarted] = useState(false);
  const [randomizedWords, setRanomizedWords] = useState(words);
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
  const [buzzSound, setBuzzSound] = useState<null | HTMLAudioElement>(null);
  useEffect(() => {
    if (!buzzSound) {
      setBuzzSound(new Audio(buzzPath));
    }
  }, [buzzSound, setBuzzSound]);
  const btnRef = useRef<null | HTMLButtonElement>(null);
  const reset = () => {
    lastNumberOfMistakes = 0;
    setTime(0);
    setCurrentWordIndex(0);
    setNumberOfMistakes(0);
    setStarted(true);
  };
  useVoices(setVoice, quiz);
  useTimer({ started, time, setTime });
  useLatestKey(
    currentWord,
    setCurrentWord,
    numberOfMistakes,
    setNumberOfMistakes,
    started,
    buzzSound
  );
  useEffect(() => {
    if (utterance && started) {
      if (voice) utterance.voice = voice;
      speechSynthesis.speak(utterance);
    }
  }, [utterance, started]);
  useEffect(() => {
    setCurrentWord(randomizedWords[currentWordIndex]);
    setUtterance(
      new SpeechSynthesisUtterance(randomizedWords[currentWordIndex])
    );
  }, [currentWordIndex, setCurrentWord, randomizedWords]);
  useEffect(() => {
    if (numberOfMistakes > 0 && numberOfMistakes !== lastNumberOfMistakes) {
      lastNumberOfMistakes += 1;
      setTime(time + 1);
    }
  }, [numberOfMistakes, time]);

  useEffect(() => {
    return () => {
      lastNumberOfMistakes = 0;
    };
  }, []);

  useEffect(() => {
    if (
      started &&
      currentWord === "" &&
      currentWordIndex < randomizedWords.length - 1
    ) {
      const r = () => {
        setCurrentWord(".");
        setCurrentWordIndex(currentWordIndex + 1);
        setUtterance(null);
      };
      if (listening) {
        setTimeout(r, 500);
      } else {
        r();
      }
    } else if (
      started &&
      currentWord === "" &&
      currentWordIndex === randomizedWords.length - 1
    ) {
      setCurrentWordIndex(0);
      setUtterance(null);
      const oldTimes = [...times];
      oldTimes.push(time);
      setTimes(oldTimes);
      setStarted(false);
    }
  }, [
    currentWord,
    started,
    setStarted,
    currentWordIndex,
    setCurrentWordIndex,
    randomizedWords,
  ]);
  const speak = () => {
    if (utterance && started) {
      if (voice) utterance.voice = voice;
      speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if (!started && (!bestTime || bestTime > time) && time !== 0) {
      setBestTime(time);
      if (quiz.id && player) {
        saveBestTime(quiz.id, player.name, time, setPlayer);
      }
    }
  }, [started, bestTime, setBestTime, time]);

  useEffect(() => {
    if (!started) {
      setRanomizedWords(randomizeArr(words));
    }
  }, [started, setRanomizedWords, words]);
  return (
    <div className='WordGame'>
      <div className='stats-display'>
        <button
          title='BACK'
          onClick={() => setCurrentGame(null)}
          className='back-btn'>
          ⏪
        </button>
        <div className='stats-item'>
          BEST TIME⏰: {bestTime ? bestTime.toLocaleString() : "--"}
        </div>
        <div className='stats-item'>MISTAKES😱: {numberOfMistakes}</div>
      </div>

      {<div className='time-display'>{time.toFixed(1)}</div>}
      {listening ? (
        <button onClick={speak} className='speak-btn'>
          🗣
        </button>
      ) : (
        ""
      )}
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

      <div style={{ fontSize: "50px" }}>
        {listening && started
          ? randomizedWords[currentWordIndex].substring(
              0,
              randomizedWords[currentWordIndex].length - currentWord.length
            )
          : ""}
        {!listening && started
          ? randomizedWords[currentWordIndex].substring(
              randomizedWords[currentWordIndex].length - currentWord.length,
              randomizedWords[currentWordIndex].length
            )
          : ""}
      </div>

      <div className='canvas-container'>
        <ProgressChart times={times} />
      </div>
    </div>
  );
};

export default TypeByWord;
