import { CalendarDays } from "lucide-react";

const AdmissionOpeningNotice = ({ className = "", schoolStart }) => {
  return (
    <div
      role="status"
      className={`inline-flex items-center gap-2 rounded-xl border border-red-300/40 bg-red-800 px-4 py-2.5 text-left text-white shadow-lg shadow-black/15 backdrop-blur-sm ${className}`}
    >
      <CalendarDays
        aria-hidden="true"
        className="h-4 w-4 shrink-0 text-red-200"
      />
      <span className="flex flex-col gap-0.5">
        <span className="font-[PoppinsBold] text-[9px] tracking-[0.14em] text-white/75">
          ADMISSION OPENS
        </span>
        <span className="font-[PoppinsBold] text-xs leading-tight sm:text-sm">
          {schoolStart}
        </span>
      </span>
    </div>
  );
};

export default AdmissionOpeningNotice;
