"use client";
import { useState } from "react";
import InventoryTable from "@/components/table/InventoryTable";

export default function InventoryPage() {
  const [search, setSearch] = useState("");

  return (
    <div>
      <InventoryTable />
    </div>
  );
}
