const InfoSection = ({ title, children }) => {
  return (
    <section className="rounded-xl border border-[#d8d9df] bg-[#f2f4fd] px-4 py-4 shadow-[0_2px_3px_rgba(0,0,0,0.16)] sm:px-6">
      <h3 className="mb-4 text-sm font-bold uppercase text-swamp-green">
        {title}
      </h3>
      <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {children}
      </div>
    </section>
  );
};

export default InfoSection;
