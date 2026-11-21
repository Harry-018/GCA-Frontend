import { useEffect, useRef, useState } from "react";

const TERMS_SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    paragraphs: [
      "These Terms and Conditions govern the use of the School's online enrollment form (the Form) by parents and/or legal guardians (the Parent) for the enrollment of their child or children (the Student). By completing the Form and clicking the I Agree button, the Parent confirms that they have read, understood, and voluntarily accepted these Terms.",
      "These Terms apply to the information submitted through this Form and to the enrollment process described below. Admission, grade-level placement, and continued enrollment remain subject to the School's policies and the applicable rules of the Department of Education.",
      "If the Parent does not agree with any part of these Terms, the application should not be submitted. Questions may be raised with the School's admissions or registrar's office before submitting.",
    ],
  },
  {
    title: "2. Enrollment Procedures",
    paragraphs: [
      "The Form is the means for submitting an application for enrollment or re-enrollment for the incoming school year. The Parent should accomplish the Form completely and accurately for each child to be enrolled.",
    ],
    items: [
      "Select the applicable grade level and payment option for each Student. Available payment options depend on the selected grade level.",
      "Provide the Student's personal, birth, address, and other required details.",
      "Provide the details of the Father, Mother, and Guardian, including valid contact numbers and email addresses.",
      "Review all entries using the Review Application screen before submitting. The application is not transmitted until the Parent clicks Submit.",
      "Submit the application and keep the confirmation or reference information shown after submission for follow-up.",
    ],
    footerParagraphs: [
      "Applications are subject to verification by the School. The School may request additional documents such as birth certificates, report cards, certificates of good moral character, proof of address, or other records required for enrollment.",
      "Submission of the Form does not automatically guarantee admission or a specific grade level, section, or payment plan. The School will communicate the outcome of the application through the contact information provided.",
      "Information saved as a draft on this device is not a submitted application. The Parent is responsible for completing and submitting the Form before the deadline announced by the School.",
    ],
  },
  {
    title: "3. Student Information",
    paragraphs: [
      "The Parent declares that all information entered about the Student, including name, gender, date and place of birth, nationality, religion, address, grade level, and disability or special-needs information if any, is true, complete, and correct to the best of their knowledge.",
      "Names should be entered exactly as they appear in the Student's official documents. Discrepancies between the Form and official records may delay processing or require correction.",
      "Where the Student has a disability or special need, the Parent should indicate this and provide the requested description so the School can make appropriate accommodations and referrals. This information is used only to support the Student.",
      "If any detail changes after submission, the Parent must inform the School promptly and provide the necessary supporting documents. The School will not be responsible for errors or delays arising from inaccurate or outdated information supplied by the Parent.",
      "Each child must have a separate set of student information in the Form, even when the children share the same address, parents, or guardian, so that each application remains clear and distinguishable.",
    ],
  },
  {
    title: "4. Parent and Guardian Responsibilities",
    paragraphs: [
      "The Parent is responsible for supervising the completion of the Form, for supplying truthful information, and for ensuring that any information submitted on behalf of a Student is authorized.",
    ],
    items: [
      "Monitor communications from the School and respond promptly to requests for documents, verification, or clarification.",
      "Keep contact numbers, email addresses, and home addresses current throughout the school year.",
      "Settle enrollment fees, tuition, and other school obligations in accordance with the selected payment option and the School's schedules.",
      "Ensure the Student's regular attendance, punctuality, and compliance with the School's rules, policies, and code of conduct.",
      "Safeguard any account credentials issued by the School and use them only for authorized purposes.",
    ],
    footerParagraphs: [
      "The Parent agrees to cooperate with the School in matters relating to the Student's welfare, safety, education, and participation in school activities.",
      "The School may decline or defer an application, or take appropriate action under its policies, if material information is withheld, falsified, or misrepresented.",
    ],
  },
  {
    title: "5. Data Collection",
    paragraphs: [
      "To process the application, the Form collects personal information about the Student, the Father, the Mother, and the Guardian. This includes names, contact numbers, email addresses, occupations, dates and places of birth, gender, religion, nationality, home address, grade level, payment option, and any disability-related information the Parent chooses to provide.",
      "The information is collected directly from the Parent through the Form. Some details, such as available grade levels and payment options, are retrieved from the School's records to show the correct choices during enrollment.",
      "The information is used for enrollment processing, student records, communication with the family, billing and payment administration, student support services, and compliance with reporting requirements of the Department of Education and other applicable authorities.",
      "The School does not sell personal information collected through the Form. Information may be shared only with authorized school personnel and service providers who need it to perform enrollment, records, or payment functions, and when required by law or school policy.",
    ],
  },
  {
    title: "6. Data Privacy and Security",
    paragraphs: [
      "The School handles personal information in accordance with its data privacy policy and applicable data protection laws, including the Data Privacy Act. Personal information is processed only for the purposes stated in these Terms and is limited to what is necessary for those purposes.",
      "Access to submitted information is restricted to authorized personnel. Reasonable administrative and technical safeguards are used to protect the information against unauthorized access, loss, misuse, or disclosure.",
      "Personal information is retained only as long as needed for enrollment, school records, legal, and regulatory requirements, after which it is archived or disposed of in accordance with the School's records policy.",
      "The Parent may request access to, correction of, or updates to personal information held by the School by contacting the School's registrar or data privacy officer. Requests are subject to verification and to any limitations provided by law.",
      "Where consent is required for a specific processing activity, the Parent may withdraw such consent by written notice, subject to the School's legal and operational obligations. Withdrawal does not affect processing already carried out before the withdrawal.",
      "Draft information entered into the Form is stored locally on this device until the application is submitted. Clearing browser data or using another device will remove access to that draft.",
    ],
  },
  {
    title: "7. Acknowledgment and Consent",
    paragraphs: [
      "By clicking the I Agree button, the Parent: (a) confirms that they have read and understood these Terms and Conditions in full; (b) consents to the collection, use, processing, and storage of the information described above for enrollment and school purposes; (c) agrees to the responsibilities stated in these Terms; and (d) confirms that the information provided is true and correct.",
      "The Parent acknowledges that clicking I Agree is the only action that records acceptance of these Terms. Opening this notice, scrolling through it, or ticking the checkbox without clicking I Agree does not constitute agreement.",
      "These Terms take effect upon acceptance and remain in force for the duration of the Student's enrollment and any related school processes.",
    ],
  },
];

