import { useEffect, useState } from "react";

import InfoSection from "./InfoSection";
import PaymentOptionSelectCard from "./PaymentOptionSelectCard";
import { getPaymentOptionsInGradeLevel } from "../../../loaders/services/preEnrollmentService";
import { getTuition } from "../../../requests/tuitionRequests";

const PaymentOptionSection = ({
  student,
  index,
  totalStudents,
  onChange,
  onOptionsLoaded,
}) => {
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;

    const loadFallbackOptions = async (gradeLevelId) => {
      const response = await getPaymentOptionsInGradeLevel(gradeLevelId);

      return response.data.data || [];
    };

    const loadPaymentOptions = async () => {
      if (!student.grade_level_id) {
        setPaymentOptions([]);
        setLoading(false);
        setError("");
        onOptionsLoaded?.(student.grade_level_id, []);
        return;
      }

      setLoading(true);
      setError("");

      try {
        let options = [];

        try {
          const result = await getTuition(student.grade_level_id);

          options = Array.isArray(result) ? result : [];
        } catch (tuitionError) {
          console.error("Failed to load tuition options:", tuitionError);
        }

        if (options.length === 0) {
          options = await loadFallbackOptions(student.grade_level_id);
        }

        if (!isActive) return;

        setPaymentOptions(options);
        onOptionsLoaded?.(student.grade_level_id, options);
      } catch (loadError) {
        if (!isActive) return;

        console.error("Failed to load payment options:", loadError);

        setPaymentOptions([]);
        setError("Unable to load payment options for this grade level.");
        onOptionsLoaded?.(student.grade_level_id, []);
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadPaymentOptions();

    return () => {
      isActive = false;
    };
  }, [student.grade_level_id, onOptionsLoaded]);

  const studentLabel = totalStudents > 1 ? ` - Student ${index + 1}` : "";

  return (
    <InfoSection title={`Payment Option${studentLabel}`}>
      <div className="sm:col-span-2 md:col-span-3 lg:col-span-4">
        {!student.grade_level_id ? (
          <p className="text-xs text-neutral-500">
            Select a grade level first to view payment options.
          </p>
        ) : loading ? (
          <p className="text-xs text-neutral-500">Loading payment options...</p>
        ) : error ? (
          <p className="text-xs text-red-500">{error}</p>
        ) : paymentOptions.length === 0 ? (
          <p className="text-xs text-neutral-500">
            No payment options are available for this grade level.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {paymentOptions.map((option) => {
              const optionId = option.gradelevel_paymentoption_id;

              return (
                <PaymentOptionSelectCard
                  key={optionId}
                  option={option}
                  gender={student.s_gender}
                  selected={
                    String(student.gradelevel_paymentoption_id || "") ===
                    String(optionId || "")
                  }
                  onSelect={() =>
                    onChange?.(index, "gradelevel_paymentoption_id", optionId)
                  }
                />
              );
            })}
          </div>
        )}
      </div>
    </InfoSection>
  );
};

export default PaymentOptionSection;
