import { useState, useEffect, useCallback, useMemo, useRef } from "react";

import { useNavigate, useLoaderData, useBlocker } from "react-router-dom";
import { applyApplication } from "../requests/preEnrollmentRequests";
import LoginHeader from "../Components/LoginHeader";
import Footer from "../Components/Footer";
import StudentInfo from "../Components/LandingpageComponents/Form/StudentInfo";
import ReviewFormModal from "../Components/LandingpageComponents/Form/ReviewFormModal";
import LeaveFormModal from "../Components/LandingpageComponents/Form/LeaveFormModal";
import {
  applyVerifiedParent,
  applyVerifiedParentToStudent,
  buildSubmissionData,
  createInitialData,
  createStudent,
  hasFormInformation,
  isAtLeast3YearsOld,
  isValidContactNumber,
  normalizeFormData,
} from "../Components/LandingpageComponents/Form/formUtils";
import { Loader2 } from "lucide-react";

const STORAGE_KEY = "studentApplication";

const studentPrefix = (index, total) =>
  total > 1 ? `Student ${index + 1}: ` : "";

const getStudentInfoErrors = (student, index, total) => {
  const prefix = studentPrefix(index, total);
  const errors = [];

  const requiredFields = [
    ["grade_level_id", "Grade level"],
    ["s_last_name", "Last name"],
    ["s_first_name", "First name"],
    ["s_gender", "Gender"],
    ["s_bdate", "Date of birth"],
    ["s_birthplace", "Place of birth"],
    ["s_religion", "Religion"],
    ["s_nationality", "Nationality"],
    ["province", "Province"],
    ["city_municipality", "City / Municipality"],
    ["barangay", "Barangay"],
  ];

  requiredFields.forEach(([key, label]) => {
    if (!student?.[key]) {
      errors.push(`${prefix}${label} is required.`);
    }
  });

  if (student?.s_bdate && !isAtLeast3YearsOld(student.s_bdate)) {
    errors.push(`${prefix}Student must be at least 3 years old.`);
  }

  if (student?.s_disabled === "yes" && !student.s_disability) {
    errors.push(`${prefix}Please specify the student's disability.`);
  }

  return errors;
};

const getParentErrors = (student, index, total) => {
  const prefix = studentPrefix(index, total);
  const errors = [];

  (student?.parents || []).forEach((parent, parentIndex) => {
    const role = parentIndex === 0 ? "Father" : "Mother";

    const requiredFields = [
      ["p_last_name", "last name"],
      ["p_first_name", "first name"],
      ["p_occupation", "occupation"],
      ["p_contact_number", "contact number"],
    ];

    requiredFields.forEach(([key, label]) => {
      if (!parent?.[key]) {
        errors.push(`${prefix}${role} ${label} is required.`);
      }
    });

    if (
      parent?.p_contact_number &&
      !isValidContactNumber(parent.p_contact_number)
    ) {
      errors.push(
        `${prefix}${role} contact number must be 11 digits and start with 09.`,
      );
    }
  });

  return errors;
};

const getGuardianErrors = (guardian) => {
  const errors = [];
  const guardianIsRequired = Boolean(guardian?.will_receive_account);

  if (guardianIsRequired) {
    const requiredFields = [
      ["relationship_type", "relationship"],
      ["p_first_name", "first name"],
      ["p_last_name", "last name"],
      ["p_contact_number", "contact number"],
      ["p_email", "email"],
    ];

    requiredFields.forEach(([key, label]) => {
      if (!guardian?.[key]) {
        errors.push(`Guardian ${label} is required.`);
      }
    });
  }

  if (
    guardian?.p_contact_number &&
    (guardianIsRequired || guardian.p_contact_number !== "09") &&
    !isValidContactNumber(guardian.p_contact_number)
  ) {
    errors.push("Guardian contact number must be 11 digits and start with 09.");
  }

  return errors;
};

