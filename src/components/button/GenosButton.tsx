"use client";
import React from "react";
import clsx from "clsx";

type ButtonProps = {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "danger" | "success" | "warning";
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

const sizeClasses = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

const colorClasses = {
  primary: "bg-primary-color text-white hover:bg-primary-dark",
  secondary: "bg-secondary-color text-gray-800 hover:bg-secondary-dark",
  danger: "bg-danger-base text-white hover:bg-danger-dark",
  success: "bg-success-base text-white hover:bg-success-dark",
  warning: "bg-warning-base text-white hover:bg-warning-dark",
};

export default function GenosButton({
  size = "md",
  color = "primary",
  className = "",
  children,
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "rounded-full font-medium transition-all duration-200 focus:outline-none disabled:opacity-50",
        sizeClasses[size],
        colorClasses[color],
        disabled ? "cursor-default" : "cursor-pointer",
        className
      )}
    >
      {children}
    </button>
  );
}
