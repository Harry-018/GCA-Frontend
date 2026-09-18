
const AdminHeader = ({ schoolYear }) => {

  return (
    <header className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-2xl border border-gray-200 bg-bone px-3 py-3 shadow-[0_2px_4px_rgba(0,0,0,0.18)] sm:px-4 sm:py-4.5">
      <h1 className="text-sm font-[Poppins] text-gray-700 sm:text-base xl:text-lg">
        Dashboard
      </h1>

      <p className="font-[Poppins] text-[11px] text-gray-600 sm:text-sm xl:text-base">
        S.Y {schoolYear}
      </p>
    </header>
  );
};

export default AdminHeader;