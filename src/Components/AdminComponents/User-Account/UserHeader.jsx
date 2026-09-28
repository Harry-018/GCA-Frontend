const UserHeader = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      label: "Pending Accounts",
      value: "pending",
    },
    {
      label: "Active Accounts",
      value: "active",
    },
    {
      label: "Disabled Accounts",
      value: "disabled",
    },
  ];

  return (
    <header className="flex w-full flex-nowrap items-center gap-x-5 overflow-x-auto rounded-2xl border border-gray-200 bg-bone px-3 py-4 shadow-[0_2px_4px_rgba(0,0,0,0.18)] no-scrollbar sm:gap-x-7 sm:px-4 sm:py-5">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => onTabChange(tab.value)}
          className={`shrink-0 whitespace-nowrap pb-1 text-[11px] font-medium transition lg:text-xs xl:text-sm ${
            activeTab === tab.value
              ? "text-swamp-green underline underline-offset-8"
              : "text-gray-600 hover:text-swamp-green"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </header>
  );
};

export default UserHeader;
