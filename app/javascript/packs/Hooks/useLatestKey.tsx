import React, { useEffect, useState } from "react";

const useLatestKey = (
  currentWord: string,
  setCurrentWord: React.Dispatch<React.SetStateAction<string>>,
  numberOfMistakes: number,
  setNumberOfMistakes: React.Dispatch<React.SetStateAction<number>>,
  started: boolean,
  buzzSound: HTMLAudioElement | null
): string => {
  const [latestKey, setLatestKey] = useState("");
  const cw = currentWord.toLowerCase();
  let handleKeydown: undefined | ((e: KeyboardEvent) => void);
  useEffect(() => {
    if (started) {
      handleKeydown = (e: KeyboardEvent) => {
        const key = e.key.toLowerCase();
        if (isValidLetter(key)) {
          setLatestKey(key);
          if (cw[0] === key) {
            setCurrentWord(cw.substring(1, cw.length));
          } else {
            buzzSound && buzzSound.play();
            setNumberOfMistakes(numberOfMistakes + 1);
          }
        }
      };
      window.addEventListener("keydown", handleKeydown);
    }
    return () => {
      setLatestKey("");
      if (handleKeydown) {
        window.removeEventListener("keydown", handleKeydown);
      }
    };
  }, [
    setLatestKey,
    setCurrentWord,
    currentWord,
    numberOfMistakes,
    setNumberOfMistakes,
    started,
  ]);

  return latestKey;
};

const isValidLetter = (letter: string) => {
  if (
    [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      " ",
      "-",
      "?",
      ",",
      ".",
      ";",
      ":",
      "@",
      "!",
      `"`,
      "#",
      "$",
      "%",
      "&",
      `'`,
      `(`,
      `)`,
      `¥`,
      `[`,
      `_`,
      `<`,
      `>`,
      `]`,
      `{`,
      `}`,
      `*`,
      `+`,
    ].includes(letter)
  ) {
    return true;
  }
  return false;
};
export default useLatestKey;
