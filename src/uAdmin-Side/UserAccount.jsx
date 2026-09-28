import React, { useEffect, useState } from "react";
import UserHeader from "../Components/AdminComponents/User-Account/UserHeader";
import UserToolbar from "../Components/AdminComponents/User-Account/UserToolbar";
import UserActionModal from "../Components/AdminModal/UserAccountPage/UserActionModal";

import {
  disableUserAccount,
  getUserAccounts,
  inviteUserAccount,
  reactivateUserAccount,
} from "../requests/userAccountsRequests.js";
import DataTable from "../Components/DataTable.jsx";

const ACTION_CONFIG = {
  invite: {
    title: "Invite Account",
    description:
      "Clicking “Invite” will send an invitation email so this user can set up their account.",
    confirmLabel: "Invite",
    danger: false,
  },
  resend: {
    title: "Resend Invitation",
    description:
      "Clicking “Resend” will send another invitation email to this user.",
    confirmLabel: "Resend",
    danger: false,
  },
  disable: {
    title: "Disable Account",
    description:
      "Clicking “Disable” will deactivate this account. The user will no longer be able to sign in until reactivated.",
    confirmLabel: "Disable",
    danger: true,
  },
  reactivate: {
    title: "Reactivate Account",
    description:
      "Clicking “Reactivate” will restore access for this account so the user can sign in again.",
    confirmLabel: "Reactivate",
    danger: false,
  },
};

const UserAccount = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Main account status tab
  const [status, setStatus] = useState("pending");

  // Role filter
  const [role, setRole] = useState("all");

  // Search
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  // Modal
  const [modalAction, setModalAction] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const loadUserAccounts = async () => {
    try {
      setLoading(true);

      const result = await getUserAccounts({
        status,
        role,
        search,
        page,
        limit,
      });

      setUsers(result.data);
      setPagination(result.pagination);
    } catch (error) {
      console.error("Failed to load user accounts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserAccounts();
  }, [status, role, search, page]);

  // -----------------------------
  // TAB / FILTER HANDLERS
  // -----------------------------

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setPage(1);
  };

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setPage(1);
  };

  // -----------------------------
  // SEARCH
  // -----------------------------

  const handleSearch = () => {
    setPage(1);
    setSearch(searchInput.trim());
  };

  // -----------------------------
  // MODAL
  // -----------------------------

  const openModal = (action, user) => {
    setModalAction(action);
    setSelectedUser(user);
  };

  const closeModal = () => {
    setModalAction(null);
    setSelectedUser(null);
  };

  // -----------------------------
  // ACCOUNT ACTION
  // -----------------------------

  const handleConfirm = async () => {
    if (!selectedUser || !modalAction) return;

    try {
      setLoading(true);

      if (modalAction === "invite" || modalAction === "resend") {
        await inviteUserAccount(selectedUser.user_id);
      }

      if (modalAction === "disable") {
        await disableUserAccount(selectedUser.user_id);
      }

      if (modalAction === "reactivate") {
        await reactivateUserAccount(selectedUser.user_id);
      }

      closeModal();

      await loadUserAccounts();
    } catch (error) {
      console.error(`Failed to ${modalAction} account:`, error);
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // UI
  // -----------------------------

  const searchPlaceholder =
    status === "pending"
      ? "Search Pending Account"
      : status === "active"
        ? "Search Active Account"
        : "Search Disabled Account";

  const modalConfig = modalAction ? ACTION_CONFIG[modalAction] : null;

  const columns = [
    {
      id: "no",
      header: "NO.",
      cell: ({ row }) => {
        return (page - 1) * limit + row.index + 1;
      },
    },

    {
      accessorKey: "email",
      header: "EMAIL",
    },

    {
      accessorKey: "role",
      header: "ROLE",
      cell: ({ getValue }) => {
        const role = getValue();

        if (!role) return "—";

        return role.charAt(0).toUpperCase() + role.slice(1);
      },
    },

    {
      accessorKey: "created_at",
      header: "ACTIVATION DATE",
      cell: ({ getValue }) => {
        const value = getValue();

        if (!value) return "—";

        return new Date(value).toLocaleDateString();
      },
    },

    {
      accessorKey: "account_status",
      header: "STATUS",
      cell: ({ getValue }) => {
        const status = getValue();

        if (!status) return "—";

        const formatted = status.charAt(0).toUpperCase() + status.slice(1);

        return (
          <span className="rounded-full px-3 py-1 text-xs">{formatted}</span>
        );
      },
    },

    {
      id: "action",
      header: "ACTION",
      cell: ({ row }) => {
        const user = row.original;

        if (status === "pending") {
          return (
            <button
              type="button"
              onClick={() => openModal("invite", user)}
              className="rounded-full text-egg px-3 py-1.5 bg-swamp-green text-[12px] font-[Poppins] "
            >
              Invite
            </button>
          );
        }

        if (status === "active") {
          return (
            <button
              type="button"
              onClick={() => openModal("disable", user)}
              className="rounded-full text-egg px-3 py-1.5 bg-reject text-[12px] font-[Poppins] "
            >
              Disable
            </button>
          );
        }

        if (status === "disabled") {
          return (
            <button
              type="button"
              onClick={() => openModal("reactivate", user)}
              className="rounded-full text-swamp-green px-3 py-1.5 bg-gray-200 text-[12px] font-[Poppins] "
            >
              Reactivate
            </button>
          );
        }

        return null;
      },
    },
  ];

  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col gap-2 bg-[#ebe9e4] font-[Poppins] sm:gap-3">
      <UserHeader activeTab={status} onTabChange={handleStatusChange} />

      <div className="flex min-h-0 flex-1 flex-col gap-2">
        <UserToolbar
          activeTab={role}
          onTabChange={handleRoleChange}
          search={searchInput}
          onSearchChange={setSearchInput}
          onSearch={handleSearch}
          searchPlaceholder={searchPlaceholder}
        />

        <DataTable
          data={users}
          columns={columns}
          loading={loading}
          emptyMessage={`No ${status} accounts found.`}
          getRowId={(row) => String(row.user_id)}
        />
        <div className="flex items-center justify-between px-2 py-2">
          <div className="text-xs text-gray-500">
            Page {pagination.page} of {pagination.totalPages}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((prev) => prev - 1)}
              disabled={page <= 1 || loading}
              className="rounded-md border border-gray-300 px-3 py-1 text-xs disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            <button
              type="button"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page >= pagination.totalPages || loading}
              className="rounded-md border border-gray-300 px-3 py-1 text-xs disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <UserActionModal
        isOpen={Boolean(modalConfig && selectedUser)}
        onClose={closeModal}
        onConfirm={handleConfirm}
        title={modalConfig?.title}
        description={modalConfig?.description}
        email={selectedUser?.email}
        confirmLabel={modalConfig?.confirmLabel}
        danger={modalConfig?.danger}
      />
    </div>
  );
};

export default UserAccount;
