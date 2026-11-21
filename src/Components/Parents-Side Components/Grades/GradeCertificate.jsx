import { forwardRef } from "react";
import schoolLogo from "../../../assets/logowbg.png";

const GradeCertificate = forwardRef(
  (
    {
      student,
      studentName,
      printDate,
      developments,
      quarters,
      remarks,
      getDevelopmentGrades,
      formatGrade,
      className = "",
    },
    ref,
  ) => (
    <article ref={ref} className={className}>
      <header className="relative flex min-h-20 items-center justify-center border-b border-gray-400 pb-4 max-sm:min-h-14 max-sm:pb-2">
        <img
          src={schoolLogo}
          alt="Grace Christian Academy logo"
          className="absolute left-0 size-16 object-contain max-sm:size-9"
        />
        <div className="text-center">
          <p className="text-xs font-semibold max-sm:text-[9px]">
            Grace Christian Academy
          </p>
          <h1 className="mt-1 text-lg font-bold uppercase max-sm:text-[11px]">
            Grace Christian Academy
          </h1>
          <p className="text-xs max-sm:text-[9px]">Student Academic Record</p>
        </div>
      </header>

      <h2 className="mt-6 text-center text-base font-bold uppercase tracking-wide max-sm:mt-4 max-sm:text-[11px]">
        Unofficial Certificate of Grades
      </h2>

      <p className="mt-4 text-right text-xs underline max-sm:mt-2 max-sm:text-[9px]">
        {printDate}
      </p>
      <p className="text-right text-xs max-sm:text-[9px]">Date</p>

      <p className="mt-7 text-sm font-bold max-sm:mt-4 max-sm:text-xs">
        To Whom It May Concern:
      </p>
      <p className="mt-4 text-justify text-sm leading-6 max-sm:mt-2 max-sm:text-xs max-sm:leading-4">
        This is to certify that <strong>{studentName || "-"}</strong>, with
        Student ID <strong>{student.studentId || "-"}</strong> and Learner
        Reference Number{" "}
        <strong>{student.learnerReferenceNumber || "-"}</strong>, has the
        following recorded skill grades:
      </p>

      <table className="mt-5 w-full table-fixed border-collapse text-xs max-sm:mt-3 max-sm:text-[8px]">
        <thead>
          <tr>
            <th className="w-[52%] border border-black px-2 py-2 text-left max-sm:px-1 max-sm:py-1">
              Skill
            </th>
            {quarters.map((quarter, index) => (
              <th
                key={quarter}
                className="border border-black px-2 py-2 text-center max-sm:px-1 max-sm:py-1"
              >
                <span className="sm:hidden">Q{index + 1}</span>
                <span className="hidden sm:inline">{quarter}</span>
              </th>
            ))}
          </tr>
        </thead>
        {developments.map((development) => (
          <tbody key={development.title}>
            <tr>
              <th
                colSpan={quarters.length + 1}
                className="border border-black bg-gray-100 px-2 py-2 text-left max-sm:px-1 max-sm:py-1"
              >
                {development.title}
              </th>
            </tr>
            {getDevelopmentGrades(development.title).map((item) => (
              <tr key={item.skill}>
                <td className="border border-black px-2 py-1.5 max-sm:px-1 max-sm:py-1">
                  {item.skill}
                </td>
                {quarters.map((_, index) => (
                  <td
                    key={index}
                    className="border border-black px-2 py-1.5 text-center max-sm:px-1 max-sm:py-1"
                  >
                    {formatGrade(item.grades[index + 1])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ))}
      </table>

      <h3 className="mt-6 text-sm font-bold uppercase max-sm:mt-4 max-sm:text-[11px]">
        Teacher Remarks
      </h3>
      <table className="mt-2 w-full table-fixed border-collapse text-xs max-sm:mt-1 max-sm:text-[9px]">
        <thead>
          <tr>
            <th className="w-1/4 border border-black px-2 py-2 text-left max-sm:px-1 max-sm:py-1">
              Quarter
            </th>
            <th className="border border-black px-2 py-2 text-left max-sm:px-1 max-sm:py-1">
              Remarks
            </th>
          </tr>
        </thead>
        <tbody>
          {quarters.map((quarter, index) => {
            const remark = remarks[index + 1];

            return (
              <tr key={quarter}>
                <td className="border border-black px-2 py-2 max-sm:px-1 max-sm:py-1">
                  <span className="sm:hidden">Q{index + 1}</span>
                  <span className="hidden sm:inline">{quarter}</span>
                </td>
                <td className="border border-black px-2 py-2 max-sm:px-1 max-sm:py-1">
                  {remark?.trim() || "No remarks"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </article>
  ),
);

GradeCertificate.displayName = "GradeCertificate";

export default GradeCertificate;
