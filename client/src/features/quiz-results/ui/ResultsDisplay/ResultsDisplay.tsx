import React from "react";
import { Button } from "../../../../shared/ui";
import { useQuizStore } from "../../../../entities/quiz";
import {
  calculateQuizResults,
  formatScoreMessage,
  getScoreColor,
} from "../../../../shared/lib/utils";

export const ResultsDisplay: React.FC = () => {
  const { quizData, userAnswers, resetQuiz } = useQuizStore();

  if (!quizData?.quiz) {
    return <div>Нет данных квиза</div>;
  }

  const { percentage } = calculateQuizResults(quizData, userAnswers);
  const scoreMessage = formatScoreMessage(percentage);
  const scoreColor = getScoreColor(percentage);

  const handleRestart = () => {
    resetQuiz();
  };

  return (
    <div
      className="results-container"
      style={{
        background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
        minHeight: "100vh",
        padding: "2rem 1rem",
      }}
    >
      <div className="card">
        <div className="results-header">
          <h1 className="results-title">Результаты квиза</h1>
          <div
            className={`results-score ${
              scoreColor.includes("green")
                ? "excellent"
                : scoreColor.includes("yellow")
                ? "medium"
                : "poor"
            }`}
          >
            {scoreMessage}
          </div>
          <p className="results-percentage">
            Процент правильных ответов: {percentage}%
          </p>
        </div>

        <div className="space-y-6">
          {quizData.quiz.map((question, index) => {
            const userAnswer = userAnswers[question.id];
            const isCorrect =
              userAnswer !== undefined && userAnswer === question.correctAnswer;

            return (
              <div key={question.id} className="quiz-question">
                <h3 className="quiz-question-title">
                  {index + 1}. {question.question}
                </h3>

                <div className="quiz-options">
                  {question.options.map((option, optionIndex) => {
                    let optionClass = "quiz-option ";

                    if (optionIndex === question.correctAnswer) {
                      optionClass += "correct";
                    } else if (
                      userAnswer !== undefined &&
                      optionIndex === userAnswer &&
                      !isCorrect
                    ) {
                      optionClass += "incorrect";
                    }

                    return (
                      <div key={optionIndex} className={optionClass}>
                        <div className="flex items-center">
                          {optionIndex === question.correctAnswer && (
                            <span className="text-green-600 font-bold mr-2">
                              ✓
                            </span>
                          )}
                          {userAnswer !== undefined &&
                            optionIndex === userAnswer &&
                            !isCorrect && (
                              <span className="text-red-600 font-bold mr-2">
                                ✗
                              </span>
                            )}
                          <span>{option}</span>
                          {optionIndex === question.correctAnswer && (
                            <span className="ml-auto text-green-600 font-semibold">
                              Правильный ответ
                            </span>
                          )}
                          {userAnswer !== undefined &&
                            optionIndex === userAnswer &&
                            !isCorrect && (
                              <span className="ml-auto text-red-600 font-semibold">
                                Ваш ответ
                              </span>
                            )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="results-actions">
          <Button onClick={handleRestart}>Пройти еще раз</Button>
        </div>
      </div>
    </div>
  );
};
