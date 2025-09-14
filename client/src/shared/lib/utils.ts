import type { QuizData, UserAnswers } from "../types";

export const formatScoreMessage = (percentage: number): string => {
  if (percentage >= 90) return "Отлично! 🎉";
  if (percentage >= 70) return "Хорошо! 👍";
  if (percentage >= 50) return "Неплохо! 👌";
  return "Попробуйте еще раз! 💪";
};

export const getScoreColor = (percentage: number): string => {
  if (percentage >= 70) return "text-green-600 bg-green-100";
  if (percentage >= 50) return "text-yellow-600 bg-yellow-100";
  return "text-red-600 bg-red-100";
};

export const calculateQuizResults = (
  quizData: QuizData,
  userAnswers: UserAnswers
): {
  correctAnswers: number;
  totalQuestions: number;
  percentage: number;
  results: Array<{
    question: { id: number; correctAnswer: number };
    userAnswer: number | undefined;
    isCorrect: boolean;
    correctAnswer: number;
  }>;
} => {
  let correctAnswers = 0;
  const results = quizData.quiz.map((question) => {
    const userAnswer = userAnswers[question.id];
    const isCorrect = userAnswer === question.correctAnswer;

    if (isCorrect) {
      correctAnswers++;
    }

    return {
      question,
      userAnswer,
      isCorrect,
      correctAnswer: question.correctAnswer,
    };
  });

  return {
    correctAnswers,
    totalQuestions: quizData.quiz.length,
    percentage: Math.round((correctAnswers / quizData.quiz.length) * 100),
    results,
  };
};
