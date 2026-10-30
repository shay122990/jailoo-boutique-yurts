import Image from "next/image";

function UpdateProfileForm({ children }) {
  const countryFlag = "/pt.jpg";

  const inputStyles =
    "w-full rounded-md border border-[#e5cbd5] bg-[#fdf8fa] px-5 py-3 text-[#22000f] shadow-sm outline-none transition placeholder:text-[#9b858f] focus:border-[#80426e] focus:ring-2 focus:ring-[#80426e]/15 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400";

  const labelStyles = "font-medium text-[#22000f]";

  return (
    <form className="flex flex-col gap-7 rounded-xl border border-[#f0e3e9] bg-white px-6 py-8 shadow-sm sm:px-10">
      <div className="space-y-2">
        <label className={labelStyles}>Full name</label>
        <input disabled placeholder="Your full name" className={inputStyles} />
      </div>

      <div className="space-y-2">
        <label className={labelStyles}>Email address</label>
        <input
          disabled
          placeholder="Your email address"
          className={inputStyles}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality" className={labelStyles}>
            Where are you from?
          </label>

          <Image
            src={countryFlag}
            alt="Country flag"
            className="h-5 w-auto rounded-sm"
            width={30}
            height={20}
          />
        </div>

        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID" className={labelStyles}>
          National ID number
        </label>

        <input
          name="nationalID"
          id="nationalID"
          placeholder="Enter your ID number"
          className={inputStyles}
        />
      </div>

      <div className="flex justify-end border-t border-[#f0e3e9] pt-5">
        <button className="rounded-md bg-[#f2a67b] px-7 py-3 font-semibold text-[#22000f] transition-all hover:bg-[#e99467] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#80426e]">
          Update profile
        </button>
      </div>
    </form>
  );
}

export default UpdateProfileForm;
