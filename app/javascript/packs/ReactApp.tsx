import React, { createContext, useContext } from "react";
import QuizForm from "./Quizzes/QuizForm";
import QuizzesIndex from "./Quizzes/QuizzesIndex";
import { CurrentUser } from "./Types/JsonTypes";

type ContextProps = { currentUser: CurrentUser | null };

export const Context = createContext<Partial<ContextProps>>({});

const ReactApp = ({
  data,
  page,
  currentUser,
}: {
  data: any;
  page: string;
  currentUser: CurrentUser | null;
}) => {
  const globals = { currentUser };
  const getPage = () => {
    switch (page) {
      case "new_quiz": {
        return <QuizForm edit={false} quiz={data} />;
      }
      case "edit_quiz": {
        return <QuizForm edit={true} quiz={data} />;
      }
      case "quizzes_index": {
        return <QuizzesIndex edit={true} quizzes={data} />;
      }
      case "teacher_index": {
        return <QuizzesIndex edit={false} quizzes={data} />;
      }
      default:
        return <></>;
    }
  };
  return (
    <Context.Provider value={globals}>
      <div className='App'>{getPage()}</div>
    </Context.Provider>
  );
};

export const getContext = () => useContext(Context);

export default ReactApp;
