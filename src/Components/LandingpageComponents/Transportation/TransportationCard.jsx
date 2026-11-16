const TransportationCard = ({ location, distance, price }) => {
  return (
    <div className="group relative flex min-h-28 flex-col justify-between overflow-hidden rounded-2xl border border-parent-accent/15 bg-bone transition duration-300 hover:-translate-y-1 hover:border-parent-accent/35 hover:shadow-[0_10px_24px_rgba(19,50,21,0.18)] sm:min-h-32 sm:p-6">
      <div className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-egg blur-2xl transition-transform duration-500 group-hover:scale-125" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-parent-green via-parent-accent to-lime-green" />

      <h3 className="relative font-[PoppinsBold] text-base text-parent-green sm:text-lg">
        {location}
      </h3>

      <div className="relative mt-4 flex items-end justify-between gap-3 border-t border-parent-accent/15 pt-4">
        <p className="min-w-0 wrap-break-word text-sm text-ashlight sm:text-base">
          <span className="font-[PoppinsBold] text-parent-green">
            {distance}km
          </span>{" "}
          from school
        </p>

        <p className="shrink-0 rounded-full bg-linear-to-r from-parent-green to-parent-accent px-4 py-1.5 font-[PoppinsBold] text-lg text-white shadow-sm shadow-parent-green/25 sm:text-xl">
          ₱{price}
        </p>
      </div>
    </div>
  );
};

export default TransportationCard;
