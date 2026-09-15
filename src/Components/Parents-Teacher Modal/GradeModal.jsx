const GradeModal = ({
  title,
  items,
  quarters,
  selectedQuarter,
  onQuarterChange,
  onClose,
}) => {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/30 px-4 py-6 font-[Poppins]">
      <div className="w-full max-w-md overflow-hidden rounded-3xl bg-bone shadow-xl">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4">
          <h2 className="text-xs font-[PoppinsBold] text-swamp-green md:text-sm lg:text-base">
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-2xs text-gray-600 transition hover:text-gray-900"
          >
            Close
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 px-6 pb-4">
          {quarters.map((quarter, index) => {
            const quarterNumber = index + 1;
            const isSelected = selectedQuarter === quarterNumber;

            return (
              <button
                key={quarter}
                type="button"
                onClick={() => onQuarterChange(quarterNumber)}
                className={`rounded-full px-2 py-2 text-[9px] font-[PoppinsBold] transition lg:text-2xs ${
                  isSelected
                    ? "bg-swamp-green text-white"
                    : "text-swamp-green hover:bg-swamp-green/10"
                }`}
              >
                {quarter}
              </button>
            );
          })}
        </div>

        {/* Grade Items */}
        <div className="px-6">
          {items.map((item, index) => (
            <div
              key={item.skill}
              className={`flex items-center justify-between py-3 ${
                index !== items.length - 1
                  ? "border-b border-gray-300"
                  : ""
              }`}
            >
              <div className="flex min-w-0 flex-col gap-1 pr-4">
                <p className="text-2xs font-[PoppinsBold] text-swamp-green lg:text-xs">
                  {item.skill}
                </p>

                {item.description && (
                  <p className="text-[9px] text-gray-600 lg:text-[11px]">
                    ({item.description})
                  </p>
                )}
              </div>

              <span className="shrink-0 text-2xl px-5 font-[PoppinsBold] text-swamp-green lg:text-3xl">
                {item.grade}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom spacing */}
        <div className="px-6 py-2" />
      </div>
    </div>
  );
};

export default GradeModal;
