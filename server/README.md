# AI Quiz Generator - Backend

Backend сервер для генерации квизов с помощью OpenAI API.

## Установка зависимостей

```bash
npm install
```

## Настройка окружения

Создайте файл `.env` в корне папки `server/` со следующим содержимым:

```
OPENAI_API_KEY=your_openai_api_key_here
PORT=3001
```

## Запуск сервера

### Режим разработки

```bash
npm run dev
```

### Продакшн режим

```bash
npm start
```

## API Endpoints

### POST /api/quiz/generate-quiz

Генерирует квиз на основе текста или PDF файла.

**Параметры запроса:**

- `text` (string, optional) - текст для генерации квиза
- `file` (file, optional) - PDF файл для генерации квиза

**Пример запроса с текстом:**

```javascript
const formData = new FormData();
formData.append("text", "Ваш текст здесь...");

fetch("/api/quiz/generate-quiz", {
  method: "POST",
  body: formData,
});
```

**Пример запроса с файлом:**

```javascript
const formData = new FormData();
formData.append("file", pdfFile);

fetch("/api/quiz/generate-quiz", {
  method: "POST",
  body: formData,
});
```

**Ответ:**

```json
{
  "success": true,
  "message": "Quiz generated successfully",
  "data": {
    "quiz": [
      {
        "id": 1,
        "question": "Вопрос 1?",
        "options": ["Вариант 1", "Вариант 2", "Вариант 3"],
        "correctAnswer": 0
      }
    ]
  }
}
```

### GET /api/health

Проверка состояния сервера.

**Ответ:**

```json
{
  "status": "OK",
  "message": "AI Quiz Generator API is running"
}
```

## Структура проекта

```
server/
├── src/
│   ├── controllers/
│   │   └── quizController.js    # Контроллер для генерации квизов
│   ├── routes/
│   │   ├── apiRouter.js         # Основной API роутер
│   │   └── quizRouter.js        # Роуты для квизов
│   ├── configs/
│   │   └── serverConfig.js      # Конфигурация сервера
│   └── utils/
│       └── formatResponse.js    # Утилита для форматирования ответов
├── package.json
└── .env                         # Переменные окружения (создать вручную)
```

При доступном OpenAI API - будет генерировать реальные квизы
При недоступном OpenAI API - вернет ошибку 500 с понятным сообщением
Все middleware работают правильно в цепочке
Обработка ошибок функционирует корректно
