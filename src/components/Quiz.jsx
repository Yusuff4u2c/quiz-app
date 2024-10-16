import { useCallback, useRef, useState } from "react";
import QUESTIONS from "../questions";
import QuizCompleteImg from "../assets/quiz-complete.png";
import Question from "./Question";

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
    return (
      <div id="summary">
        <img src={QuizCompleteImg} alt="Trophy Icon" />
        <h2>Quiz Completed</h2>
      </div>
    );
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
