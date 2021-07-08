import React, { useEffect, useState } from "react";

const useLatestKey = () => {
  const [latestKey, setLatestKey] = useState("");
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (isValidLetter(e.key)) {
        setLatestKey(e.key.toLowerCase());
      }
    };
    window.addEventListener("keydown", handleKeydown);

    return () => {
      setLatestKey("");
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);
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
    ].includes(letter.toLowerCase())
  ) {
    return true;
  }
  return false;
};
export default useLatestKey;
