import { MessageSquareText } from "lucide-react";

function Remarks ({ remarks, quarters, selectedQuarter, onQuarterChange }) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-swamp-green/10 bg-white p-4 shadow-sm font-[Poppins] md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-sm font-[PoppinsBold] text-swamp-green md:text-lg">
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
                    ? "bg-swamp-green text-white"
                    : "bg-gray-100 text-swamp-green hover:bg-swamp-green/10"
                }`}
              >
                {quarter}
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 md:px-5 md:py-5">
        <p className="text-xs md:text-sm leading-7 text-gray-600">
          {remarks}
        </p>
        <p className="border-t border-gray-200 pt-3 text-xs md:text-sm font-[PoppinsBold] text-swamp-green">
          Thank you and God bless!
        </p>
      </div>
    </div>
  );
}

export default Remarks;