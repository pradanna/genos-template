"use client";
import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import GenosButton from "@/components/button/GenosButton";
import GenosPanel from "@/components/panel/GenosPanel";
import GenosTable from "@/components/table/GenosTable";
import GenosTextfield from "@/components/form/GenosTextfield";

export default function InventoryPage() {
  const TABLE_HEAD = [
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "role", label: "Role" },
  ];

  const TABLE_ROWS = [
    { name: "Agus", email: "agus@example.com", role: "Admin" },
    { name: "Budi", email: "budi@example.com", role: "User" },
    { name: "Citra", email: "citra@example.com", role: "User" },
    { name: "Dina", email: "dina@example.com", role: "Moderator" },
    { name: "Eka", email: "eka@example.com", role: "User" },
  ];

  const handleView = (row: any) => alert(`View: ${row.name}`);
  const handleEdit = (row: any) => alert(`Edit: ${row.name}`);
  const handleDelete = (row: any) => {
    if (confirm(`Yakin hapus ${row.name}?`)) {
      alert("Dihapus!");
    }
  };

  return (
    <div>
      <GenosPanel title="Button" subtitle="Genos Button">
        <div>
          <GenosButton color="success" size="lg" className="me-2">
            LG
          </GenosButton>

          <GenosButton color="warning" size="md" className="me-2">
            MD
          </GenosButton>

          <GenosButton color="danger" size="sm" className="me-2">
            SM
          </GenosButton>
        </div>
      </GenosPanel>

      <GenosPanel title="Table" subtitle="Genos Tabel" className="mt-3">
        <GenosTable
          TABLE_HEAD={TABLE_HEAD}
          TABLE_ROWS={TABLE_ROWS}
          CHECKBOXS
          SORT
          PAGINATION
          SEARCH
          ACTION_BUTTON={{
            view: handleView,
            edit: handleEdit,
            delete: handleDelete,
          }}
        />
      </GenosPanel>

      <GenosPanel className="mt-3" title="Textfield" subtitle="Genos Textfield">
        <GenosTextfield
          label="Search"
          is_icon_left={true}
          placeholder="Type something..."
          // value={search}
          // onChange={(e) => setSearch(e.target.value)}
        />
      </GenosPanel>
    </div>
  );
}
