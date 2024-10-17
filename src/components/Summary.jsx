import QuizCompleteImg from "../assets/quiz-complete.png";
import QUESTIONS from "../questions";
const Summary = ({ userAnswers }) => {
  const skippedAnswer = userAnswers.filter((answer) => answer === null);
  const correctAnswer = userAnswers.filter(
    (answer, index) => QUESTIONS[index].answers[0] === answer
  );

  const skippedAnswerShare = Math.round(
    (skippedAnswer.length / userAnswers.length) * 100
  );

  const correctAnswerShare = Math.round(
    (correctAnswer.length / userAnswers.length) * 100
  );
  const wrongAnswerShare = 100 - (skippedAnswerShare + correctAnswerShare);
  return (
    <div id="summary">
      <img src={QuizCompleteImg} alt="Trophy Icon" />
      <h2>Quiz Completed</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedAnswerShare}%</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{correctAnswerShare}%</span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number">{wrongAnswerShare}%</span>
          <span className="text">answered incorrectly</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
          let cssClass = "user-answer";
          if (answer === null) {
            cssClass += " skipped";
          } else if (answer === QUESTIONS[index].answers[0]) {
            cssClass += " correct";
          } else {
            cssClass += " wrong";
          }

          return (
            <li key={index}>
              <h3>{index}</h3>
              <p className="question">{QUESTIONS[index].text}</p>
              <p className={cssClass}>{answer ?? "Skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Summary;