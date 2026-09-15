import React from 'react'

const SectionToolbar = ({ schoolYear }) => {
  return (
    <div className="flex h-11 w-full items-center justify-between py-1">
      <div className="flex items-center gap-2">
        <h2 className="font-[PoppinsBold] text-md text-swamp-green">
          School Year :
        </h2>

        <p className="whitespace-nowrap text-md font-[PoppinsBold] text-gray-600">
          S.Y {schoolYear}
        </p>
      </div>
    </div>
  )
}

export default SectionToolbar