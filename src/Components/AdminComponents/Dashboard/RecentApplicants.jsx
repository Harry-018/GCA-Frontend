import { ClipboardList } from "lucide-react";

const RecentApplicants = ({ applicants, headers }) => {
  return (
    <div className="flex flex-1 flex-col min-h-0">
      <h2 className="flex items-center gap-2 py-3 text-sm font-[Poppins] text-swamp-green lg:text-base xl:text-lg">
        <ClipboardList 
          size={20} 
        />
        
        Recent Applicants
      </h2>

      <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-bone shadow-[0_2px_4px_rgba(0,0,0,0.18)]">
        <div className="flex flex-1 flex-col overflow-x-auto overflow-y-auto min-h-0 thin-scrollbar">
          <table className="w-full min-w-160">

            <thead className="sticky top-0">
              <tr className="border-b border-gray-200 text-left bg-bone">
                {headers.map((header) => (
                  <th
                    key={header}
                    className="whitespace-nowrap px-3 py-3 text-[11px] font-bold text-swamp-green sm:px-7 sm:py-5 sm:text-xs lg:text-sm xl:text-base"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {applicants.map((applicant) => (
                <tr
                  key={applicant.id}
                  className="border-t border-gray-200 whitespace-nowrap text-[11px] text-gray-600 sm:text-xs lg:text-sm xl:text-base"
                >
                  <td className="px-3 py-3 sm:px-7 lg:py-4">
                    {applicant.id}
                  </td>

                  <td className="px-3 py-3 sm:px-7 lg:py-4">
                    {applicant.lastName}
                  </td>

                  <td className="px-3 py-3 sm:px-7 lg:py-4">
                    {applicant.firstName}
                  </td>

                  <td className="px-3 py-3 sm:px-7 lg:py-4">
                    {applicant.gender}
                  </td>

                  <td className="px-3 py-3 sm:px-7 lg:py-4">
                    {applicant.gradeLevel}
                  </td>

                  <td className="px-3 py-3 sm:px-7 lg:py-4">
                    {applicant.dateApplied}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecentApplicants;
