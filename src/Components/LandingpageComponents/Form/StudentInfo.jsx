import { useEffect, useState } from "react";
import { philippines } from "@ianlabicani/geoph-lite";

import InfoSection from "./InfoSection";
import StudentFormCard from "./StudentFormCard";
import ParentInfoSections from "./ParentInfoSections";
import GuardianInfoSection from "./GuardianInfoSection";
import PaymentOptionSection from "./PaymentOptionSection";
import TermsAndConditionsModal from "./TermsAndConditionsModal";

const StudentInfo = ({
  formData,
  step = 1,
  agreed = false,
  gradeLevels = [],
  onAgreeChange,
  onStudentChange,
  onParentChange,
  onGuardianChange,
  onAddStudent,
  onRemoveStudent,
  onSameAddress,
  onSameParentInfo,
  onCancelSameAddress,
  onCancelSameParentInfo,
  sameAddressLocks = {},
  sameParentLocks = {},
  onPaymentOptionsLoaded,
}) => {
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  useEffect(() => {
    const loadAddressData = async () => {
      try {
        // CALABARZON
        const region = await philippines.region("0400000000");

        const cavite = region.provinces.find(
          (province) => province.name === "Cavite",
        );

        if (!cavite) {
          console.error("Cavite was not found.");
          return;
        }

        // We only allow Cavite.
        setProvinceOptions([
          {
            label: cavite.name,
            value: cavite.name,
            code: cavite.psgc_code,
          },
        ]);

        const localities = await philippines.localities(cavite.psgc_code);

        const allowedCities = localities.filter((locality) => {
          const name = locality.name.toLowerCase();

          return name === "tanza" || name.includes("trece martires");
        });

        setCityOptions(
          allowedCities.map((city) => ({
            label: city.name,
            value: city.name,
            code: city.psgc_code,
          })),
        );
      } catch (error) {
        console.error("Failed to load Philippine address data:", error);
      }
    };

    loadAddressData();
  }, []);

  const students = formData?.students || [];
  const guardian = formData?.guardian || {};

  const accountParent = localStorage.getItem("account_parent_relationship");

  const verifiedParentIndex = {
    Father: 0,
    Mother: 1,
    Guardian: 2,
  }[accountParent];

  const fatherIsAccountParent = verifiedParentIndex === 0;
  const motherIsAccountParent = verifiedParentIndex === 1;
  const guardianIsAccountParent = verifiedParentIndex === 2;

  const gradeLevelOptions = Array.isArray(gradeLevels) ? gradeLevels : [];

  const handleAgreementChange = (event) => {
    if (event.target.checked) {
      setIsTermsOpen(true);
      return;
    }

    onAgreeChange?.(false);
  };

  const handleTermsAgree = () => {
    onAgreeChange?.(true);
    setIsTermsOpen(false);
  };

  if (step === 1) {
    return (
      <div className="flex flex-col gap-6 font-[Poppins]">
        {students.map((student, index) => (
          <div
            key={student._id || index}
            className="flex flex-col gap-6"
          >
            <StudentFormCard
              student={student}
              index={index}
              totalStudents={students.length}
              gradeLevels={gradeLevelOptions}
              provinceOptions={provinceOptions}
              cityOptions={cityOptions}
              onChange={onStudentChange}
              onRemove={onRemoveStudent}
              onSameAddress={onSameAddress}
              onCancelSameAddress={onCancelSameAddress}
              addressLocked={Boolean(sameAddressLocks[student._id])}
              onAddStudent={onAddStudent}
              isLast={index === students.length - 1}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-6 font-[Poppins]">
        {students.map((student, index) => (
          <ParentInfoSections
            key={student._id || index}
            student={student}
            index={index}
            fatherIsAccountParent={fatherIsAccountParent}
            motherIsAccountParent={motherIsAccountParent}
            onParentChange={onParentChange}
            onSameInformation={onSameParentInfo}
            onCancelSameInformation={onCancelSameParentInfo}
            fatherLocked={Boolean(sameParentLocks[`${student._id}-0`])}
            motherLocked={Boolean(sameParentLocks[`${student._id}-1`])}
          />
        ))}

        <GuardianInfoSection
          guardian={guardian}
          guardianIsAccountParent={guardianIsAccountParent}
          onChange={onGuardianChange}
        />

        {students.map((student, index) => (
          <PaymentOptionSection
            key={student._id || index}
            student={student}
            index={index}
            onChange={onStudentChange}
            onOptionsLoaded={onPaymentOptionsLoaded}
          />
        ))}

        <InfoSection
          title={
            <button
              type="button"
              onClick={() => setIsTermsOpen(true)}
              className="text-left font-[PoppinsBold] uppercase hover:text-parent-accent"
            >
              Terms and Conditions
            </button>
          }
          action={
            <button
              type="button"
              onClick={() => setIsTermsOpen(true)}
              className="rounded-md border border-parent-green bg-transparent px-3 py-1.5 text-2xs font-[PoppinsBold] uppercase text-parent-green transition hover:bg-parent-pale"
            >
              View Terms
            </button>
          }
        >
          <div className="flex flex-col gap-2 sm:col-span-2 md:col-span-3 lg:col-span-4">
            <div className="flex items-start gap-3 rounded-lg border border-[#d4d5d9] bg-bone p-4 text-sm text-neutral-600">
              <input
                id="terms-agreement"
                type="checkbox"
                checked={agreed}
                onChange={handleAgreementChange}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-[#bfc4ca] text-swamp-green"
              />

              <div className="min-w-0">
                <p>
                  <label htmlFor="terms-agreement" className="cursor-pointer">
                    I have read and agree to the
                  </label>{" "}
                  <button
                    type="button"
                    onClick={() => setIsTermsOpen(true)}
                    className="font-[PoppinsBold] text-parent-green underline underline-offset-2 hover:text-parent-accent"
                  >
                    Terms and Conditions
                  </button>
                  .
                </p>

                <p className="mt-1 text-xs text-neutral-500">
                  {agreed
                    ? "Status: Accepted. You may submit your application for review."
                    : "Open the terms, read to the end, then click I Agree to accept."}
                </p>
              </div>
            </div>
          </div>
        </InfoSection>
      </div>

      {isTermsOpen && (
        <TermsAndConditionsModal
          onClose={() => setIsTermsOpen(false)}
          onAgree={handleTermsAgree}
        />
      )}
    </>
  );
};

export default StudentInfo;
