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
        <button title='BACK' onClick={() => setCurrentGame(null)}>
          ⏪
        </button>
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
                <label htmlFor='name-input'>
                  {" "}
                  Name:
                  <input
                    type='text'
                    id='name-input'
                    name='name-input'
                    autoFocus
                    onChange={(e) => setStudentName(e.target.value)}
                  />
                </label>
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
