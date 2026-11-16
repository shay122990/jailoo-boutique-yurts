"use server";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings, getYurtById } from "./data-service";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "./supabaseAdmin";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuestProfile(formData) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID");
  const nationalityValue = formData.get("nationality");

  if (!session.user.guestId) {
    throw new Error("Guest ID is missing from session");
  }

  const nationalIDRegex = /^[a-zA-Z0-9]{6,12}$/;

  if (!nationalIDRegex.test(nationalID ?? "")) {
    throw new Error("Please provide a valid national ID");
  }

  if (!nationalityValue) {
    throw new Error("Please select your nationality");
  }

  const [nationality, countryFlag] = nationalityValue.split("%");

  const updateData = {
    nationality,
    countryFlag,
    nationalID,
  };

  const { error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }

  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session.user.guestId);

  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  const { error } = await supabaseAdmin
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  revalidatePath("/account/reservations");
}

export async function updateReservation(formData) {
  const bookingId = Number(formData.get("bookingId"));
  const numGuests = Number(formData.get("numGuests"));

  const rawExperienceId = formData.get("experienceId");
  const experienceId = rawExperienceId ? Number(rawExperienceId) : null;

  const session = await auth();

  if (!session?.user?.guestId) {
    throw new Error("You must be logged in");
  }

  const { error } = await supabaseAdmin
    .from("bookings")
    .update({
      numGuests,
      experienceId,
    })
    .eq("id", bookingId)
    .eq("guestId", session.user.guestId);

  if (error) {
    console.error("Booking update error:", error);
    throw new Error("Booking could not be updated");
  }

  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);

  redirect("/account/reservations");
}

export async function createBooking(bookingData, formData) {
  const session = await auth();

  if (!session?.user?.guestId) {
    throw new Error("You must be logged in");
  }

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    experienceId: formData.get("experienceId")
      ? Number(formData.get("experienceId"))
      : null,
    observations: (formData.get("observations") || "").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.yurtPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { error } = await supabaseAdmin
    .from("bookings")
    .insert([newBooking])
    .select()
    .single();

  if (error) {
    console.error("Booking creation error:", error);
    throw new Error("Booking could not be created");
  }

  revalidatePath(`/yurts/${bookingData.yurtId}`);

  redirect("/yurts/confirmation");
}
