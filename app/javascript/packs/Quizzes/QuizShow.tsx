import React, { useState } from "react";
import TypeBySound from "../Games/TypeBySound";
import TypeByWord from "../Games/TypeByWord";
import { Quiz, Player } from "../Types/JsonTypes";
import { getRequestObject } from "../getRequestObject";
import { camel } from "../camel";

const QuizShow = ({ quiz }: { quiz: Quiz }): JSX.Element => {
  const [currentGame, setCurrentGame] = useState<null | string>(null);
  const words = quiz.questions.map((question) => question.word);
  const [studentName, setStudentName] = useState<string>("");
  const [nameSaved, setNameSaved] = useState(false);
  const [player, setPlayer] = useState<null | Player>(null);
  const savePlayer = async () => {
    const res = await fetch(
      `/quizzes/${quiz.id}/players`,
      getRequestObject("POST", { name: studentName })
    );
    const data = await res.json();
    if (data.error) {
      alert(`You can't use that name 😿`);
      return false;
    } else {
      const camelized: Player = camel(data);
      setPlayer(camelized);
      return true;
    }
  };
  const getGame = () => {
    if (!currentGame) return undefined;
    switch (currentGame) {
      case "sound":
        return <TypeBySound quiz={quiz} words={words} />;
      case "word":
        return (
          <TypeByWord
            quiz={quiz}
            words={words}
            player={player}
            setPlayer={setPlayer}
          />
        );
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
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (studentName !== "" && (await savePlayer())) {
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
                <button type='submit'>OK</button>
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
