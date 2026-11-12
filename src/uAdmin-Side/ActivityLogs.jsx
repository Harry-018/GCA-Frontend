import React, { useMemo, useState } from "react";

import ActivityLogsHeader from "../Components/AdminComponents/Activity Logs/ActivityLogsHeader";
import ActivityLogsToolbar from "../Components/AdminComponents/Activity Logs/ActivityLogsToolbar";
import DataTable from "../Components/DataTable.jsx";

import { getActivityLogs } from "../utils/data/Admin/activityLogs.js";

const ACTION_STYLES = {
  create: "bg-green-100 text-green-700",
  update: "bg-blue-100 text-blue-700",
  delete: "bg-red-100 text-red-700",
  login: "bg-yellow-100 text-yellow-700",
};

const ACTION_LABELS = {
  create: "Created",
  update: "Updated",
  delete: "Deleted",
  login: "Logged In",
};

const ActivityLogs = () => {
  const [logs] = useState(() => getActivityLogs());

  const [action, setAction] = useState("all");
  const [role, setRole] = useState("all");

  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const filteredLogs = useMemo(() => {
    const keyword = search.toLowerCase();

    return logs.filter((log) => {
      const matchesAction = action === "all" || log.action === action;
      const matchesRole = role === "all" || log.role === role;

      const matchesSearch =
        !keyword ||
        [log.user, log.role, log.action, log.module, log.description]
          .join(" ")
          .toLowerCase()
          .includes(keyword);

      return matchesAction && matchesRole && matchesSearch;
    });
  }, [logs, action, role, search]);

  const totalPages = Math.max(1, Math.ceil(filteredLogs.length / limit));

  const paginatedLogs = filteredLogs.slice(
    (page - 1) * limit,
    page * limit,
  );

  const handleActionChange = (newAction) => {
    setAction(newAction);
    setPage(1);
  };

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setPage(1);
  };

  const handleSearch = () => {
    setPage(1);
    setSearch(searchInput.trim());
  };

  const columns = [
    {
      id: "no",
      header: "NO.",
      cell: ({ row }) => (page - 1) * limit + row.index + 1,
    },

    {
      accessorKey: "timestamp",
      header: "DATE & TIME",
      cell: ({ getValue }) => {
        const value = getValue();

        if (!value) return "—";

        return new Date(value).toLocaleDateString("en-PH", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      },
    },

    {
      accessorKey: "user",
      header: "USER",
    },

    {
      accessorKey: "role",
      header: "ROLE",
      cell: ({ getValue }) => {
        const value = getValue();

        if (!value) return "—";

        return value.charAt(0).toUpperCase() + value.slice(1);
      },
    },

    {
      accessorKey: "action",
      header: "ACTION",
      cell: ({ getValue }) => {
        const value = getValue();

        if (!value) return "—";

        return (
          <span
            className={`rounded-full px-3 py-1 text-xs ${
              ACTION_STYLES[value] || "bg-gray-100 text-gray-700"
            }`}
          >
            {ACTION_LABELS[value] || value}
          </span>
        );
      },
    },

    {
      accessorKey: "module",
      header: "MODULE",
    },

    {
      accessorKey: "description",
      header: "DESCRIPTION",
      cell: ({ getValue }) => (
        <span className="block max-w-md whitespace-normal">
          {getValue() || "—"}
        </span>
      ),
    },
  ];

  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col gap-2 bg-linear-to-b from-[#f3f8f1] via-[#e8f1e3] to-[#d9e8d2] font-[Poppins] sm:gap-3">
      <ActivityLogsHeader
        activeTab={action}
        onTabChange={handleActionChange}
      />

      <div className="flex min-h-0 flex-1 flex-col gap-2">
        <ActivityLogsToolbar
          activeRole={role}
          onRoleChange={handleRoleChange}
          search={searchInput}
          onSearchChange={setSearchInput}
          onSearch={handleSearch}
          searchPlaceholder="Search Activity Logs"
        />

        <DataTable
          data={paginatedLogs}
          columns={columns}
          loading={false}
          emptyMessage="No activity logs found."
          getRowId={(row) => String(row.id)}
        />

        <div className="flex items-center justify-between px-2 py-2">
          <div className="text-xs text-gray-500">
            Page {page} of {totalPages} · {filteredLogs.length} log
            {filteredLogs.length === 1 ? "" : "s"}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((prev) => prev - 1)}
              disabled={page <= 1}
              className="rounded-md border border-parent-accent/25 px-3 py-1 text-xs disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            <button
              type="button"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page >= totalPages}
              className="rounded-md border border-parent-accent/25 px-3 py-1 text-xs disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityLogs;
