const express = require("express");
const { generateQuiz } = require("../controllers/quizController");
const uploadSingleFile = require("../middlewares/fileUpload");
const validateQuizInput = require("../middlewares/validateQuizInput");
const processPdfFile = require("../middlewares/processPdfFile");
const generateQuizWithOpenAI = require("../middlewares/openaiService");

const quizRouter = express.Router();

quizRouter.post(
  "/generate-quiz",
  uploadSingleFile,
  validateQuizInput,
  processPdfFile,
  generateQuizWithOpenAI,
  generateQuiz
);

module.exports = quizRouter;
