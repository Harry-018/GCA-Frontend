const ActivityLogsHeader = ({ activeTab, onTabChange }) => {
  const tabs = [
    { label: "All Logs", value: "all" },
    { label: "Created", value: "create" },
    { label: "Updated", value: "update" },
    { label: "Deleted", value: "delete" },
    { label: "Logins", value: "login" },
  ];

  return (
    <header className="flex w-full flex-nowrap items-center gap-x-5 overflow-x-auto rounded-2xl border border-parent-accent/20 bg-linear-to-r from-bone via-white to-parent-pale/50 px-3 py-4 shadow-[0_2px_4px_rgba(0,0,0,0.18)] no-scrollbar sm:gap-x-7 sm:px-4 sm:py-5">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => onTabChange(tab.value)}
          className={`shrink-0 whitespace-nowrap pb-1 text-[11px] transition lg:text-xs xl:text-sm ${
            activeTab === tab.value
              ? "text-parent-green underline underline-offset-8"
              : "text-gray-600 hover:text-parent-green"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </header>
  );
};

export default ActivityLogsHeader;
