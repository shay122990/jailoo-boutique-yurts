"use client";

import { useFormStatus } from "react-dom";
import { updateGuestProfile } from "../../../_lib/actions";
import SubmitButton from "../../_components/SubmitButton";

function UpdateProfileForm({ children, guest }) {
  const { fullName, email, nationalID, countryFlag } = guest;

  const inputStyles =
    "w-full rounded-md border border-pink bg-[#fdf8fa] px-4 py-3 text-plum shadow-sm outline-none transition placeholder:text-plum/40 focus:border-purple focus:ring-2 focus:ring-purple/15 disabled:cursor-not-allowed disabled:bg-pink/20 disabled:text-plum/50";

  const labelStyles = "font-medium text-plum";

  return (
    <form
      action={updateGuestProfile}
      className="mx-auto flex w-full max-w-2xl flex-col gap-6 rounded-xl border border-pink bg-white p-4 shadow-sm sm:gap-7 sm:p-8 lg:p-10"
    >
      <div className="space-y-2">
        <label htmlFor="fullName" className={labelStyles}>
          Full name
        </label>
        <input
          id="fullName"
          defaultValue={fullName}
          name="fullName"
          disabled
          placeholder="Your full name"
          className={inputStyles}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className={labelStyles}>
          Email address
        </label>
        <input
          id="email"
          defaultValue={email}
          name="email"
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
          {countryFlag && <span className="text-2xl">{countryFlag}</span>}
        </div>
        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID" className={labelStyles}>
          National ID number
        </label>

        <input
          defaultValue={nationalID}
          name="nationalID"
          id="nationalID"
          placeholder="Enter your ID number"
          className={inputStyles}
        />
      </div>

      <div className="flex justify-end border-t border-pink pt-5">
        <SubmitButton pendingLabel="Updating...">Update Profile</SubmitButton>
      </div>
    </form>
  );
}

export default UpdateProfileForm;
