import React from "react";

const AnnouncementCard = ({
  title,
  postedDate,
  greeting,
  description,
  details = [],
  onEdit,
  onRemove,
}) => {
  return (
    <div className="flex w-full min-w-0 cursor-default flex-col gap-3 rounded-2xl border-2 border-transparent bg-[#f4f5fc] p-3 shadow-md transition hover:shadow-lg sm:gap-4 sm:p-5">
      <div className="flex flex-col gap-1 xl:flex-row xl:items-start xl:justify-between xl:gap-2">
        <h2 className="min-w-0 break-words font-[PoppinsBold] text-[13px] text-swamp-green sm:text-lg">
          {title}
        </h2>

        <span className="shrink-0 whitespace-nowrap font-[Poppins] text-[10px] text-gray-600 sm:text-sm xl:pt-1">
          Posted: {postedDate}
        </span>
      </div>

      {greeting && (
        <p className="break-words font-[Poppins] text-[11px] text-gray-700 sm:text-sm">
          {greeting}
        </p>
      )}

      <p className="break-words font-[Poppins] text-[11px] leading-relaxed text-gray-700 sm:text-sm">
        {description}
      </p>

      {details.length > 0 && (
        <ul className="flex flex-col gap-1 pl-4">
          {details.map((detail, index) => (
            <li
              key={index}
              className="break-words list-disc font-[Poppins] text-[11px] text-gray-700 sm:text-sm"
            >
              {detail}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
        <button
          type="button"
          onClick={onEdit}
          className="h-8 shrink-0 rounded-full bg-swamp-green px-4 text-[11px] text-white hover:bg-[#899d6d]"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={onRemove}
          className="h-8 shrink-0 rounded-full bg-[#f27773] px-4 text-[11px] text-white hover:bg-[#ed6661]"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default AnnouncementCard;
