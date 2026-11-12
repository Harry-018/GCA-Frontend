
import { CalendarDays, Clock3, MapPin, Megaphone } from "lucide-react";

const Announcement = ({ title, posted, message, date, time, venue }) => {
  
  return (
    <div className="min-w-70 md:min-w-96 lg:min-w-100 snap-start font-[Poppins] cursor-default h-full">
      <div className="group relative flex h-full flex-col gap-2 overflow-hidden rounded-2xl border border-parent-accent/15 bg-linear-to-br from-bone via-white to-parent-pale/60 p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-parent-accent/30 hover:shadow-xl sm:gap-4 sm:p-5 lg:p-6">
        <div className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-parent-green via-parent-accent to-parent-mint" />

        {/* Header row */}
        <div className="flex flex-col gap-2 pt-1.5 lg:flex-row lg:items-start lg:justify-between lg:gap-4">
          <div className="flex min-w-0 items-start gap-2.5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-parent-green text-parent-mint shadow-sm ring-1 ring-parent-accent/20 transition-transform duration-300 group-hover:scale-110 sm:size-9">
              <Megaphone size={15} />
            </span>

            <h2 className="min-w-0 break-words text-xs font-[PoppinsBold] text-parent-green sm:text-sm lg:text-lg">
              {title}
            </h2>
          </div>

          <span className="w-fit max-w-full shrink-0 rounded-full bg-parent-pale px-2.5 py-1 text-[9px] font-[PoppinsBold] leading-tight text-parent-green sm:text-2xs lg:text-xs">
            Posted on: {posted}
          </span>
        </div>

        <p className="min-w-0 flex-1 break-words border-t border-parent-accent/10 py-3 text-[11px] leading-relaxed text-ashlight sm:text-sm lg:text-base">
          {message}
        </p>

        <ul className="grid grid-cols-1 gap-2 text-[11px] text-ashlight sm:text-xs lg:text-sm">
          <li className="flex min-w-0 items-center gap-2 rounded-xl bg-white/70 px-3 py-2 ring-1 ring-parent-accent/10">
            <CalendarDays size={14} className="shrink-0 text-parent-accent" />
            <span className="min-w-0 break-words">
              <span className="font-[PoppinsBold] text-parent-green">Date:</span>{" "}
              {date}
            </span>
          </li>

          <li className="flex min-w-0 items-center gap-2 rounded-xl bg-white/70 px-3 py-2 ring-1 ring-parent-accent/10">
            <Clock3 size={14} className="shrink-0 text-parent-accent" />
            <span className="min-w-0 break-words">
              <span className="font-[PoppinsBold] text-parent-green">Time:</span>{" "}
              {time}
            </span>
          </li>

          <li className="flex min-w-0 items-center gap-2 rounded-xl bg-white/70 px-3 py-2 ring-1 ring-parent-accent/10">
            <MapPin size={14} className="shrink-0 text-parent-accent" />
            <span className="min-w-0 break-words">
              <span className="font-[PoppinsBold] text-parent-green">Venue:</span>{" "}
              {venue}
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Announcement
