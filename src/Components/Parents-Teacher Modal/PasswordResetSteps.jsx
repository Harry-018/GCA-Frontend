import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Mail,
  ShieldCheck,
} from "lucide-react";

const inputClass =
  "w-full rounded-lg border border-parent-green bg-transparent py-2.5 pl-9 pr-3 text-xs outline-none transition-all duration-300 placeholder:text-gray-400 focus:ring-2 focus:ring-parent-green focus:shadow-[0_0_0_4px_rgba(47,107,69,0.1)] sm:py-3 sm:text-sm";

const primaryButtonClass =
  "w-full rounded-full border border-parent-green bg-parent-green py-2.5 font-[SuperJoyful] text-base text-white transition-all duration-300 hover:border-parent-accent hover:bg-parent-accent hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 sm:py-3 sm:text-lg";

const secondaryButtonClass =
  "inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-1.5 font-[Poppins] text-2xs text-parent-green underline transition-colors hover:text-parent-accent sm:text-xs";

export const StepIntro = ({ step, totalSteps, title, description }) => (
  <div className="text-center">
    <p className="font-[PoppinsBold] text-2xs uppercase tracking-[0.18em] text-parent-accent">
      Step {step} of {totalSteps}
    </p>

    <h2 className="pt-1 font-[PoppinsBold] text-sm text-parent-green sm:text-base">
      {title}
    </h2>

    <p className="py-1 text-2xs leading-relaxed text-gray-600 sm:text-xs">
      {description}
    </p>
  </div>
);

export const EmailStep = ({
  email,
  onChangeEmail,
  onSubmit,
  error,
  message,
  submitLabel = "SEND CODE",
}) => (
  <form onSubmit={onSubmit} className="flex flex-col gap-3">
    <div className="flex flex-col gap-1">
      <label
        htmlFor="password-reset-email"
        className="font-[Poppins] text-xs text-gray-700 sm:text-sm"
      >
        Email address
      </label>

      <div className="relative">
        <Mail
          size={15}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-parent-accent"
        />
        <input
          id="password-reset-email"
          type="email"
          value={email}
          onChange={(event) => onChangeEmail(event.target.value)}
          placeholder="Enter your email"
          autoComplete="email"
          className={inputClass}
        />
      </div>
    </div>

    {message && (
      <p role="status" className="text-center text-2xs text-parent-green sm:text-xs">
        {message}
      </p>
    )}

    {error && (
      <p role="alert" className="text-center text-2xs text-red-500 sm:text-xs">
        {error}
      </p>
    )}

    <button type="submit" className={primaryButtonClass}>
      {submitLabel}
    </button>
  </form>
);

export const OtpStep = ({
  email,
  otp,
  onChangeOtp,
  onSubmit,
  onBack,
  onResend,
  error,
  message,
  submitLabel = "VERIFY CODE",
}) => (
  <form onSubmit={onSubmit} className="flex flex-col gap-3">
    <p className="text-center text-2xs leading-relaxed text-gray-600 sm:text-xs">
      Enter the 6-digit code sent to{" "}
      <span className="font-[PoppinsBold] text-parent-green">{email}</span>
    </p>

    <div className="flex flex-col gap-1">
      <label
        htmlFor="password-reset-otp"
        className="font-[Poppins] text-xs text-gray-700 sm:text-sm"
      >
        Verification code
      </label>

      <div className="relative">
        <ShieldCheck
          size={15}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-parent-accent"
        />
        <input
          id="password-reset-otp"
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          value={otp}
          onChange={(event) => onChangeOtp(event.target.value.replace(/\D/g, ""))}
          placeholder="000000"
          className={`${inputClass} text-center font-[PoppinsBold] tracking-[0.4em] pl-9`}
        />
      </div>
    </div>

    {message && (
      <p role="status" className="text-center text-2xs text-parent-green sm:text-xs">
        {message}
      </p>
    )}

    {error && (
      <p role="alert" className="text-center text-2xs text-red-500 sm:text-xs">
        {error}
      </p>
    )}

    <button
      type="submit"
      disabled={otp.length !== 6}
      className={primaryButtonClass}
    >
      {submitLabel}
    </button>

    <div className="flex items-center justify-between gap-2">
      <button type="button" onClick={onBack} className={secondaryButtonClass}>
        <ArrowLeft size={12} />
        Change email
      </button>

      <button type="button" onClick={onResend} className={secondaryButtonClass}>
        Resend code
      </button>
    </div>
  </form>
);

const PasswordField = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  visible,
  onToggleVisibility,
}) => (
  <div className="flex flex-col gap-1">
    <label htmlFor={id} className="font-[Poppins] text-xs text-gray-700 sm:text-sm">
      {label}
    </label>

    <div className="relative">
      <KeyRound
        size={15}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-parent-accent"
      />
      <input
        id={id}
        type={visible ? "text" : "password"}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete="new-password"
        className={`${inputClass} pr-10`}
      />
      <button
        type="button"
        onClick={onToggleVisibility}
        aria-label={visible ? `Hide ${label}` : `Show ${label}`}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 transition-colors hover:text-parent-accent"
      >
        {visible ? <EyeOff size={15} /> : <Eye size={15} />}
      </button>
    </div>
  </div>
);

export const PasswordStep = ({
  password,
  confirmPassword,
  onChangePassword,
  onChangeConfirmPassword,
  visibility,
  onToggleVisibility,
  onSubmit,
  onBack,
  error,
  message,
  submitLabel = "SAVE PASSWORD",
}) => (
  <form onSubmit={onSubmit} className="flex flex-col gap-3">
    <PasswordField
      id="password-reset-new"
      label="New Password"
      placeholder="Enter a new password"
      value={password}
      onChange={onChangePassword}
      visible={visibility.new}
      onToggleVisibility={() => onToggleVisibility("new")}
    />

    <PasswordField
      id="password-reset-confirm"
      label="Confirm Password"
      placeholder="Re-enter your new password"
      value={confirmPassword}
      onChange={onChangeConfirmPassword}
      visible={visibility.confirm}
      onToggleVisibility={() => onToggleVisibility("confirm")}
    />

    <p className="text-2xs text-gray-500 sm:text-xs">
      Password must be at least 8 characters.
    </p>

    {message && (
      <p role="status" className="text-center text-2xs text-parent-green sm:text-xs">
        {message}
      </p>
    )}

    {error && (
      <p role="alert" className="text-center text-2xs text-red-500 sm:text-xs">
        {error}
      </p>
    )}

    <button type="submit" className={primaryButtonClass}>
      {submitLabel}
    </button>

    <div className="text-center">
      <button type="button" onClick={onBack} className={secondaryButtonClass}>
        <ArrowLeft size={12} />
        Back to code
      </button>
    </div>
  </form>
);

export const SuccessStep = ({
  title = "Password updated",
  message = "Your password has been changed successfully.",
  onDone,
  doneLabel = "DONE",
}) => (
  <div className="flex flex-col items-center gap-3 py-2 text-center">
    <span className="flex size-12 items-center justify-center rounded-full bg-parent-green/10 text-parent-green">
      <CheckCircle2 size={26} />
    </span>

    <h2 className="font-[PoppinsBold] text-sm text-parent-green sm:text-base">
      {title}
    </h2>

    <p className="text-2xs leading-relaxed text-gray-600 sm:text-xs">
      {message}
    </p>

    <button type="button" onClick={onDone} className={`${primaryButtonClass} mt-2`}>
      {doneLabel}
    </button>
  </div>
);
