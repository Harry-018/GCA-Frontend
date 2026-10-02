import React from "react";

const NotificationTable = ({ notifications = [] }) => {
  const columns = [
    "NO.",
    "REMINDER",
    "SENT BY",
    "SENT TO",
    "SENT AT",
    "STATUS",
  ];

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-bone shadow-sm">
        <div className="flex min-h-0 flex-1 flex-col overflow-x-auto overflow-y-auto thin-scrollbar">
          <table className="w-full min-w-176 border-collapse">
            <thead className="sticky top-0">
              <tr className="bg-bone">
                {columns.map((column) => (
                  <th
                    key={column}
                    className="px-3 py-3 text-left text-[11px] font-[PoppinsBold] text-swamp-green sm:px-6 sm:py-5 sm:text-xs lg:text-sm xl:text-base"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {notifications.map((notification, index) => (
                <tr
                  key={notification.id ?? index}
                  className="text-2xs text-gray-600 sm:text-[11px] lg:text-xs xl:text-sm"
                >
                  <td className="px-3 py-2 sm:px-6 sm:py-2.5">
                    {index + 1}
                  </td>

                  <td className="px-3 py-2 sm:px-6 sm:py-2.5">
                    {notification.reminder}
                  </td>

                  <td className="px-3 py-2 sm:px-6 sm:py-2.5">
                    {notification.sentBy}
                  </td>

                  <td className="px-3 py-2 sm:px-6 sm:py-2.5">
                    {notification.sentTo}
                  </td>

                  <td className="px-3 py-2 sm:px-6 sm:py-2.5">
                    {notification.sentAt}
                  </td>

                  <td className="px-3 py-2 sm:px-6 sm:py-2.5">
                    {notification.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {notifications.length === 0 && (
            <div className="flex flex-1 flex-col items-center justify-center gap-2 py-10">
              <p className="text-sm text-gray-500">
                No notification records found.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationTable;
