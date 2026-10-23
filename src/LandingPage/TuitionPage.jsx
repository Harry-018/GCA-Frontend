import React, { useState, useEffect } from "react";

import TuitionBanner from "../Components/LandingpageComponents/Tuition/TuitionBanner";
import TuitionFees from "../Components/LandingpageComponents/Tuition/TuitionFees";
import LoginHeader from "../Components/LoginHeader";
import Footer from "../Components/Footer";

import {
  getTuition,
  getTuitionGradeLevels,
} from "../requests/tuitionRequests.js";

const BANNER_PROPS = {
  title: "TUITION FEES",
  description:
    "The tuition fees listed above represent the basic breakdown only. Actual costs may vary per student depending on any additional services or miscellaneous fees applied during enrollment.",
  backgroundImage: "/image/t1.webp",
};

const TuitionPage = () => {
  const [gradeLevels, setGradeLevels] = useState([]);
  const [activeLevel, setActiveLevel] = useState("");
  const [tuitionData, setTuitionData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load configured grade levels from the backend.
  useEffect(() => {
    let cancelled = false;

    const loadGradeLevels = async () => {
      try {
        setLoading(true);

        const result = await getTuitionGradeLevels();
        const levels = Array.isArray(result) ? result : [];

        if (!cancelled) {
          setGradeLevels(levels);

          setActiveLevel((current) => {
            const currentExists = levels.some(
              (grade) => grade.grade_level_name === current,
            );

            if (currentExists) return current;

            return levels[0]?.grade_level_name ?? "";
          });
        }
      } catch (error) {
        console.error("Failed to load tuition grade levels:", error);

        if (!cancelled) {
          setGradeLevels([]);
          setActiveLevel("");
          setTuitionData([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadGradeLevels();

    return () => {
      cancelled = true;
    };
  }, []);

  // Load tuition information whenever the selected grade level changes.
  useEffect(() => {
    const selectedGrade = gradeLevels.find(
      (grade) => grade.grade_level_name === activeLevel,
    );

    if (!selectedGrade) {
      setTuitionData([]);
      return;
    }

    let cancelled = false;

    const loadTuition = async () => {
      try {
        setLoading(true);

        const result = await getTuition(selectedGrade.grade_level_id);

        if (!cancelled) {
          setTuitionData(Array.isArray(result) ? result : []);
        }
      } catch (error) {
        console.error("Failed to load tuition information:", error);

        if (!cancelled) {
          setTuitionData([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadTuition();

    return () => {
      cancelled = true;
    };
  }, [activeLevel, gradeLevels]);

  const data = tuitionData[0];

  const formatCurrency = (amount) =>
    `₱${Number(amount || 0).toLocaleString("en-PH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const subtotalBoys = data
    ? Number(data.tuition_fee || 0) +
      Number(data.books || 0) +
      Number(data.uniform_boys || 0) +
      Number(data.pe_uniform_boys || 0)
    : 0;

  const subtotalGirls = data
    ? Number(data.tuition_fee || 0) +
      Number(data.books || 0) +
      Number(data.uniform_girls || 0) +
      Number(data.pe_uniform_girls || 0)
    : 0;

  // Adapt backend fee fields to the existing TuitionFees component.
  const feeData = data
    ? {
        tuition: formatCurrency(data.tuition_fee),
        books: formatCurrency(data.books),
        boysUniform: formatCurrency(data.uniform_boys),
        boysPE: formatCurrency(data.pe_uniform_boys),
        girlsUniform: formatCurrency(data.uniform_girls),
        girlsPE: formatCurrency(data.pe_uniform_girls),
        subtotal: `${formatCurrency(subtotalBoys)} - ${formatCurrency(subtotalGirls)}`,
      }
    : {
        tuition: formatCurrency(0),
        books: formatCurrency(0),
        boysUniform: formatCurrency(0),
        boysPE: formatCurrency(0),
        girlsUniform: formatCurrency(0),
        girlsPE: formatCurrency(0),
        subtotal: `${formatCurrency(0)} - ${formatCurrency(0)}`,
      };

  // Convert the backend payment options to the existing component format.
  const paymentOptions = tuitionData.map((option) => {
    const discount = Number(option.discount || 0);

    return {
      ...option,
      title: option.option_name,
      discount: discount > 0 ? formatCurrency(discount) : "No Discount",
      total: `${formatCurrency(Math.max(0, subtotalBoys - discount))} - ${formatCurrency(Math.max(0, subtotalGirls - discount))}`,
      installment:
        Number(option.installment || 0) > 0
          ? formatCurrency(option.installment)
          : "No Installment",
      dueDate: option.due_date_display || "Not specified",
    };
  });

  // Preserve the grade-level tabs expected by the existing component.
  const tuitionLevelOptions = Object.fromEntries(
    gradeLevels.map((grade) => [grade.grade_level_name, {}]),
  );

  return (
    <div className="flex min-h-screen w-full flex-col">
      <LoginHeader />

      <div className="flex w-full flex-col overflow-x-hidden">
        <div className="flex w-full flex-1 flex-col bg-egg px-3 pt-4 pb-10 font-[Poppins] text-egg-dark sm:px-5 sm:pt-6 sm:pb-12 lg:px-6 lg:pt-7 lg:pb-14">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 sm:gap-10">
            <TuitionBanner
              title={BANNER_PROPS.title}
              description={BANNER_PROPS.description}
              backgroundImage={BANNER_PROPS.backgroundImage}
            />

            {loading && !data ? (
              <p className="py-6 text-center font-[Poppins] text-sm text-egg-dark">
                Loading tuition information...
              </p>
            ) : (
              <TuitionFees
                tuitionData={tuitionLevelOptions}
                activeLevel={activeLevel}
                onActiveLevelChange={setActiveLevel}
                data={feeData}
                paymentOptions={paymentOptions}
              />
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TuitionPage;
