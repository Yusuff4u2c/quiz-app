import { useCallback, useRef, useState } from "react";
import QUESTIONS from "../questions";
import Question from "./Question";
import Summary from "./Summary";

const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState([]);

  const nextQuestionIndex = userAnswers.length;

  const quizIsComplete = nextQuestionIndex === QUESTIONS.length;

  function handleSelectAnswer(selectedAnswer) {
    setUserAnswers((prevAnswers) => {
      return [...prevAnswers, selectedAnswer];
    });
  }

  const memoizedHandleSelectAnswer = useCallback(handleSelectAnswer, []);

  const handleSkippAnswer = useCallback(() => {
    handleSelectAnswer(null);
  }, [handleSelectAnswer]);

  if (quizIsComplete) {
    return <Summary userAnswers={userAnswers} />;
  }

  return (
    <div id="quiz">
      <Question
        key={nextQuestionIndex}
        index={nextQuestionIndex}
        handleSkippAnswer={handleSkippAnswer}
        onSelect={memoizedHandleSelectAnswer}
      />
    </div>
  );
};

export default Quiz;
