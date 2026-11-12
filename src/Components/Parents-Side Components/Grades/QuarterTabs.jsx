const QuarterTabs = ({ quarters, selectedQuarter, onQuarterChange }) => {

  return (
    <div className="grid w-full grid-cols-3 gap-2 rounded-3xl border border-parent-accent/15 bg-[#f3f8f1] px-3 py-4 font-[Poppins] shadow-sm sm:flex sm:flex-row sm:items-center sm:gap-6 sm:px-5 sm:py-5">
      {quarters.map((quarter, index) => {
        const quarterNumber = index + 1;
        const isSelected = selectedQuarter === quarterNumber;

        return (
          <button
            key={quarter}
            type="button"
            onClick={() => onQuarterChange(quarterNumber)}
            className={`w-full rounded-full px-4 py-2.5 text-[9px] font-[PoppinsBold] transition-all duration-200 sm:w-auto sm:px-5 sm:py-3 lg:text-[11px] lg:px-6 ${
              isSelected
                ? "bg-linear-to-r from-[#1c3a28] to-parent-accent text-white shadow-sm"
                : "text-parent-green hover:bg-parent-accent/10"
            }`}
          >
            {quarter}
          </button>
        );
      })}
    </div>
  );
};

export default QuarterTabs;
