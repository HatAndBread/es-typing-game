import React, { createContext, useContext } from "react";
import QuizForm from "./Quizzes/QuizForm";
import QuizzesIndex from "./Quizzes/QuizzesIndex";
import QuizShow from "./Quizzes/QuizShow";
import Results from "./Quizzes/Results";
import { CurrentUser } from "./Types/JsonTypes";

type ContextProps = { currentUser: CurrentUser | null };

export const Context = createContext<Partial<ContextProps>>({});

const ReactApp = ({
  data,
  page,
  currentUser,
  errors,
}: {
  data: any;
  page: string;
  currentUser: CurrentUser | null;
  errors: any;
}): JSX.Element => {
  const globals = { currentUser };
  const getPage = () => {
    switch (page) {
      case "new_quiz": {
        return <QuizForm edit={false} quiz={data} errors={errors} />;
      }
      case "edit_quiz": {
        return <QuizForm edit={true} quiz={data} errors={errors} />;
      }
      case "quizzes_index": {
        return <QuizzesIndex edit={true} quizzes={data} />;
      }
      case "teacher_index": {
        return <QuizzesIndex edit={false} quizzes={data} />;
      }
      case "show_quiz": {
        return <QuizShow quiz={data} />;
      }
      case "results": {
        return <Results quiz={data} />;
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
