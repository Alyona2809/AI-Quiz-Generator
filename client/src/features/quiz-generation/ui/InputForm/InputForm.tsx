import React, { useState, useRef } from "react";
import { Button } from "../../../../shared/ui";
import { useQuizStore } from "../../../../entities/quiz";
import { quizApi } from "../../../../entities/quiz/api/quizApi";

export const InputForm: React.FC = () => {
  const [text, setText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { setIsLoading, setError, setQuizData, setCurrentState } =
    useQuizStore();

  const isFormValid = text.trim() || selectedFile;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setText("");
    } else {
      alert("Пожалуйста, выберите PDF файл");
      setSelectedFile(null);
    }
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    if (event.target.value.trim()) {
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!isFormValid) return;

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();

      if (text.trim()) {
        formData.append("text", text.trim());
      } else if (selectedFile) {
        formData.append("file", selectedFile);
      }

      const quizData = await quizApi.generateQuiz(formData);
      setQuizData(quizData);
      setCurrentState("quiz");
    } catch (error) {
      console.error("Ошибка при отправке запроса:", error);
      setError(
        error instanceof Error ? error.message : "Произошла неизвестная ошибка"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
      }}
    >
      <div className="card w-full" style={{ maxWidth: "32rem" }}>
        <div className="card-header text-center">
          <h1
            className="card-title"
            style={{ fontSize: "1.875rem", marginBottom: "0.5rem" }}
          >
            AI Quiz Generator
          </h1>
          <p className="card-subtitle">
            Введите текст или загрузите PDF файл для генерации квиза
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label htmlFor="text-input" className="form-label">
              Введите текст:
            </label>
            <textarea
              id="text-input"
              value={text}
              onChange={handleTextChange}
              placeholder="Вставьте сюда текст для создания квиза..."
              className="form-textarea"
              rows={6}
            />
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div
                className="w-full"
                style={{ borderTop: "1px solid #d1d5db" }}
              />
            </div>
            <div className="relative flex justify-center text-sm">
              <span
                className="px-2"
                style={{ backgroundColor: "white", color: "#6b7280" }}
              >
                или
              </span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="file-input" className="form-label">
              Загрузите PDF файл:
            </label>
            <div className="form-file">
              <div className="space-y-1 text-center">
                <input
                  ref={fileInputRef}
                  id="file-input"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <label htmlFor="file-input" style={{ cursor: "pointer" }}>
                  <div
                    className="mx-auto"
                    style={{ height: "3rem", width: "3rem", color: "#9ca3af" }}
                  >
                    <svg stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="text-sm" style={{ color: "#4b5563" }}>
                    <span className="font-medium" style={{ color: "#2563eb" }}>
                      Нажмите для загрузки
                    </span>
                    <span className="ml-1">или перетащите PDF файл</span>
                  </div>
                  <p className="text-xs" style={{ color: "#6b7280" }}>
                    PDF до 10MB
                  </p>
                </label>
                {selectedFile && (
                  <div className="mt-2 flex items-center justify-center space-x-2">
                    <span className="text-sm" style={{ color: "#4b5563" }}>
                      📄 {selectedFile.name}
                    </span>
                    <button
                      type="button"
                      onClick={handleFileRemove}
                      style={{ color: "#ef4444" }}
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={!isFormValid}
            className="w-full"
            style={{ width: "100%" }}
          >
            Сгенерировать квиз
          </Button>
        </form>
      </div>
    </div>
  );
};
