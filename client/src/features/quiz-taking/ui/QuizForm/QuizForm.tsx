import React from "react";
import { Button } from "../../../../shared/ui";
import { useQuizStore } from "../../../../entities/quiz";

export const QuizForm: React.FC = () => {
  const { quizData, userAnswers, setUserAnswer, setCurrentState } =
    useQuizStore();

  if (!quizData?.quiz) {
    return <div>Нет данных квиза</div>;
  }

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setUserAnswer(questionId, answerIndex);
  };

  const handleSubmit = () => {
    setCurrentState("results");
  };

  const allQuestionsAnswered = quizData.quiz.every(
    (question) => userAnswers[question.id] !== undefined
  );

  return (
    <div
      className="quiz-container"
      style={{
        background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
        minHeight: "100vh",
        padding: "2rem 1rem",
      }}
    >
      <div className="card">
        <div className="card-header text-center">
          <h1
            className="card-title"
            style={{ fontSize: "1.875rem", marginBottom: "0.5rem" }}
          >
            Квиз
          </h1>
          <p className="card-subtitle">Ответьте на все вопросы</p>
        </div>

        <div className="space-y-8">
          {quizData.quiz.map((question, index) => (
            <div key={question.id} className="quiz-question">
              <h3 className="quiz-question-title">
                {index + 1}. {question.question}
              </h3>
              <div className="quiz-options">
                {question.options.map((option, optionIndex) => (
                  <label
                    key={optionIndex}
                    className={`quiz-option ${
                      userAnswers[question.id] === optionIndex ? "selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={optionIndex}
                      checked={userAnswers[question.id] === optionIndex}
                      onChange={() =>
                        handleAnswerSelect(question.id, optionIndex)
                      }
                      style={{ display: "none" }}
                    />
                    <div
                      className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                        userAnswers[question.id] === optionIndex
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {userAnswers[question.id] === optionIndex && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </div>
                    <span style={{ color: "#374151" }}>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            onClick={handleSubmit}
            disabled={!allQuestionsAnswered}
            variant="success"
          >
            Завершить и проверить
          </Button>
        </div>
      </div>
    </div>
  );
};
