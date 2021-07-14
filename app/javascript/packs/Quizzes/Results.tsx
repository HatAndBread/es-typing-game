import React, { useEffect, useState } from "react";
import { Quiz } from "../Types/JsonTypes";
import { camel } from "../camel";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import garbagePath from "../../../assets/images/garbage.svg";

const Results = ({ quiz }: { quiz: Quiz }): JSX.Element => {
  const [currentQuiz, setCurrentQuiz] = useState(quiz);
  const [numberToShow, setNumberToShow] = useState(quiz.players.length);
  const orderByPoints = (arr: Quiz) => {
    const filtered = arr.players.filter((i) => i.bestTime !== null);
    const sorted = filtered.sort(
      (a, b) => parseFloat(a.bestTime) - parseFloat(b.bestTime)
    );
    arr.players = sorted;
    return arr;
  };
  const updateQuizStatus = async () => {
    const res = await fetch(`/quizzes/${quiz.id}/current_status`);
    const data = await res.json();
    const camelized: Quiz = camel(data);
    const orderedQuiz = orderByPoints(camelized);
    setCurrentQuiz(orderedQuiz);
    setNumberToShow(quiz.players.length);
  };
  useEffect(() => {
    updateQuizStatus();
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
    await fetch(`/player/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        "X-CSRF-Token": document.getElementsByName("csrf-token")[0].content,
      },
    });
  };

  return (
    <div className='Results'>
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
