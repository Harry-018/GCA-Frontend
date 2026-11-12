import { KeyRound, LockKeyhole } from "lucide-react";

const AccountSettings = ({ email, password, onChangePassword }) => {
  return (
    <div className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-parent-accent/15 bg-linear-to-br from-bone via-white to-parent-pale/60 px-4 py-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-parent-accent/30 hover:shadow-xl max-[374px]:px-3 max-[374px]:py-4 sm:px-7 sm:py-6">
      <div className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-parent-green via-parent-accent to-parent-mint" />

      <div className="flex h-full flex-col justify-start gap-6 pt-1.5">
        <div className="flex min-h-14 items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-parent-green text-parent-mint shadow-sm ring-1 ring-parent-accent/20 transition-transform duration-300 group-hover:scale-110">
            <LockKeyhole size={19} />
          </div>
          <div className="min-w-0">
            <p className="text-[9px] font-[PoppinsBold] uppercase tracking-widest text-parent-accent sm:text-2xs sm:tracking-[0.15em]">
              Privacy & access
            </p>
            <h2 className="py-1 text-xs font-[PoppinsBold] uppercase text-parent-green sm:text-base">
              Account security
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 border-t border-parent-accent/10 pt-5">
          <div className="flex min-w-0 flex-col gap-1">
            <p className="text-2xs uppercase tracking-wide text-gray-500">
              Email
            </p>

            <p className="min-w-0 break-words text-xs font-[Poppins] text-parent-green sm:text-sm">
              {email}
            </p>
          </div>

          <div className="flex flex-col items-stretch gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex min-w-0 flex-col gap-1">
              <p className="text-2xs uppercase tracking-wide text-gray-500">
                Password
              </p>
              <p className="text-xs font-[Poppins] leading-snug text-parent-green sm:text-sm">
                Keep your password private
              </p>
            </div>
            <button
              type="button"
              onClick={onChangePassword}
              className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-linear-to-r from-parent-green to-parent-accent px-3 py-2 text-[9px] font-[PoppinsBold] uppercase tracking-wide text-white shadow-sm transition-all duration-200 hover:from-[#0f2419] hover:to-parent-accent hover:shadow-md max-[374px]:gap-1 max-[374px]:px-2 max-[374px]:text-[8px] md:w-fit xl:w-auto xl:text-2xs"
            >
              <KeyRound size={14} />
              {password}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
