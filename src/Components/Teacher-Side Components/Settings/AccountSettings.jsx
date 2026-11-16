import { KeyRound, LockKeyhole } from "lucide-react";

const AccountSettings = ({ account, onChangePassword }) => {
  const accountDetails = [
    {
      label: "Email",
      value: account.email,
    },
    {
      label: "Password",
      value: "Change Password",
      action: onChangePassword,
    },
  ];

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-parent-accent/15 bg-bone px-4 py-4 shadow-[0_2px_4px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg max-[374px]:px-3 max-[374px]:py-4 sm:px-7 sm:py-6">
      <div className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-parent-green via-parent-accent to-parent-mint" />

      <div className="flex h-full flex-col justify-start gap-6 pt-2">
        <div className="flex min-h-14 items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-parent-green text-parent-mint shadow-sm ring-1 ring-parent-accent/20">
            <LockKeyhole size={19} />
          </div>
          <div>
            <p className="text-[9px] font-[PoppinsBold] uppercase tracking-widest text-parent-accent sm:text-2xs sm:tracking-[0.15em]">
              Privacy & access
            </p>
            <h2 className="py-1 text-xs font-[PoppinsBold] uppercase text-parent-green sm:text-base">
              Account security
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 border-t border-parent-accent/15 pt-5">
          <div className="flex min-w-0 flex-col gap-1">
            <p className="text-2xs uppercase tracking-wide text-gray-500">
              Email
            </p>
            <p className="wrap-break-word text-xs font-[Poppins] text-gray-700 sm:text-sm">
              {account.email}
            </p>
          </div>
          <div className="flex flex-col items-stretch gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex min-w-0 flex-col gap-1">
              <p className="text-2xs uppercase tracking-wide text-gray-500">
                Password
              </p>
              <p className="text-xs font-[Poppins] leading-snug text-gray-700 sm:text-sm">
                Keep your password private
              </p>
            </div>
            <button
              type="button"
              onClick={onChangePassword}
              className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-parent-green px-3 py-2 text-[9px] font-[PoppinsBold] uppercase tracking-wide text-white transition-all duration-300 hover:bg-parent-accent hover:shadow-md max-[374px]:gap-1 max-[374px]:px-2 max-[374px]:text-[8px] md:w-fit xl:w-auto xl:text-2xs"
            >
              <KeyRound size={14} />
              Forgot Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
