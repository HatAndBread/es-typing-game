import React from "react";
import { Quiz } from "../Types/JsonTypes";
const Results = ({ quiz }: { quiz: Quiz }): JSX.Element => {
  console.log(quiz);
  return <div className='Results'>This is the quiz title: {quiz.title}</div>;
};

export default Results;
