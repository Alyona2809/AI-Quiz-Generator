export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizData {
  quiz: QuizQuestion[];
}

export interface UserAnswers {
  [questionId: number]: number;
}
