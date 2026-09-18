import React from "react";

const SchoolYearLabel = ({ schoolYear }) => {
  return (
    <span className="flex items-center gap-2 whitespace-nowrap font-[PoppinsBold] text-sm text-swamp-green sm:text-md">
      Grade Level:{" "}
      <span className="font-[Poppins] text-sm text-gray-600">
        S.Y {schoolYear}
      </span>
    </span>
  );
};

export default SchoolYearLabel;