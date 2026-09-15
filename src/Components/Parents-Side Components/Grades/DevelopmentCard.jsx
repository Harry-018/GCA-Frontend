const DevelopmentCard = ({ title, onGradesClick }) => {

  return (
    <div className="grid w-full min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-2 rounded-3xl border border-gray-200 bg-bone px-3 py-3 font-[Poppins] shadow-sm sm:gap-3 sm:px-5 sm:py-4 lg:px-6 lg:py-5">
      <h3 className="min-w-0 wrap-break-word text-2xs font-bold leading-tight text-swamp-green sm:text-xs lg:text-sm">
        {title}
      </h3>

      <button
        type="button"
        onClick={onGradesClick}
        className="shrink-0 whitespace-nowrap rounded-full bg-swamp-green px-3 py-2 text-[8px] font-[PoppinsBold] text-white transition-all duration-200 hover:bg-lime-green sm:px-5 sm:py-2.5 sm:text-[9px] lg:px-6 lg:py-3 lg:text-[11px]"
      >
        GRADES
      </button>
    </div>
  );
};

export default DevelopmentCard;
