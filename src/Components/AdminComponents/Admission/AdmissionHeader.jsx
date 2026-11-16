import { useNavigate, useLocation } from "react-router-dom";

const AdmissionHeader = ({ tabs }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <header className="flex w-full min-h-16 flex-nowrap items-center gap-x-5 overflow-x-auto rounded-2xl border border-parent-accent/20 bg-bone px-3 py-4 shadow-[0_2px_4px_rgba(0,0,0,0.18)] no-scrollbar sm:min-h-18 sm:gap-x-7 sm:px-4 sm:py-5">
      {tabs.map((tab) => (
        <button
          key={tab.label}
          type="button"
          onClick={() => navigate(tab.path)}
          className={`shrink-0 whitespace-nowrap pb-1 text-[11px] transition lg:text-xs xl:text-sm ${
            pathname === tab.path
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

export default AdmissionHeader;
