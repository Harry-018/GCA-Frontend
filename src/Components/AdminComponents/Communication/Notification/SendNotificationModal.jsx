import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const DEFAULT_REMINDERS = ["Tuition Reminder"];
const DEFAULT_RECIPIENTS = ["Parents"];
const DEFAULT_PAYMENT_OPTIONS = ["Paylite", "All-In", "Full Cash"];

const SendNotificationModal = ({
  isOpen = true,
  onClose,
  onSubmit,
  reminders = DEFAULT_REMINDERS,
  recipients = DEFAULT_RECIPIENTS,
  paymentOptions = DEFAULT_PAYMENT_OPTIONS,
}) => {
  const [selectedReminder, setSelectedReminder] = useState(
    reminders[0] || ""
  );

  const [selectedRecipient, setSelectedRecipient] = useState(
    recipients[0] || ""
  );

  const [selectedPayment, setSelectedPayment] = useState(
    paymentOptions[0] || ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit?.({
      reminder: selectedReminder,
      sentTo: selectedRecipient,
      paymentOption: selectedPayment,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4 font-[Poppins]">
      <div className="relative flex max-h-[95vh] w-full max-w-md flex-col gap-5 overflow-y-auto rounded-2xl border border-gray-200 bg-[#f4f6ff] p-5 shadow-lg">
        <h2 className="text-sm font-[PoppinsBold] text-[#91a77c]">
          Send Notification
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >
          {/* Select Reminder */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-600">
              Select Reminder:
            </label>

            <div className="relative">
              <select
                value={selectedReminder}
                onChange={(e) => setSelectedReminder(e.target.value)}
                className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-1.5 pr-8 text-xs text-gray-600 outline-none focus:border-[#91a77c]"
              >
                {reminders.map((reminder) => (
                  <option key={reminder} value={reminder}>
                    {reminder}
                  </option>
                ))}
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
                  onChange={(e) =>
                    setSelectedRecipient(e.target.value)
                  }
                  className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-1.5 pr-7 text-xs text-gray-600 outline-none focus:border-[#91a77c]"
                >
                  {recipients.map((recipient) => (
                    <option key={recipient} value={recipient}>
                      {recipient}
                    </option>
                  ))}
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
                  onChange={(e) =>
                    setSelectedPayment(e.target.value)
                  }
                  className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-1.5 pr-7 text-xs text-gray-600 outline-none focus:border-[#91a77c]"
                >
                  {paymentOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
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
              className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-500 transition-colors hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 rounded-full bg-[#91a77c] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#7f966a]"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendNotificationModal;