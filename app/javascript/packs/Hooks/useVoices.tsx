import React, { useEffect } from "react";

const useVoices = (
  setVoice: React.Dispatch<React.SetStateAction<SpeechSynthesisVoice | null>>
): void => {
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
};

export { useVoices };
