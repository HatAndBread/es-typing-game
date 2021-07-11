import React, { useEffect, useState } from "react";
import { Quiz } from "../Types/JsonTypes";
import { camel } from "../camel";
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
              {player.name}: {player.bestTime}
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
