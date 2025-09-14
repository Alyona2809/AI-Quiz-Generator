const formatResponse = require("../utils/formatResponse");

const generateQuiz = async (req, res) => {
  try {
    res.json(
      formatResponse(true, "Викторина успешно создана", {
        quiz: req.quizData,
      })
    );
  } catch (error) {
    console.error("Ошибка в контроллере викторины:", error);
    res
      .status(500)
      .json(formatResponse(false, "Не удалось создать тест", null));
  }
};

module.exports = {
  generateQuiz,
};
