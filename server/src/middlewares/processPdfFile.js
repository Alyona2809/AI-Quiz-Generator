const pdfParse = require("pdf-parse");
const formatResponse = require("../utils/formatResponse");

const processPdfFile = async (req, res, next) => {
  try {
    if (req.file) {
      const pdfData = await pdfParse(req.file.buffer);
      req.extractedText = pdfData.text;

      if (!req.extractedText.trim()) {
        return res
          .status(400)
          .json(
            formatResponse(
              false,
              "Текстовое содержимое в PDF-файле не обнаружено",
              null
            )
          );
      }
    }

    next();
  } catch (error) {
    console.error("Ошибка обработки PDF-файла:", error);
    return res
      .status(500)
      .json(formatResponse(false, "Не удалось обработать PDF-файл", null));
  }
};

module.exports = processPdfFile;
