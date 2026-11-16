import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { getSchoolInformation } from "../../requests/settingsRequests.js";

const DEFAULT_EMAIL = "grace.cslife@gmail.com";

const ParentInquiryModal = ({ isOpen, onClose }) => {
  const [schoolEmail, setSchoolEmail] = useState(DEFAULT_EMAIL);
  const [form, setForm] = useState({ name: "", email: "", question: "" });
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return undefined;

    let isMounted = true;

    const loadSchoolEmail = async () => {
      try {
        const response = await getSchoolInformation();
        const schoolInformation = response?.data ?? response;

        if (isMounted && schoolInformation?.school_email) {
          setSchoolEmail(schoolInformation.school_email);
        }
      } catch (error) {
        console.error("Failed to load school email:", error);
      }
    };

    loadSchoolEmail();

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    setStatus("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const subject = `Parent inquiry from ${form.name.trim()}`;
    const body = [
      `Name: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      "",
      "Question or inquiry:",
      form.question.trim(),
    ].join("\n");

    window.location.href = `mailto:${schoolEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus(
      "Your email app should open with your inquiry. Send the message there to complete your submission.",
    );
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-black/70 px-4 py-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="parent-inquiry-title"
        className="my-auto w-full max-w-lg rounded-2xl bg-bone p-5 text-egg-dark shadow-2xl sm:p-8"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="font-[PoppinsBold] text-xs uppercase tracking-[0.2em] text-swamp-green">
              We’re here to help
            </p>
            <h2
              id="parent-inquiry-title"
              className="mt-1 font-[PoppinsBold] text-xl text-parent-green sm:text-2xl"
            >
              Ask Us a Question
            </h2>
            <p className="mt-2 text-sm text-parent-green/70">
              Send us your question or concern and our team will be in touch.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close inquiry form"
            className="rounded-full p-2 text-parent-green/60 transition-colors hover:bg-parent-green/10 hover:text-parent-green"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="parent-inquiry-name"
              className="mb-1.5 block text-sm font-[PoppinsBold]"
            >
              Name
            </label>
            <input
              id="parent-inquiry-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={form.name}
              onChange={updateField}
              className="w-full rounded-lg border border-parent-green/20 bg-white px-3 py-2.5 text-sm focus:border-parent-green/50 focus:ring-parent-green"
            />
          </div>

          <div>
            <label
              htmlFor="parent-inquiry-email"
              className="mb-1.5 block text-sm font-[PoppinsBold]"
            >
              Email address
            </label>
            <input
              id="parent-inquiry-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={updateField}
              className="w-full rounded-lg border border-parent-green/20 bg-white px-3 py-2.5 text-sm focus:border-parent-green/50 focus:ring-parent-green"
            />
          </div>

          <div>
            <label
              htmlFor="parent-inquiry-question"
              className="mb-1.5 block text-sm font-[PoppinsBold]"
            >
              Question or inquiry
            </label>
            <textarea
              id="parent-inquiry-question"
              name="question"
              rows="5"
              required
              value={form.question}
              onChange={updateField}
              className="w-full resize-y rounded-lg border border-parent-green/20 bg-white px-3 py-2.5 text-sm focus:border-parent-green/50 focus:ring-parent-green"
            />
          </div>

          {status && (
            <p role="status" className="text-sm text-swamp-green">
              {status}
            </p>
          )}

          <div className="mt-1 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-parent-green/25 px-5 py-2.5 text-sm font-[PoppinsBold] text-parent-green transition-colors hover:bg-parent-green/5"
            >
              Close
            </button>
            <button
              type="submit"
              className="rounded-full bg-parent-green px-5 py-2.5 text-sm font-[PoppinsBold] text-white transition-colors hover:bg-parent-green/90"
            >
              Send Inquiry
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default ParentInquiryModal;
