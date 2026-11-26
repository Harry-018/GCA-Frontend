import { Suspense, useState } from "react";
import { Await, useLoaderData } from "react-router-dom";

import TuitionBanner from "../Components/LandingpageComponents/Tuition/TuitionBanner";
import TuitionFees from "../Components/LandingpageComponents/Tuition/TuitionFees";
import LoginHeader from "../Components/LoginHeader";
import Footer from "../Components/Footer";
import HomeSidebar from "../Components/HomeSidebar.jsx";
import { TuitionContentSkeleton } from "../Components/LandingpageComponents/LandingPageSkeletons.jsx";

const BANNER_PROPS = {
  title: "TUITION FEES",
  description:
    "The tuition fees listed above represent the basic breakdown of the school's standard charges for each grade level. However, the total amount may vary depending on the student's selected payment option, additional services, and other applicable miscellaneous fees during enrollment. Parents and guardians are encouraged to review the complete assessment of fees provided by the school administration to ensure they are fully informed of the total amount payable. For further clarification regarding tuition costs, payment arrangements, or additional charges, please feel free to contact the school office for assistance.",
  backgroundImage: "/image/money.webp",
};

const formatCurrency = (amount) =>
  `₱${Number(amount || 0).toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const TuitionContent = ({
  tuitionData,
  gradeLevels,
  activeLevel,
  onLevelChange,
}) => {
  const data = tuitionData[0];

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
  const paymentOptions = tuitionData.map((option, index) => {
    const discount = Number(option.discount || 0);

    return {
      ...option,
      title: `Payment Option ${index + 1}: ${option.option_name}`,
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
    <TuitionFees
      tuitionData={tuitionLevelOptions}
      activeLevel={activeLevel}
      onActiveLevelChange={onLevelChange}
      data={feeData}
      paymentOptions={paymentOptions}
    />
  );
};

const TuitionPage = () => {
  const { gradeLevels, tuitionByLevel } = useLoaderData();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeLevel, setActiveLevel] = useState(
    gradeLevels[0]?.grade_level_name ?? "",
  );

  return (
    <div className="flex min-h-dvh w-full flex-col">
      <LoginHeader onMenuToggle={() => setSidebarOpen(true)} />

      <HomeSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex w-full flex-1 flex-col overflow-x-hidden">
        <div className="flex w-full flex-1 flex-col bg-egg px-3 pt-3 pb-10 font-[Poppins] text-egg-dark sm:px-5 sm:pb-12 lg:px-6 lg:pb-14">
          <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 sm:gap-10">
            <TuitionBanner
              title={BANNER_PROPS.title}
              description={BANNER_PROPS.description}
              backgroundImage={BANNER_PROPS.backgroundImage}
            />

            <Suspense fallback={<TuitionContentSkeleton />}>
              <Await resolve={tuitionByLevel}>
                {(dataByLevel) => (
                  <TuitionContent
                    tuitionData={dataByLevel?.[activeLevel] ?? []}
                    gradeLevels={gradeLevels}
                    activeLevel={activeLevel}
                    onLevelChange={setActiveLevel}
                  />
                )}
              </Await>
            </Suspense>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TuitionPage;
