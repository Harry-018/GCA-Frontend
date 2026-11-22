import React, { useEffect, useMemo, useState } from "react";

import ActivityLogsHeader from "../Components/AdminComponents/Activity Logs/ActivityLogsHeader";
import ActivityLogsToolbar from "../Components/AdminComponents/Activity Logs/ActivityLogsToolbar";
import DataTable from "../Components/DataTable.jsx";

import { getAdminActivityLogs } from "../requests/activityLogsRequests.js";

const ACTION_STYLES = {
  Created: "bg-green-100 text-green-700",
  Updated: "bg-blue-100 text-blue-700",
  Deleted: "bg-red-100 text-red-700",
  Rejected: "bg-red-100 text-red-700",
  "Logged In": "bg-yellow-100 text-yellow-700",
};

const ACTION_LABELS = {
  Created: "Created",
  Updated: "Updated",
  Deleted: "Deleted",
  Rejected: "Rejected",
  "Logged In": "Logged In",
};

const ActivityLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [action, setAction] = useState("all");

  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  useEffect(() => {
    let cancelled = false;

    const loadActivityLogs = async () => {
      try {
        setLoading(true);
        setLoadError("");

        const firstPage = await getAdminActivityLogs({ page: 1, limit: 100 });
        const totalPages = firstPage?.pagination?.totalPages ?? 1;

        const remainingPages = await Promise.all(
          Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) =>
            getAdminActivityLogs({ page: index + 2, limit: 100 }),
          ),
        );

        if (cancelled) return;

        const rows = [firstPage, ...remainingPages].flatMap(
          (response) => response?.data ?? [],
        );

        setLogs(
          rows
            .filter((log) => log.role === "admin")
            .map((log) => ({
              id: log.log_id,
              timestamp: log.timestamp,
              user:
                [log.first_name, log.last_name].filter(Boolean).join(" ") ||
                "—",
              role: log.role,
              action: log.action,
              module: log.module,
              description: log.description,
            })),
        );
      } catch (error) {
        console.error("Failed to load activity logs:", error);

        if (!cancelled) {
          setLogs([]);
          setLoadError(
            error.response?.data?.message || "Failed to load activity logs.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadActivityLogs();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredLogs = useMemo(() => {
    const keyword = search.toLowerCase();

    return logs.filter((log) => {
      const matchesAction = action === "all" || log.action === action;

      const matchesSearch =
        !keyword ||
        [log.user, log.role, log.action, log.module, log.description]
          .join(" ")
          .toLowerCase()
          .includes(keyword);

      return matchesAction && matchesSearch;
    });
  }, [logs, action, search]);

  const totalPages = Math.max(1, Math.ceil(filteredLogs.length / limit));

  const paginatedLogs = filteredLogs.slice((page - 1) * limit, page * limit);

  const handleActionChange = (newAction) => {
    setAction(newAction);
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
        <span className="block whitespace-nowrap">
          {getValue() || "—"}
        </span>
      ),
    },
  ];

  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col gap-2 bg-egg font-[Poppins] sm:gap-3">
      <ActivityLogsHeader activeTab={action} onTabChange={handleActionChange} />

      <div className="flex min-h-0 flex-1 flex-col gap-2">
        <ActivityLogsToolbar
          search={searchInput}
          onSearchChange={setSearchInput}
          onSearch={handleSearch}
          searchPlaceholder="Search Activity Logs"
        />

        <DataTable
          data={paginatedLogs}
          columns={columns}
          loading={loading}
          emptyMessage={loadError || "No activity logs found."}
          getRowId={(row) => String(row.id)}
        />

        <div className="flex flex-wrap items-center justify-between gap-2 px-2 py-2">
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
