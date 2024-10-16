import { useState } from "react";
import QUESTIONS from "../questions";
import Answers from "./Answers";
import QuizTimer from "./QuizTimer";

const Question = ({ index, handleSkippAnswer, onSelect }) => {
  const [answer, setAnswer] = useState({ selectedAnswer: "", isCorrect: null });

  let timer = 10000;
  if (answer.selectedAnswer) {
    timer = 1000;
  }
  if (answer.isCorrect !== null) {
    timer = 2000;
  }
  function handleSelectedAnswer(answer) {
    setAnswer({ selectedAnswer: answer, isCorrect: null });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[index].answers[0] === answer,
      });

      setTimeout(() => {
        onSelect(answer);
      }, 2000);
    }, 1000);
  }

  let answerState = "";
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }
  return (
    <div id="question">
      <QuizTimer
        key={timer}
        timer={timer}
        OnTimeOut={answer.selectedAnswer === "" ? handleSkippAnswer : null}
        mode={answerState}
      />
      <p>{QUESTIONS[index].text}</p>
      <Answers
        onClick={handleSelectedAnswer}
        answers={QUESTIONS[index].answers}
        answerState={answerState}
        selectedAnswer={answer.selectedAnswer}
      />
    </div>
  );
};

export default Question;
