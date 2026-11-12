import { MessageSquareText } from "lucide-react";

function Remarks({ remarks, quarters, selectedQuarter, onQuarterChange }) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-parent-accent/15 bg-bone p-4 shadow-sm font-[Poppins] md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-sm font-[PoppinsBold] text-parent-green md:text-lg">
          <MessageSquareText className="size-5 md:size-6" />
          Teacher Remarks
        </h2>

        {/* Quarter selector */}
        <div className="flex flex-wrap items-center gap-1.5">
          {quarters.map((quarter, index) => {
            const quarterNumber = index + 1;
            const isSelected = selectedQuarter === quarterNumber;

            return (
              <button
                key={quarter}
                type="button"
                onClick={() => onQuarterChange(quarterNumber)}
                className={`rounded-full px-3 py-1.5 text-[9px] font-[PoppinsBold] transition lg:text-2xs ${
                  isSelected
                    ? "bg-linear-to-r from-[#1c3a28] to-parent-accent text-white shadow-sm"
                    : "bg-[#f3f8f1] text-parent-green hover:bg-parent-accent/10"
                }`}
              >
                {quarter}
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl border border-parent-accent/15 bg-[#f3f8f1] px-4 py-4 md:px-5 md:py-5">
        <p className="text-xs md:text-sm leading-7 text-gray-600">{remarks}</p>
        <p className="border-t border-parent-accent/15 pt-3 text-xs md:text-sm font-[PoppinsBold] text-parent-green">
          Thank you and God bless!
        </p>
      </div>
    </div>
  );
}

export default Remarks;
