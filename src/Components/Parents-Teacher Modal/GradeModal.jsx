const GradeModal = ({
  title,
  items,
  quarters,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/30 px-4 py-6 font-[Poppins] print:hidden">
      <div className="w-full max-w-3xl overflow-hidden rounded-3xl bg-bone shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4">
          <h2 className="text-xs font-[PoppinsBold] text-parent-green md:text-sm lg:text-base">
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-3 py-2 text-2xs text-gray-600 transition hover:text-gray-900"
          >
            Close
          </button>
        </div>

        <div className="overflow-x-auto px-6 pb-4">
          <table className="w-full min-w-xl border-collapse text-left">
            <thead>
              <tr className="border-b border-parent-accent/20">
                <th className="px-3 py-3 text-2xs font-[PoppinsBold] text-parent-green lg:text-xs">
                  Skills
                </th>
                {quarters.map((quarter, index) => (
                  <th
                    key={quarter}
                    className="px-3 py-3 text-center text-2xs font-[PoppinsBold] text-parent-green lg:text-xs"
                  >
                    <span className="sm:hidden">Q{index + 1}</span>
                    <span className="hidden sm:inline">{quarter}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.skill}
                  className="border-b border-parent-accent/15 last:border-b-0"
                >
                  <td className="px-3 py-3">
                    <p className="text-2xs font-[PoppinsBold] text-parent-green lg:text-xs">
                      {item.skill}
                    </p>
                    {item.description && (
                      <p className="mt-1 text-[9px] text-gray-600 lg:text-[11px]">
                        ({item.description})
                      </p>
                    )}
                  </td>
                  {quarters.map((quarter, index) => {
                    const grade = item.grades[index + 1];
                    const isBlank =
                      grade == null || String(grade).trim() === "";

                    return (
                      <td
                        key={quarter}
                        className="px-3 py-3 text-center text-lg font-[PoppinsBold] text-parent-green lg:text-xl"
                      >
                        {isBlank ? "-" : grade}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GradeModal;
