const DaysCard = ({ totalDays }) => {
  return (
    <div className="flex min-h-24 w-full flex-col justify-between rounded-2xl bg-linear-to-br from-[#777777] to-[#353535] px-4 py-4 font-[Poppins] text-white shadow-md sm:min-h-28 sm:px-5 sm:py-5 lg:min-h-32 lg:flex-1 lg:px-6 lg:py-5">
      <p className="max-w-22.5 text-2xs font-bold leading-tight text-white/80 sm:text-xs">
        TOTAL NUMBER OF DAYS
      </p>

      <p className="self-end text-2xl font-bold sm:text-3xl">
        {totalDays}
      </p>
    </div>
  );
};

export default DaysCard;