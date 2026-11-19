const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (email) => {
  const value = email.trim();

  if (!value) return "Email address is required.";
  if (!EMAIL_PATTERN.test(value)) return "Please enter a valid email address.";

  return "";
};

export const validatePassword = (password, confirmPassword) => {
  if (!password || !confirmPassword) {
    return "Please complete both password fields.";
  }
  if (password.length < 8) {
    return "Password must be at least 8 characters.";
  }
  if (password !== confirmPassword) {
    return "Passwords do not match.";
  }

  return "";
};
