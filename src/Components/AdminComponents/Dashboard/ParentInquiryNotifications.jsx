import { Check, ChevronLeft, MessageCircle, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { useParentInquiry } from "../../ParentInquiryProvider.jsx";

const MAX_VISIBLE_INQUIRIES = 5;

const formatSubmittedAt = (value) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return date.toLocaleString("en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const ParentInquiryDetailModal = ({
  inquiry,
  onClose,
  onMarkAsRead,
  onSendReply,
}) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const replies = inquiry.replies || [];

  useEffect(() => {
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
  }, [onClose]);

  const handleMarkRead = () => {
    if (!onMarkAsRead(inquiry.id)) {
      setError("Unable to update inquiry status on this device.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedMessage = message.trim();

    setStatus("");

    if (!trimmedMessage) {
      setError("Please enter a message.");
      return;
    }

    if (!onSendReply(inquiry.id, trimmedMessage)) {
      setError("Unable to save your message. Please try again.");
      return;
    }

    setMessage("");
    setError("");
    setStatus("Message saved.");
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 px-3 py-4 sm:px-4 sm:py-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="parent-inquiry-detail-title"
        className="my-auto flex max-h-[calc(100dvh-2rem)] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-bone text-egg-dark shadow-2xl sm:max-h-[calc(100dvh-3rem)]"
      >
        <div className="flex items-start justify-between gap-3 border-b border-parent-accent/15 px-4 py-4 sm:px-6">
          <div className="min-w-0">
            <h2
              id="parent-inquiry-detail-title"
              className="truncate font-[PoppinsBold] text-lg text-parent-green"
            >
              {inquiry.name}
            </h2>
            <p className="mt-0.5 break-all text-xs text-gray-500">
              {inquiry.email}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close inquiry details"
            className="rounded-full p-1.5 text-gray-500 transition hover:bg-parent-green/10 hover:text-parent-green"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-[PoppinsBold] ${
                inquiry.isRead
                  ? "bg-gray-100 text-gray-500"
                  : "bg-parent-pale text-parent-green"
              }`}
            >
              {inquiry.isRead ? "Read" : "Unread"}
            </span>
            <time
              dateTime={inquiry.submittedAt}
              className="text-[11px] text-gray-500"
            >
              {formatSubmittedAt(inquiry.submittedAt)}
            </time>
          </div>

          <div className="mt-3 whitespace-pre-wrap rounded-xl bg-white p-3 text-sm leading-relaxed text-egg-dark">
            {inquiry.question}
          </div>

          {replies.length > 0 && (
            <div className="mt-4 flex flex-col gap-2">
              <p className="text-2xs font-[PoppinsBold] uppercase tracking-wide text-gray-500">
                Your messages
              </p>

              {replies.map((reply) => (
                <div
                  key={reply.id}
                  className="ml-6 rounded-xl bg-parent-pale/70 p-3 text-sm leading-relaxed text-egg-dark"
                >
                  <p className="whitespace-pre-wrap">{reply.message}</p>
                  <time
                    dateTime={reply.sentAt}
                    className="mt-1 block text-[11px] text-gray-500"
                  >
                    {formatSubmittedAt(reply.sentAt)}
                  </time>
                </div>
              ))}
            </div>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="border-t border-parent-accent/15 px-4 py-4 sm:px-6"
        >
          <label
            htmlFor={`parent-inquiry-reply-${inquiry.id}`}
            className="mb-1.5 block text-sm font-[PoppinsBold]"
          >
            Message to parent
          </label>
          <textarea
            id={`parent-inquiry-reply-${inquiry.id}`}
            rows={3}
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
              setError("");
              setStatus("");
            }}
            placeholder="Write your reply..."
            className="w-full resize-y rounded-lg border border-parent-green/20 bg-white px-3 py-2.5 text-sm focus:border-parent-green/50 focus:ring-parent-green"
          />

          {error && (
            <p role="alert" className="mt-2 text-xs text-reject">
              {error}
            </p>
          )}
          {status && (
            <p role="status" className="mt-2 text-xs text-swamp-green">
              {status}
            </p>
          )}

          <div className="mt-3 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              {!inquiry.isRead && (
                <button
                  type="button"
                  onClick={handleMarkRead}
                  className="inline-flex items-center gap-1.5 rounded-full border border-parent-green/25 px-3 py-2 text-xs font-[PoppinsBold] text-parent-green transition hover:bg-parent-pale/40"
                >
                  <Check className="h-4 w-4" />
                  Mark as read
                </button>
              )}
            </div>

            <div className="flex flex-col-reverse gap-2 sm:flex-row">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-parent-green/25 px-4 py-2 text-xs font-[PoppinsBold] text-parent-green transition hover:bg-parent-pale/40"
              >
                Close
              </button>
              <button
                type="submit"
                className="rounded-full bg-parent-green px-4 py-2 text-xs font-[PoppinsBold] text-white transition hover:bg-parent-accent"
              >
                Send Message
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

const ParentInquiryNotifications = () => {
  const { inquiries, unreadInquiryCount, markInquiryAsRead, addInquiryReply } =
    useParentInquiry();
  const [isOpen, setIsOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [selectedInquiryId, setSelectedInquiryId] = useState(null);
  const [storageError, setStorageError] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setSelectedInquiryId(null);
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const sortedInquiries = [...inquiries].sort(
    (first, second) =>
      new Date(second.submittedAt).getTime() -
      new Date(first.submittedAt).getTime(),
  );
  const selectedInquiry = sortedInquiries.find(
    (inquiry) => inquiry.id === selectedInquiryId,
  );
  const visibleInquiries = showAll
    ? sortedInquiries
    : sortedInquiries.slice(0, MAX_VISIBLE_INQUIRIES);

  const toggleDropdown = () => {
    setIsOpen((current) => !current);
    setSelectedInquiryId(null);
    setStorageError("");
  };

  const handleMarkAsRead = (inquiryId) => {
    const saved = markInquiryAsRead(inquiryId);

    setStorageError(
      saved ? "" : "Unable to update inquiry status on this device.",
    );
  };

  const closeSelectedInquiry = useCallback(() => {
    setSelectedInquiryId(null);
  }, []);

  return (
    <>
      <div ref={containerRef} className="relative shrink-0">
      <button
        type="button"
        onClick={toggleDropdown}
        aria-label={`Parent inquiries, ${unreadInquiryCount} unread`}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className="inline-flex h-8 shrink-0 items-center gap-2 rounded-full border border-parent-accent/25 bg-bone px-3 text-xs font-[PoppinsBold] text-parent-green transition hover:border-parent-green hover:bg-parent-pale/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-parent-green sm:px-4"
      >
        <MessageCircle aria-hidden="true" className="h-4 w-4" />
        <span className="sm:hidden">Inquiries</span>
        <span className="hidden sm:inline">Parent Inquiries</span>
        {unreadInquiryCount > 0 && (
          <span className="flex min-h-5 min-w-5 items-center justify-center rounded-full bg-reject px-1 text-xs font-[PoppinsBold] text-white">
            {unreadInquiryCount > 99 ? "99+" : unreadInquiryCount}
          </span>
        )}
      </button>

      {isOpen && (
        <section
          role="dialog"
          aria-label="Parent inquiry notifications"
          className="absolute right-0 top-full z-50 mt-2 w-80 max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-2xl border border-parent-accent/20 bg-bone shadow-xl sm:w-96"
        >
          <div className="flex items-start justify-between gap-3 border-b border-parent-accent/15 px-4 py-3">
            <div>
              <h2 className="font-[PoppinsBold] text-sm text-parent-green">
                Parent Inquiries
              </h2>
              <p className="mt-0.5 text-xs text-gray-500">
                {unreadInquiryCount} unread
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close parent inquiry notifications"
              className="rounded-full p-1 text-gray-500 transition hover:bg-parent-green/10 hover:text-parent-green"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {storageError && (
            <p role="alert" className="px-4 pt-3 text-xs text-reject">
              {storageError}
            </p>
          )}

          {selectedInquiry ? (
            <div className="max-h-[min(70vh,32rem)] overflow-y-auto p-4">
              <button
                type="button"
                onClick={() => setSelectedInquiryId(null)}
                className="mb-4 inline-flex items-center gap-1 text-xs font-[PoppinsBold] text-parent-green hover:text-parent-accent"
              >
                <ChevronLeft className="h-4 w-4" />
                All inquiries
              </button>

              <div className="flex flex-wrap items-center justify-between gap-2">
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-[PoppinsBold] ${
                    selectedInquiry.isRead
                      ? "bg-gray-100 text-gray-500"
                      : "bg-parent-pale text-parent-green"
                  }`}
                >
                  {selectedInquiry.isRead ? "Read" : "Unread"}
                </span>
                <time
                  dateTime={selectedInquiry.submittedAt}
                  className="text-[11px] text-gray-500"
                >
                  {formatSubmittedAt(selectedInquiry.submittedAt)}
                </time>
              </div>

              <h3 className="mt-3 font-[PoppinsBold] text-base text-egg-dark">
                {selectedInquiry.name}
              </h3>
              <p className="mt-1 break-all text-xs text-gray-500">
                {selectedInquiry.email}
              </p>
              <div className="mt-4 whitespace-pre-wrap rounded-xl bg-white p-3 text-sm leading-relaxed text-egg-dark">
                {selectedInquiry.question}
              </div>

              {!selectedInquiry.isRead && (
                <button
                  type="button"
                  onClick={() => handleMarkAsRead(selectedInquiry.id)}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-parent-green px-4 py-2 text-xs font-[PoppinsBold] text-white transition hover:bg-parent-accent"
                >
                  <Check className="h-4 w-4" />
                  Mark as read
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="max-h-[min(70vh,32rem)] overflow-y-auto">
                {visibleInquiries.length === 0 ? (
                  <p className="px-4 py-8 text-center text-sm text-gray-500">
                    No parent inquiries yet.
                  </p>
                ) : (
                  visibleInquiries.map((inquiry) => (
                    <div
                      key={inquiry.id}
                      className="border-b border-parent-accent/10 px-4 py-3 last:border-b-0"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedInquiryId(inquiry.id);
                          setIsOpen(false);
                        }}
                        className="w-full text-left"
                      >
                        <span className="flex items-center justify-between gap-2">
                          <span className="truncate text-sm font-[PoppinsBold] text-egg-dark">
                            {inquiry.name}
                          </span>
                          <span
                            className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-[PoppinsBold] ${
                              inquiry.isRead
                                ? "bg-gray-100 text-gray-500"
                                : "bg-parent-pale text-parent-green"
                            }`}
                          >
                            {inquiry.isRead ? "Read" : "Unread"}
                          </span>
                        </span>
                        <span className="mt-1 line-clamp-2 block text-xs leading-relaxed text-gray-600">
                          {inquiry.question}
                        </span>
                        <time
                          dateTime={inquiry.submittedAt}
                          className="mt-1.5 block text-xs text-gray-500"
                        >
                          {formatSubmittedAt(inquiry.submittedAt)}
                        </time>
                      </button>

                      {!inquiry.isRead && (
                        <button
                          type="button"
                          onClick={() => handleMarkAsRead(inquiry.id)}
                          className="mt-2 text-xs font-[PoppinsBold] text-parent-green underline hover:text-parent-accent"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>

              {sortedInquiries.length > MAX_VISIBLE_INQUIRIES && (
                <button
                  type="button"
                  onClick={() => setShowAll((current) => !current)}
                  className="w-full border-t border-parent-accent/15 px-4 py-3 text-xs font-[PoppinsBold] text-parent-green transition hover:bg-parent-pale/30"
                >
                  {showAll ? "Show latest inquiries" : "View all parent inquiries"}
                </button>
              )}
            </>
          )}
        </section>
      )}
      </div>

      {selectedInquiry && (
        <ParentInquiryDetailModal
          inquiry={selectedInquiry}
          onClose={closeSelectedInquiry}
          onMarkAsRead={markInquiryAsRead}
          onSendReply={addInquiryReply}
        />
      )}
    </>
  );
};

export default ParentInquiryNotifications;
