import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginHeader from "../Components/LoginHeader.jsx";
import HomeSidebar from "../Components/HomeSidebar.jsx";
import Copyright from "../Components/Copyright.jsx";
import {
  EmailStep,
  OtpStep,
  PasswordStep,
  StepIntro,
  SuccessStep,
} from "../Components/Parents-Teacher Modal/PasswordResetSteps";
import {
  validateEmail,
  validatePassword,
} from "../Components/Parents-Teacher Modal/passwordResetValidation";
import logoImg from "../assets/logowbg.png";
import logImg from "../assets/p2.jpg";

const STEP_CONTENT = {
  email: {
    title: "Verify your email",
    description:
      "Enter your email address and we'll send you a verification code.",
  },
  otp: {
    title: "Enter verification code",
    description: "Check your email for the 6-digit verification code.",
  },
  password: {
    title: "Create a new password",
    description: "Choose a strong password for your account.",
  },
};

const ForgotPassword = () => {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visibility, setVisibility] = useState({ new: false, confirm: false });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSendCode = (event) => {
    event.preventDefault();

    const validationError = validateEmail(email);
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

  const handleResetPassword = (event) => {
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

  const toggleVisibility = (field) => {
    setVisibility((previous) => ({
      ...previous,
      [field]: !previous[field],
    }));
  };

  const handleBackToLogin = () => {
    setExiting(true);

    setTimeout(() => {
      navigate("/login");
    }, 600);
  };

  return (
    <>
      <LoginHeader onMenuToggle={() => setSidebarOpen(true)} />

      <HomeSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-h-dvh items-center justify-center bg-[#ebe9e4] px-3 py-6 sm:px-4 sm:py-8">
        <div className="flex w-full max-w-4xl overflow-hidden rounded-2xl bg-bone shadow-lg transition-all duration-700 ease-in-out sm:rounded-3xl md:h-130">
          <div className="flex w-full flex-col justify-center px-4 py-4 sm:px-8 sm:py-6 md:w-1/2 md:px-14">
            <div className="text-center">
              <div className="py-3 flex items-center justify-center gap-2 md:hidden">
                <img
                  src={logoImg}
                  alt="GCA Logo"
                  className="h-8 w-8 rounded-full object-contain sm:h-10 sm:w-10"
                />

                <p className="font-[PoppinsBold] text-xs text-parent-green sm:text-sm">
                  Grace Christian Academy
                </p>
              </div>

              <h1 className="font-[SuperJoyful] text-2xl text-parent-green sm:text-3xl">
                FORGOT PASSWORD?
              </h1>
            </div>

            <div className="py-2 sm:py-5">
              {step !== "success" ? (
                <>
                  <StepIntro
                    step={step === "email" ? 1 : step === "otp" ? 2 : 3}
                    totalSteps={3}
                    title={STEP_CONTENT[step].title}
                    description={STEP_CONTENT[step].description}
                  />

                  <div className="py-2">
                    {step === "email" && (
                      <EmailStep
                        email={email}
                        onChangeEmail={(value) => {
                          setEmail(value);
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
                        email={email.trim()}
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
                        onSubmit={handleResetPassword}
                        onBack={() => {
                          setStep("otp");
                          setError("");
                          setMessage("Enter the verification code sent to your email.");
                        }}
                        error={error}
                        message={message}
                        submitLabel="RESET PASSWORD"
                      />
                    )}
                  </div>

                  <div className="pt-1 text-center">
                    <button
                      type="button"
                      onClick={handleBackToLogin}
                      className="font-[SuperJoyful] text-2xs text-parent-green underline transition-all duration-300 ease-in-out hover:text-parent-accent sm:text-xs"
                    >
                      Back to Login
                    </button>
                  </div>
                </>
              ) : (
                <SuccessStep
                  title="Password reset successful"
                  message="You can now log in with your new password."
                  onDone={handleBackToLogin}
                  doneLabel="BACK TO LOGIN"
                />
              )}
            </div>
          </div>

          <div
            className={`relative hidden w-1/2 overflow-hidden md:block ${
              exiting
                ? "animate-slide-out-left"
                : "animate-slide-in-left"
            }`}
          >
            <img
              src={logImg}
              alt="Grace Christian Academy"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-t from-[#063c31]/95 via-[#063c31]/30 to-transparent" />
            <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-3">
              <img
                src={logoImg}
                alt="GCA Logo"
                className="h-12 w-12 rounded-full object-contain"
              />

              <div className="text-white">
                <h2 className="text-sm font-[PoppinsBold] leading-tight">
                  GRACE CHRISTIAN
                </h2>
                <h2 className="text-sm font-[PoppinsBold] leading-tight">
                  ACADEMY OF CAVITE INC.
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Copyright />
    </>
  );
};

export default ForgotPassword;
