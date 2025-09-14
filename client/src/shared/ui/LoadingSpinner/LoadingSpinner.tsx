import React from "react";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "medium",
  text = "Загрузка...",
}) => {
  const getSizeClass = () => {
    switch (size) {
      case "small":
        return "spinner-sm";
      case "medium":
        return "spinner-md";
      case "large":
        return "spinner-lg";
      default:
        return "spinner-md";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`spinner ${getSizeClass()}`} />
      {text && <p className="mt-4 text-white text-lg font-medium">{text}</p>}
    </div>
  );
};
