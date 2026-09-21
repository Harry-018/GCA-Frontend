import React from 'react'

const SectionToolbar = ({ schoolYear }) => {
  return (
    <div className="flex h-11 w-full items-center justify-between py-1">
      <div className="flex items-center gap-4">
        <h2 className="font-[PoppinsBold] text-sm text-swamp-green md:text-sm">
          School Year :
        </h2>

        <p className="whitespace-nowrap text-sm font-[Poppins] text-gray-600 md:text-sm">
          S.Y {schoolYear}
        </p>
      </div>
    </div>
  )
}

export default SectionToolbar