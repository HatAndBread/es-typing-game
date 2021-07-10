import React, { useState, useEffect } from "react";
import { Quiz } from "../Types/JsonTypes";
import useTimer from "../Hooks/useTimer";
import useLatestKey from "../Hooks/useLatestKey";

let lastNumberOfMistakes = 0;
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
  const [numberOfMistakes, setNumberOfMistakes] = useState(0);
  const [time, setTime] = useState(0);
  const [voice, setVoice] = useState<null | SpeechSynthesisVoice>(null);
  const [utterance, setUtterance] = useState<null | SpeechSynthesisUtterance>(
    null
  );
  useEffect(() => {
    const getEnglishVoice = (arr: SpeechSynthesisVoice[]) => {
      const firstVoice = arr.find((voice) => voice.lang.includes("en-US"));
      if (firstVoice) {
        setVoice(firstVoice);
      }
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (speechSynthesis.addEventListener) {
      speechSynthesis.addEventListener("voiceschanged", () => {
        getEnglishVoice(speechSynthesis.getVoices());
      });
    } else {
      getEnglishVoice(speechSynthesis.getVoices());
    }
  }, []);
  const reset = () => {
    lastNumberOfMistakes = 0;
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
      {started && <div style={{ fontSize: "50px" }}>{currentWord}</div>}
    </div>
  );
};
export default TypeByWord;
