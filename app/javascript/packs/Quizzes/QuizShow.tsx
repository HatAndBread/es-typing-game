import React, { useState } from "react";
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
        return (
          <TypeByWord
            quiz={quiz}
            words={words}
            player={player}
            setPlayer={setPlayer}
            listening={true}
            setCurrentGame={setCurrentGame}
          />
        );
      case "word":
        return (
          <TypeByWord
            quiz={quiz}
            words={words}
            player={player}
            setPlayer={setPlayer}
            setCurrentGame={setCurrentGame}
          />
        );
      default:
        return undefined;
    }
  };
  return (
    <div className='QuizShow'>
      {currentGame ? (
        ""
      ) : (
        <div className='flex column ac jc'>
          {!nameSaved ? (
            <>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (studentName !== "" && (await savePlayer())) {
                    setNameSaved(true);
                  }
                }}>
                <h1>What&apos;s your name?</h1>
                <input
                  type='text'
                  id='name-input'
                  name='name-input'
                  autoFocus
                  onChange={(e) => setStudentName(e.target.value)}
                />
                <button type='submit'>OK</button>
              </form>
            </>
          ) : (
            <>
              <div className='greeting'>
                Hello, {nameSaved ? studentName : "friend"}!
              </div>

              <button onClick={() => setCurrentGame("word")} className='xlfont'>
                READING 👀
              </button>
              <button
                onClick={() => setCurrentGame("sound")}
                className='xlfont'>
                LISTENING 👂
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
