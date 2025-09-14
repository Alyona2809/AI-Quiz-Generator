import { create } from "zustand";
import type { QuizData, UserAnswers, AppState } from "../../../shared/types";

interface QuizStore {
  currentState: AppState;
  quizData: QuizData | null;
  userAnswers: UserAnswers;
  isLoading: boolean;
  error: string | null;

  setQuizData: (data: QuizData) => void;
  setUserAnswer: (questionId: number, answerIndex: number) => void;
  setCurrentState: (state: AppState) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizStore>((set) => ({
  currentState: "input",
  quizData: null,
  userAnswers: {},
  isLoading: false,
  error: null,

  setQuizData: (data) => set({ quizData: data }),
  setUserAnswer: (questionId, answerIndex) =>
    set((state) => ({
      userAnswers: {
        ...state.userAnswers,
        [questionId]: answerIndex,
      },
    })),
  setCurrentState: (state) => set({ currentState: state }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  resetQuiz: () =>
    set({
      currentState: "input",
      quizData: null,
      userAnswers: {},
      isLoading: false,
      error: null,
    }),
}));
