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
    <div className="h-full w-full rounded-2xl bg-egg-dark px-4 py-4 text-white shadow-sm max-[374px]:px-3 max-[374px]:py-4 sm:px-7 sm:py-6">
      <div className="flex h-full flex-col justify-start gap-6">
        <div className="flex min-h-14 items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-white/10 text-lime-green ring-1 ring-white/10">
            <LockKeyhole size={19} />
          </div>
          <div>
            <p className="text-[9px] font-[PoppinsBold] uppercase tracking-widest text-lime-green sm:text-2xs sm:tracking-[0.15em]">
              Privacy & access
            </p>
            <h2 className="py-1 text-xs font-[PoppinsBold] uppercase sm:text-base">
              Account security
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 border-t border-white/15 pt-5">
          <div className="flex min-w-0 flex-col gap-1">
            <p className="text-2xs font-medium uppercase tracking-wide text-white/50">Email</p>
            <p className="wrap-break-word text-xs font-[Poppins] text-white sm:text-sm">{account.email}</p>
          </div>
          <div className="flex flex-col items-stretch gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex min-w-0 flex-col gap-1">
              <p className="text-2xs font-medium uppercase tracking-wide text-white/50">Password</p>
              <p className="text-xs font-[Poppins] leading-snug text-white sm:text-sm">Keep your password private</p>
            </div>
            <button
              type="button"
              onClick={onChangePassword}
              className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-swamp-green px-3 py-2 text-[9px] font-[PoppinsBold] uppercase tracking-wide text-[#0c2423] transition-colors hover:bg-white max-[374px]:gap-1 max-[374px]:px-2 max-[374px]:text-[8px] md:w-fit xl:w-auto xl:text-2xs"
            >
              <KeyRound size={14} />
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;