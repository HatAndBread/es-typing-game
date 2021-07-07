import React, { useState } from "react";
import { getContext } from "../ReactApp";
import { Quiz } from "../Types/JsonTypes";
//@ts-ignore
import garbage from "../../../assets/images/garbage.svg";
//@ts-ignore
import pencil from "../../../assets/images/pencil.svg";
const token: any = document.querySelector('meta[name="csrf-token"]');

const QuizzesIndex = ({ quizzes }: { quizzes: Quiz[] }) => {
  console.log(quizzes);
  const currentUser = getContext().currentUser;
  const [quizArr, setQuizArr] = useState(quizzes);

  const removeQuiz = (id: number) => {
    const newArr = quizArr.filter((quiz) => quiz.id !== id);
    console.log(newArr, "🌍", id);
    setQuizArr(newArr);
  };
  const destroy = async (id: number) => {
    try {
      const res = await fetch(`/quizzes/${id}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-CSRF-Token": token.content,
        },
      });
      const data = await res.json();
      console.log(data);
      if (data.message === "ok") removeQuiz(id);
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div className='QuizzesIndex'>
      {quizArr.map((quiz, index) => (
        <div className='quiz-card' key={index}>
          <div className='quiz-title'>{quiz.title}</div>
          <a href={`/quizzes/${quiz.id}`} className='link-btn'>
            Play
          </a>
          {currentUser ? (
            <div className='edit-delete'>
              <a href={`/quizzes/${quiz.id}/edit`}>
                <img src={pencil} alt='✏️' width='24' />
              </a>
              <div>
                <img
                  src={garbage}
                  alt='🗑'
                  width='24'
                  className='pointer'
                  onClick={() => {
                    const confirmation = confirm(
                      "Are you sure you want to delete this quiz?"
                    );
                    if (confirmation && quiz.id) {
                      destroy(quiz.id);
                    }
                  }}
                />
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      ))}
    </div>
  );
};

export default QuizzesIndex;
