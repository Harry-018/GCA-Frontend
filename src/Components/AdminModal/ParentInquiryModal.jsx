import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { createInquiry } from "../../requests/guestInquiryRequest.js";

const ParentInquiryModal = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({ name: "", email: "", question: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const updateField = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const inquiry = {
      name: form.name.trim(),
      email: form.email.trim(),
      question: form.question.trim(),
    };

    if (!inquiry.name || !inquiry.email || !inquiry.question) {
      setError("Please complete all fields before submitting.");
      return;
    }

    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const response = await createInquiry(inquiry);

      setSuccess(
        response?.message || "Your inquiry has been submitted successfully.",
      );
      setForm({ name: "", email: "", question: "" });
    } catch (submitError) {
      setError(
        submitError.response?.data?.message ||
          "Unable to submit your inquiry. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto overscroll-contain bg-black/70 px-3 py-4 sm:px-4 sm:py-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="parent-inquiry-title"
        className="my-auto max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto overscroll-contain rounded-2xl bg-bone p-4 text-egg-dark shadow-2xl sm:max-h-[calc(100dvh-3rem)] sm:p-8"
      >
        <div className="mb-4 flex items-start justify-between gap-4 sm:mb-6">
          <div>
            <p className="font-[Poppins] text-xs uppercase tracking-[0.2em] text-gray-500 sm:text-sm">
              We’re here to help
            </p>
            <h2
              id="parent-inquiry-title"
              className="mt-1 font-[Poppins] text-xl text-parent-green sm:text-2xl"
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
              className="mb-1.5 block text-sm font-[Poppins]"
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
              className="w-full rounded-lg border uppercase border-parent-green/20 bg-white px-3 py-2.5 text-sm focus:border-parent-green/50 focus:ring-parent-green"
            />
          </div>

          <div>
            <label
              htmlFor="parent-inquiry-email"
              className="mb-1.5 block text-sm font-[Poppins]"
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
              className="mb-1.5 block text-sm font-[Poppins]"
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

          {error && (
            <p role="alert" className="text-sm text-reject">
              {error}
            </p>
          )}
          {success && (
            <p role="status" className="text-sm text-swamp-green">
              {success}
            </p>
          )}

          <div className="mt-1 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-parent-green/25 px-5 py-2.5 text-sm font-[Poppins] text-parent-green transition-colors hover:bg-parent-green/5"
            >
              Close
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-parent-green px-5 py-2.5 text-sm font-[Poppins] text-white transition-colors hover:bg-parent-green/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Sending..." : "Send Inquiry"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default ParentInquiryModal;
