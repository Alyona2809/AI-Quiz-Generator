const OpenAI = require("openai");
const formatResponse = require("../utils/formatResponse");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateQuizWithOpenAI = async (req, res, next) => {
  try {
    const text = req.extractedText || req.body.text;
    console.log(
      "Text received:",
      text ? `${text.substring(0, 100)}...` : "No text"
    );

    if (!text) {
      return res
        .status(400)
        .json(
          formatResponse(false, "Текст для создания теста недоступен", null)
        );
    }

    const prompt = `Based on the following text, create a quiz with 3 multiple-choice questions. Return the result ONLY as a valid JSON array, without any other text or explanations. The JSON should follow this structure: [{"id": 1, "question": "...", "options": ["...", "...", "..."], "correctAnswer": 0}, ...]. The text is:"""
${text}
"""`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    const responseText = completion.choices[0].message.content;

    let quizData;
    try {
      quizData = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Ошибка анализа ответа OpenAI:", parseError);
      return res
        .status(500)
        .json(
          formatResponse(
            false,
            "Не удалось проанализировать данные теста из ответа ИИ",
            null
          )
        );
    }

    if (!Array.isArray(quizData) || quizData.length === 0) {
      return res
        .status(500)
        .json(
          formatResponse(false, "Получен неверный формат данных теста", null)
        );
    }

    req.quizData = quizData;
    next();
  } catch (error) {
    console.error("Ошибка создания теста с помощью OpenAI:", error);
    console.error("Error details:", {
      message: error.message,
      status: error.status,
      code: error.code,
      type: error.type,
    });
    return res
      .status(500)
      .json(formatResponse(false, "Не удалось создать тест", null));
  }
};

module.exports = generateQuizWithOpenAI;
