import React, { useEffect, useState } from "react";
import { ChevronDown, Loader2 } from "lucide-react";

const SendNotificationModal = ({
  isOpen = false,
  onClose,
  onSubmit,
  notificationTemplates = [],
  notificationAudiences = [],
  paymentOptions = [],
}) => {
  const [selectedReminder, setSelectedReminder] = useState("");

  const [selectedRecipient, setSelectedRecipient] = useState("");

  const [selectedPayment, setSelectedPayment] = useState("");

  const [sending, setSending] = useState(false);

  // Select the first payment option once the API data arrives
  useEffect(() => {
    if (paymentOptions.length > 0) {
      setSelectedPayment(String(paymentOptions[0].payment_option_id));
    }
  }, [paymentOptions]);

  useEffect(() => {
    if (notificationTemplates.length > 0) {
      setSelectedReminder(String(notificationTemplates[0].template_id));
    }
  }, [notificationTemplates]);

  useEffect(() => {
    if (notificationAudiences.length > 0) {
      setSelectedRecipient(notificationAudiences[0].value);
    }
  }, [notificationAudiences]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedReminder || !selectedRecipient || !selectedPayment) {
      return;
    }

    try {
      setSending(true);

      await onSubmit?.({
        templateId: Number(selectedReminder),
        sentTo: selectedRecipient,
        paymentOptionId: Number(selectedPayment),
      });
    } catch (error) {
      console.error("Failed to send notification:", error);
    } finally {
      setSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4 font-[Poppins]">
      <div className="relative flex max-h-[95vh] w-full max-w-md flex-col gap-5 overflow-y-auto rounded-2xl border border-gray-200 bg-[#f4f6ff] p-5 shadow-lg">
        <h2 className="text-sm font-[PoppinsBold] text-[#91a77c]">
          Send Notification
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Select Reminder */}
          {/* Select Reminder */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-600">
              Select Reminder:
            </label>

            <div className="relative">
              <select
                value={selectedReminder}
                onChange={(e) => setSelectedReminder(e.target.value)}
                disabled={notificationTemplates.length === 0 || sending}
                className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-1.5 pr-8 text-xs text-gray-600 outline-none focus:border-[#91a77c] disabled:cursor-not-allowed disabled:bg-gray-100"
              >
                {notificationTemplates.length === 0 ? (
                  <option value="">No reminders</option>
                ) : (
                  notificationTemplates.map((template) => (
                    <option
                      key={template.template_id}
                      value={template.template_id}
                    >
                      {template.purpose_name}
                    </option>
                  ))
                )}
              </select>

              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>

          {/* Recipient and Payment Option */}
          <div className="grid grid-cols-2 gap-3">
            {/* Send To */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-600">
                Send To:
              </label>

              <div className="relative">
                <select
                  value={selectedRecipient}
                  onChange={(e) => setSelectedRecipient(e.target.value)}
                  disabled={notificationAudiences.length === 0 || sending}
                  className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-1.5 pr-7 text-xs text-gray-600 outline-none focus:border-[#91a77c] disabled:cursor-not-allowed disabled:bg-gray-100"
                >
                  {notificationAudiences.length === 0 ? (
                    <option value="">No recipients</option>
                  ) : (
                    notificationAudiences.map((audience) => (
                      <option key={audience.value} value={audience.value}>
                        {audience.label}
                      </option>
                    ))
                  )}
                </select>

                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                />
              </div>
            </div>

            {/* Payment Option */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-600">
                Payment Option:
              </label>

              <div className="relative">
                <select
                  value={selectedPayment}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                  disabled={paymentOptions.length === 0 || sending}
                  className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-1.5 pr-7 text-xs text-gray-600 outline-none focus:border-[#91a77c] disabled:cursor-not-allowed disabled:bg-gray-100"
                >
                  {paymentOptions.length === 0 ? (
                    <option value="">No payment options</option>
                  ) : (
                    paymentOptions.map((option) => (
                      <option
                        key={option.payment_option_id}
                        value={option.payment_option_id}
                      >
                        {option.option_name}
                      </option>
                    ))
                  )}
                </select>

                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                />
              </div>
            </div>
          </div>

          {/* Modal Buttons */}
          <div className="flex items-center gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              disabled={sending}
              className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-500 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                sending ||
                notificationTemplates.length === 0 ||
                notificationAudiences.length === 0 ||
                paymentOptions.length === 0
              }
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#91a77c] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#7f966a] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending && <Loader2 size={14} className="animate-spin" />}

              {sending ? "Sending..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendNotificationModal;
