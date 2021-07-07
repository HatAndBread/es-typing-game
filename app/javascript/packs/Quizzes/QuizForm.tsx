import React, { useState, useEffect } from "react";
import AuthenticityToken from "../AuthenticityToken";
import { Quiz } from "../Types/JsonTypes";
import { getContext } from "../ReactApp";
//@ts-ignore
import garbage from "../../../assets/images/garbage.svg";

const NewQuiz = ({
  edit,
  quiz,
  errors,
}: {
  edit: boolean;
  quiz: Quiz;
  errors: any;
}) => {
  const [acknowledgedErrors, setAcknowledgedErrors] = useState(
    errors ? false : true
  );
  const currentUser = getContext().currentUser;
  useEffect(() => {
    if (errors && !acknowledgedErrors) {
      alert("That quiz name has already been used. Please choose a new one.");
      setAcknowledgedErrors(true);
    }
  }, [acknowledgedErrors, setAcknowledgedErrors, errors]);

  const [words, setWords] = useState<string[]>(
    errors ? errors : quiz.questions.map((question) => question.word)
  );
  const addNewWord = () => {
    const newWords = words.map((word) => word);
    newWords.push("");
    setWords(newWords);
  };

  const takeOutTrash = (index: number) => {
    const newWords = words.map((word) => word);
    newWords.splice(index, 1);
    console.log(newWords, "sa");
    setWords(newWords);
  };
  useEffect(() => {
    console.log(words, "🤓");
  }, [words]);
  console.log(quiz);
  return (
    <div className='QuizForm'>
      <form
        className='form'
        id='new_quiz'
        action={edit ? `/quizzes/${quiz.id}}` : "/quizzes"}
        acceptCharset='UTF-8'
        method='post'>
        <AuthenticityToken />
        {edit && <input type='hidden' name='_method' value='patch' />}
        <label className='title-label' htmlFor='quiz_title'>
          Quiz name
        </label>
        <input
          className='title-input'
          type='text'
          name='quiz[title]'
          id='quiz_title'
          defaultValue={quiz.title ? quiz.title : ""}
          autoFocus
        />
        <label>Words</label>
        {words.map((word, index) => (
          <div className='input-and-garbage' key={index}>
            <input
              type='text'
              name={`words[]`}
              id={`words${index}`}
              onChange={(e) => {
                const newArr = words.map((word) => word);
                newArr[index] = e.currentTarget.value;
                console.log(newArr);
                setWords(newArr);
              }}
              value={words[index]}
              autoFocus
            />

            <img
              src={garbage}
              alt='🗑'
              className='garbage'
              width='24'
              onClick={() => takeOutTrash(index)}
            />
          </div>
        ))}
        <button className='add-word-btn' onClick={addNewWord} type='button'>
          Add
        </button>
        <button type='submit'>Save</button>
      </form>
    </div>
  );
};

export default NewQuiz;
