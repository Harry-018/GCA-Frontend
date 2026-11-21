import { useEffect } from "react";

const LeaveFormModal = ({ isOpen, onStay, onLeave }) => {
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onStay?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onStay]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-70 flex items-center justify-center bg-black/40 px-4 py-5 font-[Poppins] backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="leave-form-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onStay?.();
        }
      }}
    >
      <div className="w-full max-w-md rounded-xl bg-[#f2f4fd] p-5 shadow-xl sm:p-6">
        <h2
          id="leave-form-title"
          className="text-sm font-[PoppinsBold] uppercase tracking-wide text-parent-green sm:text-base"
        >
          Leave Enrollment Form?
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-neutral-600">
          Are you sure you want to leave the Enrollment Form?
        </p>

        <p className="mt-2 text-xs text-neutral-500">
          Your entries are saved as a draft on this device, but you will need to
          return to finish the application.
        </p>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onStay}
            className="w-full rounded-md bg-bone px-5 py-2.5 text-xs font-[PoppinsBold] uppercase text-neutral-600 shadow-sm transition hover:bg-neutral-200 sm:w-auto"
          >
            Stay on Form
          </button>

          <button
            type="button"
            onClick={onLeave}
            className="w-full rounded-md bg-parent-green px-5 py-2.5 text-xs font-[PoppinsBold] uppercase text-white shadow-sm transition hover:bg-parent-accent sm:w-auto"
          >
            Leave Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaveFormModal;
