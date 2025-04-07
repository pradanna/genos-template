// components/GenosTable.tsx
"use client";

import React, { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

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
  SEARCH?: boolean;
  ACTION_BUTTON?: ActionType;
};

export default function GenosTable({
  TABLE_HEAD,
  TABLE_ROWS,
  CHECKBOXS = false,
  SORT = false,
  PAGINATION = false,
  SEARCH = false,
  ACTION_BUTTON,
}: GenosTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const filteredRows = TABLE_ROWS.filter((row) =>
    Object.values(row).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedRows = sortKey
    ? [...filteredRows].sort((a, b) => {
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
    : filteredRows;

  const paginatedRows = PAGINATION
    ? sortedRows.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
      )
    : sortedRows;

  const totalPages = Math.ceil(sortedRows.length / rowsPerPage);

  return (
    <div className="w-full">
      {SEARCH && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border rounded w-full"
          />
        </div>
      )}
      <div className="overflow-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="border-b border-light2">
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
      {PAGINATION && totalPages > 1 && (
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded"
          >
            Prev
          </button>
          <span className="px-2 py-1">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
