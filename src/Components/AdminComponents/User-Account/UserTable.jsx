const HEADER_CLASS =
  "whitespace-nowrap px-3 py-3 text-[11px] font-[PoppinsBold] text-swamp-green sm:px-6 sm:py-5 sm:text-xs lg:text-sm xl:text-base";

const CELL_CLASS = "whitespace-nowrap px-3 py-2 sm:px-6 sm:py-2.5";

const ACTION_BTN =
  "rounded-xl px-3 py-1 text-[11px] transition sm:px-3.5 lg:text-xs xl:text-sm";

const UserTable = ({
  users = [],
  onInvite,
  onResend,
  onDisable,
  onReactivate,
}) => {
  const renderAction = (user) => {
    if (user.status === "Invited") {
      return (
        <button
          type="button"
          onClick={() => onResend?.(user)}
          className={`${ACTION_BTN} border border-gray-400 text-swamp-green hover:bg-swamp-lite`}
        >
          Resend
        </button>
      );
    }

    if (user.accountState === "Pending" || user.status === "Pending") {
      return (
        <button
          type="button"
          onClick={() => onInvite?.(user)}
          className={`${ACTION_BTN} bg-swamp-green text-white hover:bg-lime-green`}
        >
          Invite
        </button>
      );
    }

    if (user.accountState === "Disabled") {
      return (
        <button
          type="button"
          onClick={() => onReactivate?.(user)}
          className={`${ACTION_BTN} border border-gray-400 text-gray-600 hover:bg-gray-100`}
        >
          Reactivate
        </button>
      );
    }

    return (
      <button
        type="button"
        onClick={() => onDisable?.(user)}
        className={`${ACTION_BTN} bg-reject text-white hover:bg-red-500`}
      >
        Disable
      </button>
    );
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-bone shadow-sm">
        <div className="flex min-h-0 flex-1 flex-col overflow-x-auto overflow-y-auto thin-scrollbar">
          <table className="w-full min-w-208 border-separate border-spacing-0">
            <thead className="sticky top-0 z-10">
              <tr className="bg-bone text-left">
                <th className={HEADER_CLASS}>NO.</th>
                <th className={HEADER_CLASS}>EMAIL</th>
                <th className={HEADER_CLASS}>ROLE</th>
                <th className={HEADER_CLASS}>DATE CREATED</th>
                <th className={HEADER_CLASS}>STATUS</th>
                <th className={HEADER_CLASS}>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-3 py-10 text-center text-sm text-gray-500 sm:px-6"
                  >
                    No accounts found.
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr
                    key={user.id ?? user.email}
                    className="border-b border-gray-200 font-[Poppins] text-[11px] text-gray-600 last:border-b-0 lg:text-xs xl:text-sm"
                  >
                    <td className={CELL_CLASS}>{index + 1}</td>
                    <td className={CELL_CLASS}>{user.email}</td>
                    <td className={CELL_CLASS}>{user.role}</td>
                    <td className={CELL_CLASS}>{user.dateCreated}</td>
                    <td className={CELL_CLASS}>{user.status}</td>
                    <td className={CELL_CLASS}>{renderAction(user)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
