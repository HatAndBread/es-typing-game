import React, { useEffect, useState } from "react";
import { Quiz } from "../Types/JsonTypes";
import { camel } from "../camel";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import garbagePath from "../../../assets/images/garbage.svg";
import { getRequestObject } from "../getRequestObject";
const Results = ({ quiz }: { quiz: Quiz }): JSX.Element => {
  const [currentQuiz, setCurrentQuiz] = useState(quiz);
  const [numberToShow, setNumberToShow] = useState(3);
  const orderByPoints = (arr: Quiz) => {
    arr.players.sort((a, b) => parseFloat(a.bestTime) - parseFloat(b.bestTime));
  };
  const updateQuizStatus = async () => {
    const res = await fetch(`/quizzes/${quiz.id}/current_status`);
    const data = await res.json();
    const camelized: Quiz = camel(data);
    orderByPoints(camelized);
    console.log(camelized);
    setCurrentQuiz(camelized);
  };
  useEffect(() => {
    setInterval(updateQuizStatus, 3000);
  }, []);
  const resetScores = () => fetch(`/quizzes/${quiz.id}/reset_quiz`);
  const getPoint = (num: number) => {
    if (num === 0) return "🏆";
    if (num === 1) return "🥈";
    if (num === 2) return "🥉";
    return "⭐️";
  };
  const takeOutTrash = async (id: number) => {
    console.log(id);
    const res = await fetch(`/player/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        "X-CSRF-Token": document.getElementsByName("csrf-token")[0].content,
      },
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div className='Results'>
      <label htmlFor='number-to-show'>
        Results to show:
        <select
          name='number-to-show'
          id='number-to-show'
          defaultValue={3}
          onChange={(e) => setNumberToShow(parseInt(e.target.value))}>
          {[...Array(currentQuiz.players.length)].map((e, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </label>
      <button onClick={resetScores}>Reset Scores</button>
      {currentQuiz.players.map((player, index) => (
        <div key={index} className='player-stats'>
          {index < numberToShow ? (
            <div>
              {getPoint(index)}
              {player.name}: {player.bestTime}
              <img
                src={garbagePath}
                alt='Delete'
                onClick={() => takeOutTrash(player.id)}
                width='30'
                className='pointer trash'></img>
            </div>
          ) : (
            ""
          )}
        </div>
      ))}
    </div>
  );
};

export default Results;
