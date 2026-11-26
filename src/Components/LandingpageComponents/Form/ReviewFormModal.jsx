import React, { useState } from "react";

import { getStudentLabel } from "./formUtils";

const ReviewField = ({ label, value }) => (
  <div className="min-w-0">
    <p className="mb-1 text-[9px] sm:text-xs text-neutral-600">{label}</p>

    <div className="truncate rounded-md border border-[#d4d5d9] bg-bone px-2.5 py-1.5 text-2xs text-neutral-700">
      {value || "N/A"}
    </div>
  </div>
);

const ReviewSection = ({ title, children, layered = false }) => (
  <section>
    <h2 className="mb-3 text-[9px] sm:text-xs font-[PoppinsBold] uppercase text-parent-green">
      {title}
    </h2>

    {layered ? (
      <div className="flex flex-col gap-y-3">{children}</div>
    ) : (
      <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-3">
        {children}
      </div>
    )}
  </section>
);

const ReviewRow = ({ children }) => (
  <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-3">
    {children}
  </div>
);

const loadImageDataUrl = async (src) => {
  const res = await fetch(src);
  const blob = await res.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const ReviewFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  data = {},
  gradeLevels = [],
  paymentOptionsMap = {},
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  const isLegacy = !Array.isArray(data.students);

  const students = isLegacy
    ? [{ ...data, parents: (data.parents || []).slice(0, 2) }]
    : data.students || [];

  const guardian = isLegacy ? data.parents?.[2] || {} : data.guardian || {};

  const handleDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
      const W = pdf.internal.pageSize.getWidth();
      const H = pdf.internal.pageSize.getHeight();
      const M = 36;
      const CW = W - M * 2;
      let y = M;

      const ensure = (need = 40) => {
        if (y + need > H - M) {
          pdf.addPage();
          y = M;
        }
      };

      const section = (title) => {
        ensure(34);
        pdf.setFillColor(47, 107, 69);
        pdf.rect(M, y, CW, 20, "F");
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(9);
        pdf.setTextColor(255, 255, 255);
        pdf.text(String(title).toUpperCase(), M + 8, y + 13);
        y += 28;
        pdf.setTextColor(59, 59, 59);
      };

      const fields = (items, cols = 3) => {
        const gap = 10;
        const fw = (CW - gap * (cols - 1)) / cols;
        for (let i = 0; i < items.length; i += cols) {
          const row = items.slice(i, i + cols);
          const vals = row.map((f) => {
            const v = String(f.value || "N/A");
            return pdf.splitTextToSize(v, fw - 12);
          });
          const maxLines = Math.max(...vals.map((v) => v.length), 1);
          const boxH = 14 + maxLines * 10;
          ensure(boxH + 18);
          row.forEach((f, ci) => {
            const x = M + ci * (fw + gap);
            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(7);
            pdf.setTextColor(115, 115, 115);
            pdf.text(String(f.label).toUpperCase(), x, y);
            pdf.setDrawColor(212, 213, 217);
            pdf.setFillColor(243, 245, 253);
            pdf.roundedRect(x, y + 4, fw, boxH, 3, 3, "FD");
            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(9);
            pdf.setTextColor(59, 59, 59);
            pdf.text(vals[ci], x + 6, y + 16);
          });
          y += boxH + 16;
        }
      };

      // Header
      try {
        const logo = await loadImageDataUrl("/image/logowbg.png");
        pdf.addImage(logo, "PNG", M, y, 46, 46);
      } catch {
        /* no logo */
      }
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(9);
      pdf.setTextColor(47, 107, 69);
      pdf.text("GRACE CHRISTIAN ACADEMY", M + 56, y + 12);
      pdf.setFontSize(16);
      pdf.text("ENROLLMENT APPLICATION FORM", M + 56, y + 30);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8);
      pdf.setTextColor(115, 115, 115);
      pdf.text(
        `Applicant Copy  •  Generated ${new Date().toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" })}`,
        M + 56,
        y + 43,
      );
      y += 54;
      pdf.setDrawColor(47, 107, 69);
      pdf.setLineWidth(1.2);
      pdf.line(M, y, M + CW, y);
      y += 16;

      students.forEach((student, index) => {
        const parents = student.parents || [];
        const father = parents[0] || {};
        const mother = parents[1] || {};
        const label = getStudentLabel(student, index);
        if (index > 0) {
          ensure(20);
          pdf.setDrawColor(47, 107, 69);
          pdf.setLineWidth(0.6);
          pdf.line(M, y, M + CW, y);
          y += 16;
        }

        section(`Student Information${label}`);
        fields([
          { label: "Grade Level", value: getGradeLevelName(student) },
          { label: "Last Name", value: student.s_last_name },
          { label: "First Name", value: student.s_first_name },
          { label: "Middle Name", value: student.s_mid_name },
          { label: "Gender", value: student.s_gender },
          { label: "Date of Birth", value: student.s_bdate },
          { label: "Place of Birth", value: student.s_birthplace },
          { label: "Religion", value: student.s_religion },
          { label: "Nationality", value: student.s_nationality },
          {
            label: "Is the student disabled?",
            value: student.s_disabled === "yes" ? "Yes" : student.s_disabled === "no" ? "No" : "N/A",
          },
          { label: "Student disability", value: student.s_disability },
        ]);

        section(`Student Address${label}`);
        fields([
          { label: "Province", value: student.province },
          { label: "Zip Code", value: student.zipcode },
          { label: "City / Municipality", value: student.city_municipality },
          { label: "House No. / Street", value: student.house_no },
          { label: "Barangay", value: student.barangay },
        ]);

        section(`Father Information${label}`);
        fields([
          { label: "Last Name", value: father.p_last_name },
          { label: "First Name", value: father.p_first_name },
          { label: "Middle Name", value: father.p_middle_name },
          { label: "Occupation", value: father.p_occupation },
          { label: "Contact Number", value: father.p_contact_number },
          { label: "Email", value: father.p_email },
        ]);

        section(`Mother Information${label}`);
        fields([
          { label: "Last Name", value: mother.p_last_name },
          { label: "First Name", value: mother.p_first_name },
          { label: "Middle Name", value: mother.p_middle_name },
          { label: "Occupation", value: mother.p_occupation },
          { label: "Contact Number", value: mother.p_contact_number },
          { label: "Email", value: mother.p_email },
        ]);
      });

      section("Guardian Information");
      fields([
        { label: "Last Name", value: guardian.p_last_name },
        { label: "First Name", value: guardian.p_first_name },
        { label: "Middle Name", value: guardian.p_middle_name },
        { label: "Relation w/ Student", value: guardian.relationship_type },
        { label: "Contact Number", value: guardian.p_contact_number },
        { label: "Email", value: guardian.p_email },
      ]);

      section("Payment Method");
      fields(
        students.map((student, index) => ({
          label: `Payment Option${getStudentLabel(student, index)}`,
          value: getPaymentOptionName(student),
        })),
      );

      const date = new Date().toISOString().slice(0, 10);
      pdf.save(`gca-enrollment-form-${date}.pdf`);
    } catch (error) {
      console.error("Failed to download form PDF:", error);
      alert("Failed to download form. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const getGradeLevelName = (student) =>
    gradeLevels.find(
      (grade) =>
        Number(grade.grade_level_id) === Number(student.grade_level_id),
    )?.grade_level_name;

  const getPaymentOptionName = (student) => {
    const options = paymentOptionsMap[student.grade_level_id] || [];

    return options.find(
      (option) =>
        Number(option.gradelevel_paymentoption_id) ===
        Number(student.gradelevel_paymentoption_id),
    )?.option_name;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 px-4 py-5 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="review-form-title"
    >
      <div className="flex max-h-[calc(100dvh-40px)] w-full max-w-200 flex-col rounded-xl bg-[#f2f4fd] p-4 shadow-xl sm:p-6">
        {/* HEADER */}
        <div className="mb-4 flex items-center justify-between">
          <h1
            id="review-form-title"
            className="text-sm font-[PoppinsBold] uppercase tracking-wide text-parent-green"
          >
            Review Application
          </h1>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close review"
            className="-m-1 px-2 py-1.5 text-lg leading-none text-neutral-500 hover:text-neutral-800"
          >
            &times;
          </button>
        </div>

        {/* CONTENT */}
        <div className="overflow-y-auto pr-1">
          <div className="bg-[#f2f4fd] px-1 pb-1">
            <div className="mb-5 flex items-center gap-3 border-b-2 border-parent-green/20 pb-4 sm:gap-4">
              <img
                src="/image/logowbg.png"
                alt="Grace Christian Academy logo"
                crossOrigin="anonymous"
                className="h-14 w-14 shrink-0 object-contain sm:h-16 sm:w-16"
              />
              <div className="min-w-0">
                <p className="text-[9px] font-[PoppinsBold] uppercase tracking-[0.2em] text-parent-green/70 sm:text-[10px]">
                  Grace Christian Academy
                </p>
                <h2 className="text-sm font-[PoppinsBold] uppercase text-parent-green sm:text-lg">
                  Enrollment Application Form
                </h2>
                <p className="text-[9px] text-neutral-500 sm:text-[10px]">
                  Applicant copy &bull; Generated{" "}
                  {new Date().toLocaleDateString("en-PH", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {students.map((student, index) => {
            const parents = student.parents || [];
            const father = parents[0] || {};
            const mother = parents[1] || {};
            const studentLabel = getStudentLabel(student, index);

            return (
              <React.Fragment key={student._id || index}>
                {index > 0 && (
                  <div className="my-6 border-t-2 border-parent-green/30" />
                )}

                <ReviewSection
                  title={`Student Information${studentLabel}`}
                  layered
                >
                  <ReviewRow>
                    <ReviewField
                      label="Grade Level"
                      value={getGradeLevelName(student)}
                    />
                  </ReviewRow>

                  <ReviewRow>
                    <ReviewField
                      label="Last Name"
                      value={student.s_last_name}
                    />

                    <ReviewField
                      label="First Name"
                      value={student.s_first_name}
                    />

                    <ReviewField
                      label="Middle Name"
                      value={student.s_mid_name}
                    />
                  </ReviewRow>

                  <ReviewRow>
                    <ReviewField label="Gender" value={student.s_gender} />

                    <ReviewField
                      label="Date of Birth"
                      value={student.s_bdate}
                    />

                    <ReviewField
                      label="Place of Birth"
                      value={student.s_birthplace}
                    />
                  </ReviewRow>

                  <ReviewRow>
                    <ReviewField label="Religion" value={student.s_religion} />

                    <ReviewField
                      label="Nationality"
                      value={student.s_nationality}
                    />

                    <ReviewField
                      label="Is the student disabled?"
                      value={
                        student.s_disabled === "yes"
                          ? "Yes"
                          : student.s_disabled === "no"
                            ? "No"
                            : "N/A"
                      }
                    />
                  </ReviewRow>

                  <ReviewRow>
                    <ReviewField
                      label="Student disability"
                      value={student.s_disability}
                    />
                  </ReviewRow>
                </ReviewSection>

                <div className="my-5 border-t border-[#d6d9e2]" />

                <ReviewSection
                  title={`Student Address${studentLabel}`}
                >
                  <ReviewField label="Province" value={student.province} />

                  <ReviewField label="Zip Code" value={student.zipcode} />

                  <ReviewField
                    label="City / Municipality"
                    value={student.city_municipality}
                  />

                  <ReviewField
                    label="House No. / Street"
                    value={student.house_no}
                  />

                  <ReviewField label="Barangay" value={student.barangay} />
                </ReviewSection>

                <div className="my-5 border-t border-[#d6d9e2]" />

                <ReviewSection
                  title={`Father Information${studentLabel}`}
                >
                  <ReviewField label="Last Name" value={father.p_last_name} />

                  <ReviewField label="First Name" value={father.p_first_name} />

                  <ReviewField
                    label="Middle Name"
                    value={father.p_middle_name}
                  />

                  <ReviewField
                    label="Occupation"
                    value={father.p_occupation}
                  />

                  <ReviewField
                    label="Contact Number"
                    value={father.p_contact_number}
                  />

                  <ReviewField label="Email" value={father.p_email} />
                </ReviewSection>

                <div className="my-5 border-t border-[#d6d9e2]" />

                <ReviewSection
                  title={`Mother Information${studentLabel}`}
                >
                  <ReviewField label="Last Name" value={mother.p_last_name} />

                  <ReviewField label="First Name" value={mother.p_first_name} />

                  <ReviewField
                    label="Middle Name"
                    value={mother.p_middle_name}
                  />

                  <ReviewField
                    label="Occupation"
                    value={mother.p_occupation}
                  />

                  <ReviewField
                    label="Contact Number"
                    value={mother.p_contact_number}
                  />

                  <ReviewField label="Email" value={mother.p_email} />
                </ReviewSection>

                {index === students.length - 1 && (
                  <div className="my-5 border-t border-[#d6d9e2]" />
                )}
              </React.Fragment>
            );
          })}

          {/* ================= GUARDIAN ================= */}
          <ReviewSection title="Guardian Information">
            <ReviewField label="Last Name" value={guardian.p_last_name} />

            <ReviewField label="First Name" value={guardian.p_first_name} />

            <ReviewField label="Middle Name" value={guardian.p_middle_name} />

            <ReviewField
              label="Relation w/ Student"
              value={guardian.relationship_type}
            />

            <ReviewField
              label="Contact Number"
              value={guardian.p_contact_number}
            />

            <ReviewField label="Email" value={guardian.p_email} />
          </ReviewSection>

          <div className="my-5 border-t border-[#d6d9e2]" />

          {/* ================= PAYMENT ================= */}
          <ReviewSection title="Payment Method">
            {students.map((student, index) => (
              <ReviewField
                key={student._id || index}
                label={`Payment Option${getStudentLabel(student, index)}`}
                value={getPaymentOptionName(student)}
              />
            ))}
          </ReviewSection>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex flex-col gap-2 pt-5 sm:flex-row sm:justify-between">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-md bg-bone px-5 py-2.5 text-xs font-[PoppinsBold] uppercase text-neutral-600 shadow-sm sm:w-auto"
          >
            Cancel
          </button>

          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            <button
              type="button"
              onClick={handleDownload}
              disabled={isDownloading}
              className="w-full rounded-md border border-parent-green bg-bone px-5 py-2.5 text-xs font-[PoppinsBold] uppercase text-parent-green shadow-sm transition hover:bg-parent-pale disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {isDownloading ? "Downloading..." : "Download Form"}
            </button>
            <button
              type="button"
              onClick={onSubmit}
              className="w-full rounded-md bg-parent-green px-5 py-2.5 text-xs font-[PoppinsBold] uppercase text-white shadow-sm transition hover:bg-parent-accent sm:w-auto"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewFormModal;
