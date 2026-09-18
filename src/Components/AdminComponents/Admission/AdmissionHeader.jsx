import { useNavigate, useLocation } from "react-router-dom";

const AdmissionHeader = ({ tabs }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <header className="flex w-full flex-wrap items-center gap-x-5 gap-y-2 rounded-2xl border border-gray-200 bg-bone px-3 py-4 shadow-[0_2px_4px_rgba(0,0,0,0.18)] sm:gap-x-7 sm:px-4 sm:py-5">
      {tabs.map((tab) => (
        <button
          key={tab.label}
          type="button"
          onClick={() => navigate(tab.path)}
          className={`whitespace-nowrap pb-1 text-2xs font-medium transition sm:text-[11px] lg:text-xs xl:text-sm ${
            pathname === tab.path
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

export default AdmissionHeader;
