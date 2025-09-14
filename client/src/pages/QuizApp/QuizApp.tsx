import React from "react";
import { useQuizStore } from "../../entities/quiz";
import { InputForm } from "../../features/quiz-generation/ui/InputForm";
import { QuizForm } from "../../features/quiz-taking/ui/QuizForm";
import { ResultsDisplay } from "../../features/quiz-results/ui/ResultsDisplay";
import { LoadingSpinner, Button } from "../../shared/ui";

export const QuizApp: React.FC = () => {
  const { currentState, isLoading, error } = useQuizStore();

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
        }}
      >
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4" style={{ color: "#4b5563" }}>
            Генерируем квиз...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{
          background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
        }}
      >
        <div
          className="card text-center"
          style={{ maxWidth: "28rem", width: "100%" }}
        >
          <div
            className="text-red-500"
            style={{ fontSize: "3.75rem", marginBottom: "1rem" }}
          >
            ⚠️
          </div>
          <h2
            className="card-title"
            style={{ fontSize: "1.5rem", marginBottom: "1rem" }}
          >
            Произошла ошибка
          </h2>
          <p className="card-subtitle" style={{ marginBottom: "1.5rem" }}>
            {error}
          </p>
          <Button onClick={() => window.location.reload()}>
            Попробовать снова
          </Button>
        </div>
      </div>
    );
  }

  switch (currentState) {
    case "input":
      return <InputForm />;
    case "quiz":
      return <QuizForm />;
    case "results":
      return <ResultsDisplay />;
    default:
      return <InputForm />;
  }
};
