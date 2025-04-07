import React from "react";
import clsx from "clsx";

type PaddingSize = "p-sm" | "p-md" | "p-lg";

type PanelProps = {
  title?: string;
  subtitle?: string;
  padding?: PaddingSize;
  children: React.ReactNode;
  className?: string;
};

const paddingMap: Record<PaddingSize, string> = {
  "p-sm": "p-3",
  "p-md": "p-5",
  "p-lg": "p-8",
};

export default function GenosPanel({
  title,
  subtitle,
  padding = "p-md",
  children,
  className = "",
}: PanelProps) {
  const showHeader = title || subtitle;

  return (
    <div
      className={clsx(
        "bg-white rounded-lg shadow-sm  overflow-hidden ",
        className
      )}
    >
      {showHeader && (
        <div className="px-5 pt-4 pb-2">
          {title && <h2 className="text-lg font-semibold">{title}</h2>}
          {subtitle && (
            <p className="text-sm text-gray-500  font-light">{subtitle}</p>
          )}
          <hr className="mt-3 border-t border-gray-100" />
        </div>
      )}

      <div className={clsx(paddingMap[padding])}>{children}</div>
    </div>
  );
}
