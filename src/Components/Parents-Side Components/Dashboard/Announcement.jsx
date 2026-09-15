
const Announcement = ({ title, posted, message, date, time, venue }) => {
  
  return (
    <div className="min-w-70 md:min-w-96 lg:min-w-100 snap-start font-[Poppins] cursor-default h-full">
      <div className="flex h-full flex-col gap-2 rounded-2xl bg-bone p-3 shadow-sm sm:gap-4 sm:p-5 lg:p-6">
        {/* Header row */}
        <div className="flex flex-col gap-1 lg:flex-row lg:items-start lg:justify-between lg:gap-4">
          <h2 className="text-xs font-[PoppinsBold] text-swamp-green sm:text-sm lg:text-lg">
            {title}
          </h2>
          <span className="shrink-0 whitespace-nowrap text-2xs text-red-900 sm:text-xs lg:text-sm">
            Posted on: {posted}
          </span>
        </div>

        <p className="flex-1 border-t py-2 text-[11px] leading-relaxed text-ashlight sm:text-sm lg:text-base">
          {message}
        </p>

        <ul className="list-disc space-y-2 pl-4 text-[11px] py-3 text-ashlight sm:text-sm lg:text-base">
          <li>Date: {date}</li>
          <li>Time: {time}</li>
          <li>Venue: {venue}</li>
        </ul>
      </div>
    </div>
  )
}

export default Announcement
