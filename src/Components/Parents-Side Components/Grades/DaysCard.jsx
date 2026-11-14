const DaysCard = ({ totalDays }) => {
  return (
    <div className="flex min-h-24 w-full flex-col items-center justify-center gap-1 rounded-2xl bg-linear-to-br from-parent-accent via-[#1c3a28] to-[#0f2419] px-4 py-4 text-center font-[Poppins] text-white shadow-md sm:min-h-28 sm:px-5 sm:py-5 lg:min-h-32 lg:flex-1 lg:px-6 lg:py-5">
      <p className="text-2xs font-[PoppinsBold] leading-tight text-white/80 sm:text-xs">
        <span className="block">TOTAL NUMBER OF</span>
        <span className="block">DAYS</span>
      </p>

      <p className="text-2xl font-[PoppinsBold] sm:text-3xl">
        {totalDays}
      </p>
    </div>
  );
};

export default DaysCard;