import { useEffect, useState } from "react";

const QuizTimer = ({ timer, OnTimeOut, mode }) => {
  const [remainingTime, setRemainingTime] = useState(timer);

  useEffect(() => {
    const timeOut = setTimeout(OnTimeOut, timer);
    return () => clearTimeout(timeOut);
  }, [timer, OnTimeOut]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <progress
      id="question-time"
      className={mode}
      value={remainingTime}
      max={timer}
    ></progress>
  );
};

export default QuizTimer;
