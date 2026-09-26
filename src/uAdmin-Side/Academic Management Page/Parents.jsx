import React, { useEffect, useState } from "react";

import Header from "../../Components/AdminComponents/Academic Management/Header";
import ParentsToolbar from "../../Components/AdminComponents/Academic Management/Parents/ParentsToolbar";
import DataTable from "../../Components/DataTable";

import { getParents } from "../../requests/officialStudentRequests";

const NAV_ITEMS = [
  { name: "Students", path: "/admin/academic" },
  { name: "Teachers", path: "/admin/academic/teachers" },
  { name: "Parents", path: "/admin/academic/parents" },
  { name: "Section", path: "/admin/academic/section" },
  { name: "Schedules", path: "/admin/academic/schedules" },
  { name: "Grade Levels", path: "/admin/academic/grade-levels" },
  { name: "School Years", path: "/admin/academic/school-years" },
];

const Parents = () => {
  const [parents, setParents] = useState([]);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [loading, setLoading] = useState(false);

  const fetchParents = async () => {
    try {
      setLoading(true);

      const result = await getParents({
        search: searchQuery,
        page: pagination.page,
        limit: pagination.limit,
      });

      setParents(result.data);

      setPagination((prev) => ({
        ...prev,
        ...result.pagination,
      }));
    } catch (error) {
      console.error("Error getting parents:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParents();
  }, [pagination.page, searchQuery]);

  const handleSearchChange = (value) => {
    setSearch(value);
  };

  const handleSearch = () => {
    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));

    setSearchQuery(search);
  };

  const columns = [
    {
      header: "NO.",
      cell: ({ row }) =>
        (pagination.page - 1) * pagination.limit + row.index + 1,
    },
    {
      header: "LAST NAME",
      accessorKey: "last_name",
    },
    {
      header: "FIRST NAME",
      accessorKey: "first_name",
    },
    {
      header: "EMAIL",
      accessorKey: "email",
    },
    {
      header: "CHILDREN",
      accessorKey: "children",
    },
  ];

  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col gap-2 bg-[#ebe9e4] font-[Poppins]">
      <Header navItems={NAV_ITEMS} />

      <div className="flex min-h-0 flex-1 flex-col text-[14px] gap-2">
        <ParentsToolbar
          searchValue={search}
          onSearchChange={handleSearchChange}
          onSearch={handleSearch}
        />

        <DataTable
          data={parents}
          columns={columns}
          loading={loading}
          emptyMessage="No parents found."
        />

        <div className="flex items-center justify-between px-2 py-3">
          <span className="text-xs text-gray-500">
            Page {pagination.page} of {pagination.totalPages || 0}
          </span>

          <div className="flex gap-2">
            <button
              type="button"
              disabled={pagination.page === 1 || loading}
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  page: prev.page - 1,
                }))
              }
              className="rounded-full border border-gray-300 px-4 py-1.5 text-xs text-gray-600 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            <button
              type="button"
              disabled={
                loading ||
                pagination.totalPages === 0 ||
                pagination.page >= pagination.totalPages
              }
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  page: prev.page + 1,
                }))
              }
              className="rounded-full bg-swamp-green px-4 py-1.5 text-xs text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parents;