const isAtBottom = (element) => {
  if (!element) return false;

  const remaining =
    element.scrollHeight - element.clientHeight - element.scrollTop;

  return remaining <= 8;
};

const TermsAndConditionsModal = ({ onClose, onAgree }) => {
  const [hasReachedBottom, setHasReachedBottom] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const content = contentRef.current;

    if (content) {
      content.scrollTop = 0;
    }

    const frame = requestAnimationFrame(() => {
      if (isAtBottom(content)) {
        setHasReachedBottom(true);
      }
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (hasReachedBottom) return;

    const content = contentRef.current;

    if (!content || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(() => {
      if (isAtBottom(content)) {
        setHasReachedBottom(true);
      }
    });

    observer.observe(content);

    return () => observer.disconnect();
  }, [hasReachedBottom]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 px-3 py-4 font-[Poppins] sm:px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="terms-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose?.();
        }
      }}
    >
      <div className="flex max-h-[calc(100dvh-2rem)] w-full max-w-200 flex-col overflow-hidden rounded-xl bg-[#f2f4fd] shadow-xl">
        <div className="flex items-start justify-between gap-3 border-b border-[#d6d9e2] px-4 py-3 sm:px-6 sm:py-4">
          <div>
            <h2
              id="terms-title"
              className="text-sm font-[PoppinsBold] uppercase tracking-wide text-parent-green sm:text-base"
            >
              Terms and Conditions
            </h2>

            <p className="mt-0.5 text-2xs text-neutral-500 sm:text-xs">
              Enrollment and Data Privacy Agreement
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close terms and conditions"
            className="-m-1 px-2 py-1.5 text-lg leading-none text-neutral-500 hover:text-neutral-800"
          >
            &times;
          </button>
        </div>

        <div
          ref={contentRef}
          onScroll={() => {
            if (isAtBottom(contentRef.current)) {
              setHasReachedBottom(true);
            }
          }}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6"
        >
          {TERMS_SECTIONS.map((section) => (
            <section key={section.title} className="mb-6 last:mb-0">
              <h3 className="mb-2 text-xs font-[PoppinsBold] uppercase tracking-wide text-parent-green sm:text-sm">
                {section.title}
              </h3>

              {section.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="mb-2 text-xs leading-relaxed text-neutral-600 sm:text-sm"
                >
                  {paragraph}
                </p>
              ))}

              {section.items && (
                <ul className="mb-2 list-disc space-y-1 pl-5 text-xs leading-relaxed text-neutral-600 sm:text-sm">
                  {section.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}

              {section.footerParagraphs?.map((paragraph, index) => (
                <p
                  key={index}
                  className="mb-2 text-xs leading-relaxed text-neutral-600 sm:text-sm"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          <p className="border-t border-[#d6d9e2] pt-4 text-2xs font-[PoppinsBold] uppercase text-parent-green sm:text-xs">
            End of Terms and Conditions
          </p>
        </div>

        <div className="flex flex-col gap-2 border-t border-[#d6d9e2] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-2xs text-neutral-500 sm:text-xs">
            {hasReachedBottom
              ? "You have reached the end of the terms."
              : "Scroll to the bottom to enable the I Agree button."}
          </p>

          <button
            type="button"
            disabled={!hasReachedBottom}
            onClick={onAgree}
            className="w-full rounded-md bg-parent-green px-6 py-2.5 text-sm font-[PoppinsBold] uppercase text-white shadow-sm transition hover:bg-parent-accent disabled:cursor-not-allowed disabled:opacity-45 sm:w-auto"
          >
            I Agree
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsModal;
