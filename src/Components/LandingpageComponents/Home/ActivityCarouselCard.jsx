import {
  BookOpenCheck,
  Dumbbell,
  HeartHandshake,
  Pencil,
  Sparkles,
  Trash2,
} from "lucide-react";

const ACTIVITY_ICONS = [BookOpenCheck, Dumbbell, HeartHandshake, Sparkles];

const ActivityCarouselCard = ({
  index = 0,
  title,
  description,
  image,
  onEdit,
  onRemove,
}) => {
  const Icon = ACTIVITY_ICONS[index % ACTIVITY_ICONS.length];
  const editable = Boolean(onEdit || onRemove);

  return (
    <div className="group relative flex h-64 w-full flex-col justify-end overflow-hidden rounded-3xl border-2 border-white bg-forest-green text-white shadow-[0_10px_24px_rgba(19,50,21,0.14)] transition-transform duration-300 hover:-translate-y-1 sm:h-72">
      <img
        src={image}
        alt={title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-linear-to-t from-[#0c2423]/95 via-[#0c2423]/35 to-transparent" />

      <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/30 bg-[#10271d]/45 px-3 py-1.5 text-xs font-[PoppinsBold] uppercase tracking-wider text-white backdrop-blur-md">
        <Icon aria-hidden="true" className="h-4 w-4 text-lime-green" strokeWidth={2} />
        <span>Activity {String(index + 1).padStart(2, "0")}</span>
      </div>

      {editable && (
        <div className="absolute right-3 top-3 z-20 flex items-center gap-2">
          {onEdit && (
            <button
              type="button"
              onClick={onEdit}
              aria-label={`Edit ${title}`}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-parent-green shadow transition hover:bg-white"
            >
              <Pencil className="h-4 w-4" />
            </button>
          )}
          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              aria-label={`Remove ${title}`}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-reject/90 text-white shadow transition hover:bg-reject"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      )}

      <div className="relative z-10 min-w-0 px-5 pb-5 pt-12">
        <h3 className="font-[PoppinsBold] text-base leading-tight sm:text-lg">
          {title}
        </h3>
        <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-white/85 sm:text-sm">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ActivityCarouselCard;
