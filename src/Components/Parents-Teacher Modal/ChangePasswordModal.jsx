import { useState } from "react";

import {
  EmailStep,
  OtpStep,
  PasswordStep,
  StepIntro,
  SuccessStep,
} from "./PasswordResetSteps";
import {
  validateEmail,
  validatePassword,
} from "./passwordResetValidation";

const ChangePasswordModal = ({ email = "", onCancel, onComplete }) => {
  const [step, setStep] = useState("email");
  const [emailValue, setEmailValue] = useState(email);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visibility, setVisibility] = useState({ new: false, confirm: false });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSendCode = (event) => {
    event.preventDefault();

    const validationError = validateEmail(emailValue);
    if (validationError) {
      setError(validationError);
      setMessage("");
      return;
    }

    setError("");
    setMessage("A verification code has been sent to your email.");
    setStep("otp");
  };

  const handleVerifyCode = (event) => {
    event.preventDefault();

    if (otp.length !== 6) {
      setError("Please enter the 6-digit verification code.");
      return;
    }

    setError("");
    setMessage("Code verified. Please create a new password.");
    setStep("password");
  };

  const handleResendCode = () => {
    setOtp("");
    setError("");
    setMessage("A new verification code has been sent to your email.");
  };

  const handleSavePassword = (event) => {
    event.preventDefault();

    const validationError = validatePassword(password, confirmPassword);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setMessage("");
    setStep("success");
  };

  const handleDone = () => {
    onComplete?.();
    onCancel();
  };

  const toggleVisibility = (field) => {
    setVisibility((previous) => ({
      ...previous,
      [field]: !previous[field],
    }));
  };

  const stepContent = {
    email: {
      title: "Verify your email",
      description:
        "Enter your account email address to receive a verification code.",
    },
    otp: {
      title: "Enter verification code",
      description: "Check your email for the 6-digit verification code.",
    },
    password: {
      title: "Create a new password",
      description: "Choose a strong password you have not used before.",
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/20 px-4 py-6">
      <div className="my-auto w-full max-w-md rounded-2xl bg-[#f3f8f1] px-4 py-4 shadow-lg sm:px-5">
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-[PoppinsBold] text-parent-green">
            Security Settings
          </h2>
          <p className="text-2xs text-gray-600">
            Ensure your account is using a strong password.
          </p>
        </div>

        <div className="flex flex-col gap-4 py-4">
          {step !== "success" && (
            <StepIntro
              step={step === "email" ? 1 : step === "otp" ? 2 : 3}
              totalSteps={3}
              title={stepContent[step].title}
              description={stepContent[step].description}
            />
          )}

          {step === "email" && (
            <EmailStep
              email={emailValue}
              onChangeEmail={(value) => {
                setEmailValue(value);
                setError("");
              }}
              onSubmit={handleSendCode}
              error={error}
              message={message}
              submitLabel="SEND CODE"
            />
          )}

          {step === "otp" && (
            <OtpStep
              email={emailValue}
              otp={otp}
              onChangeOtp={(value) => {
                setOtp(value);
                setError("");
              }}
              onSubmit={handleVerifyCode}
              onBack={() => {
                setStep("email");
                setError("");
                setMessage("");
              }}
              onResend={handleResendCode}
              error={error}
              message={message}
              submitLabel="VERIFY CODE"
            />
          )}

          {step === "password" && (
            <PasswordStep
              password={password}
              confirmPassword={confirmPassword}
              onChangePassword={(value) => {
                setPassword(value);
                setError("");
              }}
              onChangeConfirmPassword={(value) => {
                setConfirmPassword(value);
                setError("");
              }}
              visibility={visibility}
              onToggleVisibility={toggleVisibility}
              onSubmit={handleSavePassword}
              onBack={() => {
                setStep("otp");
                setError("");
                setMessage("Enter the verification code sent to your email.");
              }}
              error={error}
              message={message}
              submitLabel="SAVE PASSWORD"
            />
          )}

          {step === "success" && (
            <SuccessStep
              title="Password updated"
              message="Your password has been changed successfully."
              onDone={handleDone}
              doneLabel="DONE"
            />
          )}
        </div>

        {step !== "success" && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-full border border-gray-400 px-5 py-1.5 text-2xs font-[PoppinsBold] text-gray-500 transition hover:bg-gray-100"
            >
              CANCEL
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangePasswordModal;
