const ScheduleCell = ({ section, subject }) => {

  if (!section && !subject) {
    return <div className="h-full" />;
  }
  
  const isLunchTime = section === "Lunch Time";

  return (
    <div
      className={`flex h-full min-w-0 flex-col justify-center overflow-hidden px-1 py-1 sm:px-5 sm:py-4 ${
        isLunchTime ? "bg-red-50" : ""
      }`}
    >
      <p
        className={`truncate font-[PoppinsBold] text-[7px] sm:text-[9px] ${
          isLunchTime ? "text-red-500" : "text-gray-600"
        }`}
      >
        {section}
      </p>

      <p
        className={`truncate py-0.5 text-[7px] sm:py-2 sm:text-[9px] ${
          isLunchTime ? "text-red-400" : "text-gray-500"
        }`}
      >
        {subject}
      </p>
    </div>
  );
};

export default ScheduleCell;
