"use client";
import React from "react";
import clsx from "clsx";

type ButtonProps = {
  size?: "sm" | "md" | "lg";
  round?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  color?: "primary" | "secondary" | "danger" | "success" | "warning";
  className?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  label: string;
};

const sizeClasses = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-1 text-base",
  lg: "px-5 py-1 text-lg",
};

const roundedClasses = {
  none: "",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
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
  round = "none",
  className = "",
  label,
  iconLeft,
  iconRight,
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
        "font-medium transition-all duration-200 focus:outline-none disabled:opacity-50 inline-flex items-center gap-2",
        sizeClasses[size],
        colorClasses[color],
        roundedClasses[round],
        disabled ? "cursor-default" : "cursor-pointer",
        className
      )}
    >
      {iconLeft && <span className="flex items-center">{iconLeft}</span>}
      <span>{label}</span>
      {iconRight && <span className="flex items-center">{iconRight}</span>}
    </button>
  );
}
