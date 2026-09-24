import { useState, useEffect } from "react";

import { useNavigate, useLoaderData } from "react-router-dom";
import { applyApplication } from "../requests/preEnrollmentRequests";
import LoginHeader from "../Components/LoginHeader";
import Footer from "../Components/Footer";
import StudentInfo from "../Components/LandingpageComponents/Form/StudentInfo";
import ReviewFormModal from "../Components/LandingpageComponents/Form/ReviewFormModal";
import { Loader2 } from "lucide-react";

const STORAGE_KEY = "studentApplication";

const INITIAL_DATA = {
  province: "",
  city_municipality: "",
  barangay: "",
  house_no: "",
  zipcode: "",

  s_first_name: "",
  s_last_name: "",
  s_mid_name: "",
  s_gender: "",
  s_bdate: "",
  s_birthplace: "",
  s_religion: "",
  s_nationality: "",
  s_disabled: "",
  s_disability: "",

  grade_level_id: "",
  gradelevel_paymentoption_id: "",

  parents: [
    {
      p_first_name: "",
      p_last_name: "",
      p_middle_name: "",
      p_contact_number: "",
      p_occupation: "",
      p_email: "",
      relationship_type: "Father",
      will_receive_account: false,
    },
    {
      p_first_name: "",
      p_last_name: "",
      p_middle_name: "",
      p_contact_number: "",
      p_occupation: "",
      p_email: "",
      relationship_type: "Mother",
      will_receive_account: false,
    },
    {
      p_first_name: "",
      p_last_name: "",
      p_middle_name: "",
      p_contact_number: "",
      p_occupation: "",
      p_email: "",
      relationship_type: "",
      will_receive_account: false,
    },
  ],
};

const applyVerifiedParent = (data) => {
  const verifiedEmail = localStorage.getItem("verified_email");
  const accountParent = localStorage.getItem("account_parent_relationship");

  if (!verifiedEmail || !accountParent) {
    return data;
  }

  const accountParentIndex = {
    Father: 0,
    Mother: 1,
    Guardian: 2,
  };

  const accountParentIndexValue = accountParentIndex[accountParent];

  return {
    ...data,
    parents: data.parents.map((parent, index) => {
      const isAccountParent = index === accountParentIndexValue;

      return {
        ...parent,
        p_email: isAccountParent ? verifiedEmail : parent.p_email,
        will_receive_account: isAccountParent,
      };
    }),
  };
};

function FormPage() {
  const loadedGradeLevels = useLoaderData();

  const gradeLevels = Array.isArray(loadedGradeLevels) ? loadedGradeLevels : [];

  const [paymentOptions, setPaymentOptions] = useState([]);

  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      const data = saved
        ? { ...INITIAL_DATA, ...JSON.parse(saved) }
        : INITIAL_DATA;

      return applyVerifiedParent(data);
    } catch {
      return INITIAL_DATA;
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch (error) {
      console.error("Failed to save draft:", error);
    }
  }, [formData]);

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: typeof value === "function" ? value(prev[key]) : value,
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const verification_id = localStorage.getItem("verification_id");

      const submissionData = {
        ...formData,
        verification_id,
      };

      await applyApplication(submissionData);

      localStorage.removeItem("studentApplication");
      localStorage.removeItem("verification_id");
      localStorage.removeItem("verified_email");
      localStorage.removeItem("account_parent_relationship");

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

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
      return;
    }

    const guardian = formData.parents[2];

    if (guardian.will_receive_account) {
      if (
        !guardian.relationship_type ||
        !guardian.p_first_name ||
        !guardian.p_last_name ||
        !guardian.p_contact_number ||
        !guardian.p_email
      ) {
        alert(
          "Please complete the Guardian information because the Guardian will receive the account.",
        );
        return;
      }
    }

    if (!agreed) {
      return;
    }

    setIsReviewOpen(true);
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <LoginHeader />

      <div className="flex w-full flex-1 flex-col overflow-x-hidden">
        <div className="flex w-full flex-1 flex-col bg-[#eeece8] px-3 py-4 sm:px-8 sm:py-8">
          <div className="mx-auto w-full max-w-6xl">
            <div className="flex items-center gap-3">
              <div
                className={`h-0.5 flex-1 ${step === 1 ? "bg-swamp-green" : "bg-[#b7b7b4]"}`}
              />
              <div
                className={`h-0.5 flex-1 ${step === 2 ? "bg-swamp-green" : "bg-[#b7b7b4]"}`}
              />
            </div>

            <div className="rounded-xl bg-transparent pt-5 sm:pt-7">
              <StudentInfo
                formData={formData}
                gradeLevels={gradeLevels}
                paymentOptions={paymentOptions}
                setPaymentOptions={setPaymentOptions}
                step={step}
                agreed={agreed}
                onAgreeChange={setAgreed}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-2.5 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                disabled={step === 1}
                className="w-full rounded-md bg-[#f5f4f2] px-6 py-2.5 text-sm font-semibold uppercase text-neutral-500 shadow-sm transition hover:bg-neutral-200 disabled:opacity-50 sm:w-auto"
              >
                Prev
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={
                  (step === 1 && !formData.grade_level_id) ||
                  (step === 2 && !agreed)
                }
                className="w-full rounded-md bg-swamp-green px-6 py-2.5 text-sm font-semibold uppercase text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-45 sm:w-auto"
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
        paymentOptions={paymentOptions}
      />

      {isSubmitting && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/40">
          <div className="flex w-70 flex-col items-center gap-4 rounded-xl bg-white p-6 shadow-xl">
            <Loader2 size={32} className="animate-spin text-swamp-green" />

            <div className="text-center">
              <p className="text-sm font-semibold text-neutral-700">
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
