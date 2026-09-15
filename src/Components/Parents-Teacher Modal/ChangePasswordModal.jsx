import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const ChangePasswordModal = ({
  fields,
  initialPasswords,
  onCancel,
  onSave,
}) => {
  const [passwords, setPasswords] = useState(initialPasswords);

  const [visibility, setVisibility] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleChange = (field, value) => {
    setPasswords((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleVisibility = (field) => {
    setVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSave = () => {
    onSave(passwords);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4">
      <div className="w-full max-w-md rounded-2xl bg-[#F5F6FF] px-4 py-4 shadow-lg sm:px-5">
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-semibold text-[#8FA86E]">
            Security Settings
          </h2>
          <p className="text-2xs text-gray-600">
            Ensure your account is using a strong password.
          </p>
        </div>

        <div className="flex flex-col gap-4 py-5">
          {fields.map((field) => (
            <div
              key={field.key}
              className="flex flex-col gap-1.5"
            >
              <label className="text-[11px] text-gray-700">
                {field.label}
              </label>

              <div className="relative">
                <input
                  type={visibility[field.key] ? "text" : "password"}
                  value={passwords[field.key]}
                  placeholder={field.placeholder}
                  onChange={(e) =>
                    handleChange(field.key, e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2.5 pr-10 text-[11px] text-gray-600 outline-none placeholder:text-gray-400 focus:border-[#8FA86E]"
                />

                {field.key !== "current" && (
                  <button
                    type="button"
                    onClick={() => toggleVisibility(field.key)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {visibility[field.key] ? (
                      <Eye size={14} />
                    ) : (
                      <EyeOff size={14} />
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-gray-400 px-5 py-1.5 text-2xs font-semibold text-gray-500 transition hover:bg-gray-100"
          >
            CANCEL
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="rounded-full bg-[#8FA86E] px-6 py-1.5 text-2xs font-semibold text-white transition hover:bg-[#7D9660]"
          >
            SAVE
          </button>
        </div>

      </div>
    </div>
  );
};

export default ChangePasswordModal;