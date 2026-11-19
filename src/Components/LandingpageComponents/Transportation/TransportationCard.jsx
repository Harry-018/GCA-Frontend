const TransportationCard = ({ location, distance, price }) => {
  return (
    <div className="group relative flex h-full min-h-36 flex-col justify-between overflow-hidden rounded-2xl border border-parent-accent/15 bg-bone p-3 transition duration-300 hover:-translate-y-1 hover:border-parent-accent/35 hover:shadow-[0_10px_24px_rgba(19,50,21,0.18)] sm:min-h-44 sm:p-6">
      <div className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-egg blur-2xl transition-transform duration-500 group-hover:scale-125" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-parent-green via-parent-accent to-lime-green" />

      <h3 className="relative min-w-0 wrap-break-word font-[PoppinsBold] text-sm text-parent-green sm:text-lg">
        {location}
      </h3>

      <div className="relative mt-3 flex items-end justify-between gap-2 border-t border-parent-accent/15 pt-3 sm:mt-4 sm:gap-3 sm:pt-4">
        <p className="min-w-0 wrap-break-word text-xs text-ashlight sm:text-base">
          <span className="font-[PoppinsBold] text-parent-green">
            {distance}km
          </span>{" "}
          from school
        </p>

        <p className="shrink-0 rounded-full bg-linear-to-r from-parent-green to-parent-accent px-3 py-1 font-[PoppinsBold] text-base text-white shadow-sm shadow-parent-green/25 sm:px-4 sm:py-1.5 sm:text-xl">
          ₱{price}
        </p>
      </div>
    </div>
  );
};

export default TransportationCard;
