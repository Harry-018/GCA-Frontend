const QuarterTabs = ({ quarters, selectedQuarter, onQuarterChange }) => {

  return (
    <div className="grid w-full grid-cols-3 gap-2 rounded-3xl border border-gray-200 bg-[#f4f6ff] px-3 py-4 font-[Poppins] shadow-sm sm:flex sm:flex-row sm:items-center sm:gap-6 sm:px-5 sm:py-5">
      {quarters.map((quarter, index) => {
        const quarterNumber = index + 1;
        const isSelected = selectedQuarter === quarterNumber;

        return (
          <button
            key={quarter}
            type="button"
            onClick={() => onQuarterChange(quarterNumber)}
            className={`w-full rounded-full px-4 py-2.5 text-[9px] font-bold transition-all duration-200 sm:w-auto sm:px-5 sm:py-3 lg:text-[11px] lg:px-6 ${
              isSelected
                ? "bg-swamp-green text-white"
                : "text-swamp-green hover:bg-[#9caf7d]/10"
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
