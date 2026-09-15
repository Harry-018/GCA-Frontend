const ScheduleTime = ({ time }) => {

  return (
    <div className="flex h-full items-start border-r border-gray-200 bg-bone px-2 py-3 sm:px-3 sm:py-5">
      <span className="whitespace-nowrap text-[7px] font-[PoppinsBold] text-swamp-green sm:text-2xs">
        {time}
      </span>
    </div>
  );
};

export default ScheduleTime;