function FormPage() {
  const loadedGradeLevels = useLoaderData();

  const gradeLevels = Array.isArray(loadedGradeLevels) ? loadedGradeLevels : [];

  const [paymentOptionsMap, setPaymentOptionsMap] = useState({});

  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [sameAddressLocks, setSameAddressLocks] = useState({});
  const [sameParentLocks, setSameParentLocks] = useState({});
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      const parsed = saved ? JSON.parse(saved) : null;

      return applyVerifiedParent(normalizeFormData(parsed));
    } catch {
      return applyVerifiedParent(createInitialData());
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const allowLeaveRef = useRef(false);

  const hasEnteredInfo = useMemo(
    () => hasFormInformation(formData, agreed),
    [formData, agreed],
  );

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      !allowLeaveRef.current &&
      hasEnteredInfo &&
      currentLocation.pathname === "/enrollmentform" &&
      currentLocation.pathname !== nextLocation.pathname,
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch (error) {
      console.error("Failed to save draft:", error);
    }
  }, [formData]);

  useEffect(() => {
    if (!hasEnteredInfo) return;

    const handleBeforeUnload = (event) => {
      if (allowLeaveRef.current) return;

      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasEnteredInfo]);

  const handleStudentChange = (index, key, value) => {
    setFormData((prev) => ({
      ...prev,
      students: prev.students.map((student, studentIndex) =>
        studentIndex === index
          ? {
              ...student,
              [key]: typeof value === "function" ? value(student[key]) : value,
            }
          : student,
      ),
    }));
  };

  const handleParentChange = (studentIndex, parentIndex, key, value) => {
    setFormData((prev) => ({
      ...prev,
      students: prev.students.map((student, index) =>
        index === studentIndex
          ? {
              ...student,
              parents: (student.parents || []).map((parent, indexValue) =>
                indexValue === parentIndex
                  ? {
                      ...parent,
                      [key]:
                        typeof value === "function"
                          ? value(parent[key])
                          : value,
                    }
                  : parent,
              ),
            }
          : student,
      ),
    }));
  };

  const handleGuardianChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      guardian: {
        ...prev.guardian,
        [key]: typeof value === "function" ? value(prev.guardian[key]) : value,
      },
    }));
  };

  const handleAddStudent = () => {
    setFormData((prev) => ({
      ...prev,
      students: [
        ...prev.students,
        applyVerifiedParentToStudent(createStudent()),
      ],
    }));
  };

  const handleRemoveStudent = (index) => {
    setFormData((prev) => {
      if (prev.students.length <= 1) {
        return prev;
      }

      return {
        ...prev,
        students: prev.students.filter((_, studentIndex) => {
          return studentIndex !== index;
        }),
      };
    });
  };

  const handleSameAddress = (index) => {
    setFormData((prev) => {
      if (index <= 0) {
        return prev;
      }

      const previousStudent = prev.students[index - 1];

      if (!previousStudent) {
        return prev;
      }

      return {
        ...prev,
        students: prev.students.map((student, studentIndex) =>
          studentIndex === index
            ? {
                ...student,
                province: previousStudent.province,
                city_municipality: previousStudent.city_municipality,
                barangay: previousStudent.barangay,
                house_no: previousStudent.house_no,
                zipcode: previousStudent.zipcode,
              }
            : student,
        ),
      };
    });

    const studentId = formData.students[index]?._id;

    if (studentId) {
      setSameAddressLocks((prev) => ({ ...prev, [studentId]: true }));
    }
  };

  const handleCancelSameAddress = (index) => {
    const studentId = formData.students[index]?._id;

    if (!studentId) {
      return;
    }

    setSameAddressLocks((prev) => {
      if (!prev[studentId]) {
        return prev;
      }

      const next = { ...prev };

      delete next[studentId];

      return next;
    });
  };

  const handleSameParentInformation = (index, parentIndex) => {
    setFormData((prev) => {
      if (index <= 0) {
        return prev;
      }

      const previousParent = prev.students[index - 1]?.parents?.[parentIndex];

      if (!previousParent) {
        return prev;
      }

      return {
        ...prev,
        students: prev.students.map((student, studentIndex) => {
          if (studentIndex !== index) {
            return student;
          }

          return {
            ...student,
            parents: (student.parents || []).map((parent, indexValue) => {
              if (indexValue !== parentIndex) {
                return parent;
              }

              return {
                ...parent,
                p_last_name: previousParent.p_last_name,
                p_first_name: previousParent.p_first_name,
                p_middle_name: previousParent.p_middle_name,
                p_contact_number: previousParent.p_contact_number,
                p_occupation: previousParent.p_occupation,
                p_email: parent.will_receive_account
                  ? parent.p_email
                  : previousParent.p_email,
              };
            }),
          };
        }),
      };
    });

    const studentId = formData.students[index]?._id;

    if (studentId) {
      setSameParentLocks((prev) => ({
        ...prev,
        [`${studentId}-${parentIndex}`]: true,
      }));
    }
  };

  const handleCancelSameParentInformation = (index, parentIndex) => {
    const studentId = formData.students[index]?._id;

    if (!studentId) {
      return;
    }

    const lockKey = `${studentId}-${parentIndex}`;

    setSameParentLocks((prev) => {
      if (!prev[lockKey]) {
        return prev;
      }

      const next = { ...prev };

      delete next[lockKey];

      return next;
    });
  };

  const handlePaymentOptionsLoaded = useCallback((gradeLevelId, options) => {
    if (!gradeLevelId) {
      return;
    }

    setPaymentOptionsMap((prev) => {
      if (prev[gradeLevelId] === options) {
        return prev;
      }

      return {
        ...prev,
        [gradeLevelId]: options,
      };
    });
  }, []);

  const collectErrors = () => {
    const studentErrors = formData.students.flatMap((student, index) =>
      getStudentInfoErrors(student, index, formData.students.length),
    );

    const parentErrors = formData.students.flatMap((student, index) =>
      getParentErrors(student, index, formData.students.length),
    );

    const guardianErrors = getGuardianErrors(formData.guardian);

    return {
      studentErrors,
      parentErrors: [...parentErrors, ...guardianErrors],
    };
  };

  const handleNext = () => {
    if (step === 1) {
      const { studentErrors } = collectErrors();

      if (studentErrors.length > 0) {
        alert(studentErrors.slice(0, 5).join("\n"));
        return;
      }

      setStep(2);
      return;
    }

    const { parentErrors } = collectErrors();

    if (parentErrors.length > 0) {
      alert(parentErrors.slice(0, 5).join("\n"));
      return;
    }

    if (!agreed) {
      return;
    }

    setIsReviewOpen(true);
  };

  const handleSubmit = async () => {
    const { studentErrors, parentErrors } = collectErrors();

    if (studentErrors.length > 0) {
      setIsReviewOpen(false);
      setStep(1);
      alert(studentErrors.slice(0, 5).join("\n"));
      return;
    }

    if (parentErrors.length > 0) {
      setIsReviewOpen(false);
      setStep(2);
      alert(parentErrors.slice(0, 5).join("\n"));
      return;
    }

    setIsSubmitting(true);

    try {
      const verification_id = localStorage.getItem("verification_id");

      const submissionData = buildSubmissionData(formData, verification_id);

      await applyApplication(submissionData);

      localStorage.removeItem("studentApplication");
      localStorage.removeItem("verification_id");
      localStorage.removeItem("verified_email");
      localStorage.removeItem("account_parent_relationship");

      allowLeaveRef.current = true;
      navigate("/thanksforapply");
    } catch (error) {
      console.error("APPLICATION ERROR:", error);

      console.error("BACKEND ERROR:", error.response?.data);

      console.error("STATUS:", error.response?.status);

      alert(error.response?.data?.message || "Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <LoginHeader />

      <div className="flex w-full flex-1 flex-col overflow-x-hidden">
        <div className="flex w-full flex-1 flex-col bg-[#eeece8] px-3 py-4 sm:px-8 sm:py-8">
          <div className="mx-auto w-full max-w-6xl">
            <div className="flex items-center gap-3">
              <div
                className={`h-0.5 flex-1 ${step === 1 ? "bg-parent-green" : "bg-[#b7b7b4]"}`}
              />
              <div
                className={`h-0.5 flex-1 ${step === 2 ? "bg-parent-green" : "bg-[#b7b7b4]"}`}
              />
            </div>

            <div className="rounded-xl bg-transparent pt-5 sm:pt-7">
              <StudentInfo
                formData={formData}
                gradeLevels={gradeLevels}
                step={step}
                agreed={agreed}
                onAgreeChange={setAgreed}
                onStudentChange={handleStudentChange}
                onParentChange={handleParentChange}
                onGuardianChange={handleGuardianChange}
                onAddStudent={handleAddStudent}
                onRemoveStudent={handleRemoveStudent}
                onSameAddress={handleSameAddress}
                onSameParentInfo={handleSameParentInformation}
                onCancelSameAddress={handleCancelSameAddress}
                onCancelSameParentInfo={handleCancelSameParentInformation}
                sameAddressLocks={sameAddressLocks}
                sameParentLocks={sameParentLocks}
                onPaymentOptionsLoaded={handlePaymentOptionsLoaded}
              />
            </div>

            <div className="flex flex-col gap-2.5 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                disabled={step === 1}
                className="w-full rounded-md bg-[#f5f4f2] px-6 py-2.5 text-sm font-[PoppinsBold] uppercase text-neutral-500 shadow-sm transition hover:bg-neutral-200 disabled:opacity-50 sm:w-auto"
              >
                Prev
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={
                  (step === 1 && !formData.students?.[0]?.grade_level_id) ||
                  (step === 2 && !agreed)
                }
                className="w-full rounded-md bg-parent-green px-6 py-2.5 text-sm font-[PoppinsBold] uppercase text-white shadow-sm transition hover:bg-parent-accent disabled:cursor-not-allowed disabled:opacity-45 sm:w-auto"
              >
                {step === 1 ? "Next" : "Review"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <ReviewFormModal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        onSubmit={handleSubmit}
        data={formData}
        gradeLevels={gradeLevels}
        paymentOptionsMap={paymentOptionsMap}
      />

      <LeaveFormModal
        isOpen={blocker.state === "blocked"}
        onStay={() => blocker.reset?.()}
        onLeave={() => blocker.proceed?.()}
      />

      {isSubmitting && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/40 px-4">
          <div className="flex w-full max-w-70 flex-col items-center gap-4 rounded-xl bg-bone p-6 shadow-xl">
            <Loader2 size={32} className="animate-spin text-parent-green" />

            <div className="text-center">
              <p className="text-sm font-[PoppinsBold] text-neutral-700">
                Submitting Application
              </p>

              <p className="mt-1 text-xs text-neutral-500">
                Please wait while we process your application.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FormPage;
