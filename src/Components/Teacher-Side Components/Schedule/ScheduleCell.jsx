const ScheduleCell = ({ section, subject }) => {

  if (!section && !subject) {
    return <div className="h-full" />;
  }
  
  const isLunchTime = section === "Lunch Time";

  return (
    <div
      className={`flex h-full flex-col justify-center px-2 py-2 sm:px-5 sm:py-4 ${
        isLunchTime ? "bg-red-50" : ""
      }`}
    >
      <p
        className={`font-[PoppinsBold] text-[7px] sm:text-[9px] ${
          isLunchTime ? "text-red-500" : "text-gray-600"
        }`}
      >
        {section}
      </p>

      <p
        className={`py-1 text-[7px] sm:py-2 sm:text-[9px] ${
          isLunchTime ? "text-red-400" : "text-gray-500"
        }`}
      >
        {subject}
      </p>
    </div>
  );
};

export default ScheduleCell;
