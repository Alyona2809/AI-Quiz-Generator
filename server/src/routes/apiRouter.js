const express = require("express");
const quizRouter = require("./quizRouter");

const apiRouter = express.Router();

apiRouter.use("/quiz", quizRouter);

apiRouter.get("/health", (req, res) => {
  res.json({ status: "OK", message: "API генератора тестов AI работает" });
});

module.exports = apiRouter;
