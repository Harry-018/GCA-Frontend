import { useNavigate, useLocation } from "react-router-dom";

const AdmissionHeader = ({ tabs }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <header className="flex items-center gap-7 rounded-2xl border border-gray-200 bg-bone px-4 py-5 shadow-[0_2px_4px_rgba(0,0,0,0.18)]">
      {tabs.map((tab) => (
        <button
          key={tab.label}
          type="button"
          onClick={() => navigate(tab.path)}
          className={`pb-1 text-[11px] font-medium transition lg:text-xs xl:text-sm ${
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
