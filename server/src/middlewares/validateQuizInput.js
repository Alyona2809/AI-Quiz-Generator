const formatResponse = require("../utils/formatResponse");

const validateQuizInput = (req, res, next) => {
  if (!req.file && !req.body.text) {
    return res
      .status(400)
      .json(formatResponse(false, "Текст или файл не предоставлены", null));
  }

  if (req.body.text && !req.body.text.trim()) {
    return res
      .status(400)
      .json(formatResponse(false, "Текстовое содержимое не найдено", null));
  }

  next();
};

module.exports = validateQuizInput;
