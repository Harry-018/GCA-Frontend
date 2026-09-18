const ScheduleTime = ({ time }) => {
  return (
    <div className="flex h-full min-w-0 items-center justify-center border-r border-gray-200 bg-bone px-1.5 py-2 sm:px-3 sm:py-3">
      <span className="whitespace-nowrap text-center text-[8px] font-[PoppinsBold] leading-tight text-swamp-green sm:text-2xs">
        {time}
      </span>
    </div>
  );
};

export default ScheduleTime;
