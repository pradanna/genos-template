import { useEffect, useState } from "react";
import axios from "axios";
import GenosTable from "./GenosTable";
import GenosPagination from "../pagination/GenosPagination";

const UserTable = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Fungsi untuk mengambil data user
  const fetchUsers = async () => {
    // Ambil semua data user (misalnya 100 data)
    const response = await axios.get(`https://dummyjson.com/users?limit=100`);
    const allUsers = response.data.users;

    // Apply sorting (untuk semua field termasuk 'name')
    if (sortKey) {
      allUsers.sort((a, b) => {
        let aVal: string | number = "";
        let bVal: string | number = "";

        if (sortKey === "name") {
          aVal = `${a.firstName} ${a.lastName}`;
          bVal = `${b.firstName} ${b.lastName}`;
        } else {
          aVal = a[sortKey];
          bVal = b[sortKey];
        }

        // Sorting string
        if (typeof aVal === "string" && typeof bVal === "string") {
          return sortOrder === "asc"
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        }

        // Sorting number
        if (typeof aVal === "number" && typeof bVal === "number") {
          return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
        }

        return 0;
      });
    }

    // Set total users
    setTotalUsers(allUsers.length);

    // Paginate manually
    const start = (currentPage - 1) * limit;
    const paginatedUsers = allUsers.slice(start, start + limit);
    setUsers(paginatedUsers);
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, sortKey, sortOrder]);

  const TABLE_HEAD = [
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "gender", label: "Gender", sortable: true },
    { key: "age", label: "Age", sortable: true },
  ];

  const TABLE_ROWS = users.map((user: any) => ({
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    gender: user.gender,
    age: user.age,
  }));

  return (
    <div>
      <GenosTable
        TABLE_HEAD={TABLE_HEAD}
        TABLE_ROWS={TABLE_ROWS}
        SORT
        CHECKBOXS={false}
        PAGINATION
        totalRows={totalUsers}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
        rowsPerPage={limit}
        onSortChange={(key, order) => {
          setSortKey(key);
          setSortOrder(order);
        }}
      />
    </div>
  );
};

export default UserTable;
