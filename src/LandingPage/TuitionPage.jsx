
import React, { useState } from 'react'
import TuitionBanner from '../Components/LandingpageComponents/Tuition/TuitionBanner'
import TuitionFees from '../Components/LandingpageComponents/Tuition/TuitionFees'
import LoginHeader from '../Components/LoginHeader'
import HomeSidebar from '../Components/HomeSidebar'
import Footer from '../Components/Footer'

const TUITION_DATA = {
  Nursery: {
    tuition: "₱12,000",
    books: "₱4,000",
    boysUniform: "₱1,000",
    boysPE: "₱1,200",
    girlsUniform: "₱800",
    girlsPE: "₱1,000",
    subtotal: "₱18,200 - ₱18,300",
  },
  "Pre-Kinder": {
    tuition: "₱13,000",
    books: "₱4,000",
    boysUniform: "₱1,000",
    boysPE: "₱1,200",
    girlsUniform: "₱800",
    girlsPE: "₱1,000",
    subtotal: "₱19,200 - ₱19,300",
  },
  Kinder: {
    tuition: "₱14,000",
    books: "₱4,000",
    boysUniform: "₱1,000",
    boysPE: "₱1,200",
    girlsUniform: "₱800",
    girlsPE: "₱1,000",
    subtotal: "₱20,200 - ₱20,300",
  },
};

const BANNER_PROPS = {
  title: "TUITION FEES",
  description:
    "The tuition fees listed above represent the basic breakdown only. Actual costs may vary per student depending on any additional services or miscellaneous fees applied during enrollment.",
  backgroundImage: "/image/t1.webp",
};

const TuitionPage = () => {
  const [tuitionData] = useState(null);
  const [activeLevel, setActiveLevel] = useState("Nursery");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const feeData = tuitionData || TUITION_DATA[activeLevel];

  const paymentOptions = [
    {
      title: "FULL CASH",
      discount: "₱1,500.00",
      total: feeData.subtotal,
      installment: "No Installment",
      dueDate: "One Time Payment",
    },
    {
      title: "PAY LITE",
      discount: "₱1,500.00",
      total: "₱17,200 - ₱17,300",
      installment: "₱1,100.00",
      dueDate: "Every 10th of the month (June '26 - March '27)",
    },
    {
      title: "ALL IN",
      discount: "No Discount",
      total: feeData.subtotal,
      installment: "₱1,800",
      dueDate: "Every 10th of the month (June '26 - March '27)",
    },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col">
      <LoginHeader
        onMenuToggle={() => setSidebarOpen(true)}
      />

      <HomeSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex w-full flex-1 flex-col overflow-x-hidden">
        <div className="flex w-full flex-1 flex-col bg-egg px-3 pt-4 pb-10 font-[Poppins] text-egg-dark sm:px-5 sm:pt-6 sm:pb-12 lg:px-6 lg:pt-7 lg:pb-14">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 sm:gap-10">
            <TuitionBanner
              title={BANNER_PROPS.title}
              description={BANNER_PROPS.description}
              backgroundImage={BANNER_PROPS.backgroundImage}
            />

            <TuitionFees
              tuitionData={TUITION_DATA}
              activeLevel={activeLevel}
              onActiveLevelChange={setActiveLevel}
              data={feeData}
              paymentOptions={paymentOptions}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TuitionPage;