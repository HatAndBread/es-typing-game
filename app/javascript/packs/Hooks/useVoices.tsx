import React, { useEffect } from "react";
import { Quiz } from "../Types/JsonTypes";

const useVoices = (
  setVoice: React.Dispatch<React.SetStateAction<SpeechSynthesisVoice | null>>,
  quiz: Quiz
): void => {
  useEffect(() => {
    const getEnglishVoice = (arr: SpeechSynthesisVoice[]) => {
      const firstVoice = arr.find((voice) => voice.lang.includes("en-US"));
      if (firstVoice) {
        setVoice(firstVoice);
      }
    };
    const getJapaneseVoice = (arr: SpeechSynthesisVoice[]) => {
      const firstVoice = arr.find((voice) => voice.lang.includes("ja"));
      if (firstVoice) {
        setVoice(firstVoice);
      }
    };
    const sv = () => {
      if (quiz.language === "English") {
        getEnglishVoice(speechSynthesis.getVoices());
      } else {
        getJapaneseVoice(speechSynthesis.getVoices());
      }
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (speechSynthesis.addEventListener) {
      sv();
      speechSynthesis.addEventListener("voiceschanged", sv);
    } else {
      sv();
    }
  }, [setVoice]);
};

export { useVoices };
