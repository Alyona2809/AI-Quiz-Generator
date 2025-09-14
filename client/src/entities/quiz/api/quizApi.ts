import axios from "axios";
import type { QuizData } from "../../../shared/types";

const API_BASE_URL = import.meta.env.VITE_API;

export const quizApi = {
  generateQuiz: async (formData: FormData): Promise<QuizData> => {
    const response = await axios.post(
      `${API_BASE_URL}/quiz/generate-quiz`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.data;
  },
};
