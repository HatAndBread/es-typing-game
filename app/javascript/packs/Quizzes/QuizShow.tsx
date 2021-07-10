import React, { useState } from "react";
import TypeBySound from "../Games/TypeBySound";
import TypeByWord from "../Games/TypeByWord";
import { Quiz } from "../Types/JsonTypes";
const QuizShow = ({ quiz }: { quiz: Quiz }) => {
  const [currentGame, setCurrentGame] = useState<null | string>(null);
  const words = quiz.questions.map((question) => question.word);
  const [studentName, setStudentName] = useState<string>("");
  const [nameSaved, setNameSaved] = useState(false);
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
          {!nameSaved ? (
            <>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (studentName !== "") {
                    setNameSaved(true);
                  }
                }}>
                <input
                  type='text'
                  autoFocus
                  onChange={(e) => setStudentName(e.target.value)}
                />
                <button
                  onClick={() => studentName !== "" && setNameSaved(true)}>
                  OK
                </button>
              </form>
            </>
          ) : (
            <>
              {nameSaved ? studentName : undefined}
              <button onClick={() => setCurrentGame("sound")}>
                Type By Sound
              </button>
              <button onClick={() => setCurrentGame("word")}>
                Type By Word
              </button>
            </>
          )}
        </div>
      )}

      {getGame()}
    </div>
  );
};

export default QuizShow;
