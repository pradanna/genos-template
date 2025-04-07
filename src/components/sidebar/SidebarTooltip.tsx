import React from "react";
import { Tooltip } from "@material-tailwind/react";

type SidebarTooltipProps = {
  isSidebarOpen: boolean;
  children: React.ReactNode;
  content: string;
};

export default function SidebarTooltip({
  isSidebarOpen,
  children,
  content,
}: SidebarTooltipProps) {
  return (
    <Tooltip
      placement="right"
      className={`rounded-r-full rounded-l-none bg-primary-light3 px-4 py-3 -ms-2 z-0 ${
        !isSidebarOpen ? "" : "hidden"
      }`}
      content={<span className="text-black font-bold">{content}</span>}
    >
      {children}
    </Tooltip>
  );
}
