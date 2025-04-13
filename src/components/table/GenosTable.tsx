// components/GenosTable.tsx
"use client";

import React, { useState } from "react";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  MagnifyingGlassCircleIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import GenosTextfield from "../form/GenosTextfield";
import GenosPagination from "../pagination/GenosPagination";

type TableHead = {
  key: string;
  label: string;
  sortable?: boolean;
};

type ActionType = {
  view?: (row: any) => void;
  edit?: (row: any) => void;
  delete?: (row: any) => void;
};

type GenosTableProps = {
  TABLE_HEAD: TableHead[];
  TABLE_ROWS: any[];
  CHECKBOXS?: boolean;
  SORT?: boolean;
  PAGINATION?: boolean;
  FILTER?: React.ReactNode;
  ACTION_BUTTON?: ActionType;
  fontSize?: "xs" | "sm" | "md" | "lg" | "xl";
  currentPage?: number;
  onPageChange?: (page: number) => void;
  onSortChange?: (key: string, order: "asc" | "desc") => void;
  totalRows?: number;
  rowsPerPage?: number;
};

const fontSizeMap = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-md",
  lg: "text-lg",
  xl: "text-xl",
};

export default function GenosTable({
  TABLE_HEAD,
  TABLE_ROWS,
  CHECKBOXS = false,
  rowsPerPage = 10,
  onPageChange,
  SORT = false,
  PAGINATION = false,
  currentPage,
  totalRows,
  onSortChange,
  FILTER,
  fontSize = "sm",
  ACTION_BUTTON,
}: GenosTableProps) {
  const [stateCurrentPage, setStateCurrentPage] = useState<number>(1);

  const internalCurrentPage = onPageChange
    ? currentPage || 1
    : stateCurrentPage;
  const internalRowsPerPage = rowsPerPage || 10;

  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (key: string) => {
    let newOrder: "asc" | "desc" = "asc";
    if (sortKey === key) {
      newOrder = sortOrder === "asc" ? "desc" : "asc";
    }
    setSortKey(key);
    setSortOrder(newOrder);

    if (onSortChange) {
      onSortChange(key, newOrder);
    }
  };

  const handlePageChange = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    } else {
      setStateCurrentPage(page);
    }
  };

  const sortedRows = sortKey
    ? [...TABLE_ROWS].sort((a, b) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];
        return sortOrder === "asc"
          ? aVal > bVal
            ? 1
            : -1
          : aVal < bVal
          ? 1
          : -1;
      })
    : TABLE_ROWS;

  const paginatedRows =
    PAGINATION && !onPageChange // frontend pagination
      ? sortedRows.slice(
          (internalCurrentPage - 1) * internalRowsPerPage,
          internalCurrentPage * internalRowsPerPage
        )
      : sortedRows; // backend pagination, tidak slice lagi

  const totalPages = Math.ceil(
    (totalRows || sortedRows.length) / internalRowsPerPage
  );

  console.log("totalRows:", totalRows);
  console.log("sortedRows.length:", sortedRows.length);
  console.log("totalPages:", totalPages);

  return (
    <div className="w-full">
      {FILTER && <div className="mb-4">{FILTER}</div>}
      <div className="overflow-auto">
        <table
          className={clsx(
            "w-full table-auto border-collapse",
            fontSizeMap[fontSize]
          )}
        >
          <thead>
            <tr className={clsx("border-b border-light2")}>
              {CHECKBOXS && <th className="p-3"></th>}
              {TABLE_HEAD.map((head) => (
                <th
                  key={head.key}
                  className={clsx(
                    "p-3 text-left font-semibold",

                    head.sortable && "cursor-pointer"
                  )}
                  onClick={() => SORT && head.sortable && handleSort(head.key)}
                >
                  <div className="flex items-center gap-1">
                    {head.label}
                    {SORT && head.sortable && sortKey === head.key && (
                      <>
                        {sortOrder === "asc" ? (
                          <ChevronUpIcon className="w-4 h-4" />
                        ) : (
                          <ChevronDownIcon className="w-4 h-4" />
                        )}
                      </>
                    )}
                  </div>
                </th>
              ))}
              {ACTION_BUTTON && <th className="p-3">Action</th>}
            </tr>
          </thead>
          <tbody>
            {paginatedRows.map((row, index) => (
              <tr
                key={index}
                className={`border-t border-light1 ${
                  index % 2 === 0 ? "bg-white" : "bg-light1"
                } hover:bg-light2`}
              >
                {CHECKBOXS && (
                  <td className="p-3">
                    <input type="checkbox" />
                  </td>
                )}
                {TABLE_HEAD.map((head) => (
                  <td key={head.key} className="p-3">
                    {row[head.key]}
                  </td>
                ))}
                {ACTION_BUTTON && (
                  <td className="p-3 flex gap-2">
                    {ACTION_BUTTON.view && (
                      <button
                        onClick={() => ACTION_BUTTON.view?.(row)}
                        className="text-blue-600"
                      >
                        View
                      </button>
                    )}
                    {ACTION_BUTTON.edit && (
                      <button
                        onClick={() => ACTION_BUTTON.edit?.(row)}
                        className="text-yellow-600"
                      >
                        Edit
                      </button>
                    )}
                    {ACTION_BUTTON.delete && (
                      <button
                        onClick={() => ACTION_BUTTON.delete?.(row)}
                        className="text-red-600"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {PAGINATION && (
        <GenosPagination
          delta={2}
          showFirstLast
          currentPage={internalCurrentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* Info jika kosong */}
      {TABLE_ROWS.length === 0 && (
        <div className="text-center text-gray-500 py-4">No data found.</div>
      )}
    </div>
  );
}
