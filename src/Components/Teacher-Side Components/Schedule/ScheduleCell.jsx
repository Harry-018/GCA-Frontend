const ScheduleCell = ({ section, subject, room }) => {
  if (!subject) return null;

  return (
    <div className="flex h-full flex-col items-center justify-center overflow-hidden px-1 text-center">
      <span className="truncate text-[10px] font-[PoppinsBold] text-swamp-green sm:text-xs">
        {subject}
      </span>

      <span className="truncate text-[9px] text-gray-600 sm:text-[10px]">
        {section}
      </span>

      <span className="truncate text-[9px] text-gray-500 sm:text-[10px]">
        Room: {room}
      </span>
    </div>
  );
};

export default ScheduleCell;
