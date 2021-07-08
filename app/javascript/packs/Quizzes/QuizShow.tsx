import React, { useState } from "react";
import TypeBySound from "../Games/TypeBySound";
import TypeByWord from "../Games/TypeByWord";
import { Quiz } from "../Types/JsonTypes";
const QuizShow = ({ quiz }: { quiz: Quiz }) => {
  const [currentGame, setCurrentGame] = useState<null | string>(null);
  const words = quiz.questions.map((question) => question.word);
  console.log(quiz, "🎅");
  const getGame = () => {
    if (!currentGame) return undefined;
    switch (currentGame) {
      case "sound":
        return <TypeBySound quiz={quiz} words={words} />;
      case "word":
        return <TypeByWord quiz={quiz} words={words} />;
      default:
        return undefined;
    }
  };
  return (
    <div className='QuizShow'>
      {currentGame ? (
        <button onClick={() => setCurrentGame(null)}>Quit</button>
      ) : (
        <div className='flex'>
          <button onClick={() => setCurrentGame("sound")}>Type By Sound</button>
          <button onClick={() => setCurrentGame("word")}>Type By Word</button>
        </div>
      )}

      {getGame()}
    </div>
  );
};

export default QuizShow;
