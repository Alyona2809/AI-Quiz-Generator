import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "success";
  size?: "small" | "medium" | "large";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  className = "",
  children,
  ...props
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case "primary":
        return "btn-primary";
      case "secondary":
        return "btn-secondary";
      case "danger":
        return "btn-danger";
      case "success":
        return "btn-success";
      default:
        return "btn-primary";
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case "small":
        return "btn-sm";
      case "medium":
        return "btn-md";
      case "large":
        return "btn-lg";
      default:
        return "btn-md";
    }
  };

  return (
    <button
      className={`btn ${getVariantClass()} ${getSizeClass()} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
