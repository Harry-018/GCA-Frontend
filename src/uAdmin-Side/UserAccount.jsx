import React, { useMemo, useState } from "react";
import UserHeader from "../Components/AdminComponents/User-Account/UserHeader";
import UserToolbar from "../Components/AdminComponents/User-Account/UserToolbar";
import UserActionModal from "../Components/AdminModal/UserAccountPage/UserActionModal";

const INITIAL_USERS = [
  {
    id: 1,
    email: "carlos@gmail.com",
    role: "Parent",
    dateCreated: "Jul 27, 2025",
    status: "Invited",
    accountState: "Pending",
  },
  {
    id: 2,
    email: "kathryn@gmail.com",
    role: "Parent",
    dateCreated: "Jul 28, 2025",
    status: "Invited",
    accountState: "Pending",
  },
  {
    id: 3,
    email: "hendry@gmail.com",
    role: "Teacher",
    dateCreated: "Jul 29, 2025",
    status: "Invited",
    accountState: "Pending",
  },
  {
    id: 4,
    email: "michelle@gmail.com",
    role: "Teacher",
    dateCreated: "Jul 30, 2025",
    status: "Invited",
    accountState: "Pending",
  },
  {
    id: 5,
    email: "Rexter@gmail.com",
    role: "Parent",
    dateCreated: "Jul 31, 2025",
    status: "Invited",
    accountState: "Pending",
  },
  {
    id: 6,
    email: "jake@gmail.com",
    role: "Teacher",
    dateCreated: "Aug 01, 2025",
    status: "Invited",
    accountState: "Pending",
  },
  {
    id: 7,
    email: "daniel@gmail.com",
    role: "Parent",
    dateCreated: "Aug 02, 2025",
    status: "Pending",
    accountState: "Pending",
  },
  {
    id: 8,
    email: "diane@gmail.com",
    role: "Teacher",
    dateCreated: "Aug 03, 2025",
    status: "Pending",
    accountState: "Pending",
  },
  {
    id: 9,
    email: "rosaline@gmail.com",
    role: "Teacher",
    dateCreated: "Aug 04, 2025",
    status: "Pending",
    accountState: "Pending",
  },
  {
    id: 10,
    email: "james@gmail.com",
    role: "Parent",
    dateCreated: "Aug 05, 2025",
    status: "Pending",
    accountState: "Pending",
  },
  {
    id: 11,
    email: "maria.santos@gmail.com",
    role: "Parent",
    dateCreated: "Jun 12, 2025",
    status: "Active",
    accountState: "Active",
  },
  {
    id: 12,
    email: "juan.delacruz@gmail.com",
    role: "Teacher",
    dateCreated: "Jun 15, 2025",
    status: "Active",
    accountState: "Active",
  },
  {
    id: 13,
    email: "ana.reyes@gmail.com",
    role: "Parent",
    dateCreated: "May 20, 2025",
    status: "Active",
    accountState: "Active",
  },
  {
    id: 14,
    email: "paolo.cruz@gmail.com",
    role: "Teacher",
    dateCreated: "May 08, 2025",
    status: "Active",
    accountState: "Active",
  },
  {
    id: 15,
    email: "sofia.lim@gmail.com",
    role: "Parent",
    dateCreated: "Apr 02, 2025",
    status: "Disabled",
    accountState: "Disabled",
  },
  {
    id: 16,
    email: "mark.tan@gmail.com",
    role: "Teacher",
    dateCreated: "Mar 18, 2025",
    status: "Disabled",
    accountState: "Disabled",
  },
];

const ACCOUNT_TAB_MAP = {
  "Pending Accounts": "Pending",
  "Active Accounts": "Active",
  "Disabled Accounts": "Disabled",
};

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
  const [users, setUsers] = useState(INITIAL_USERS);
  const [accountTab, setAccountTab] = useState("Pending Accounts");
  const [roleTab, setRoleTab] = useState("All");
  const [search, setSearch] = useState("");
  const [modalAction, setModalAction] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = useMemo(() => {
    const accountState = ACCOUNT_TAB_MAP[accountTab];
    const term = search.trim().toLowerCase();

    return users.filter((user) => {
      const matchesAccount = user.accountState === accountState;
      const matchesRole = roleTab === "All" || user.role === roleTab;
      const matchesSearch =
        term === "" ||
        user.email.toLowerCase().includes(term) ||
        user.role.toLowerCase().includes(term) ||
        user.status.toLowerCase().includes(term) ||
        user.dateCreated.toLowerCase().includes(term);

      return matchesAccount && matchesRole && matchesSearch;
    });
  }, [users, accountTab, roleTab, search]);

  const openModal = (action, user) => {
    setModalAction(action);
    setSelectedUser(user);
  };

  const closeModal = () => {
    setModalAction(null);
    setSelectedUser(null);
  };

  const handleConfirm = () => {
    if (!selectedUser || !modalAction) return;

    setUsers((prev) =>
      prev.map((user) => {
        if (user.id !== selectedUser.id) return user;

        if (modalAction === "invite" || modalAction === "resend") {
          return { ...user, status: "Invited", accountState: "Pending" };
        }

        if (modalAction === "disable") {
          return { ...user, status: "Disabled", accountState: "Disabled" };
        }

        if (modalAction === "reactivate") {
          return { ...user, status: "Active", accountState: "Active" };
        }

        return user;
      }),
    );

    closeModal();
  };

  const handleSearch = () => {
    // Search already filters live via `search` state
  };

  const searchPlaceholder =
    accountTab === "Pending Accounts"
      ? "Search Pending Account"
      : accountTab === "Active Accounts"
        ? "Search Active Account"
        : "Search Disabled Account";

  const modalConfig = modalAction ? ACTION_CONFIG[modalAction] : null;

  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col gap-2 bg-[#ebe9e4] font-[Poppins] sm:gap-3">
      <UserHeader activeTab={accountTab} onTabChange={setAccountTab} />

      <div className="flex min-h-0 flex-1 flex-col gap-2">
        <UserToolbar
          activeTab={roleTab}
          onTabChange={setRoleTab}
          search={search}
          onSearchChange={setSearch}
          onSearch={handleSearch}
          searchPlaceholder={searchPlaceholder}
        />

        {/* <UserTable
          users={filteredUsers}
          onInvite={(user) => openModal("invite", user)}
          onResend={(user) => openModal("resend", user)}
          onDisable={(user) => openModal("disable", user)}
          onReactivate={(user) => openModal("reactivate", user)}
        /> */}
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
