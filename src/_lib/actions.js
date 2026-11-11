"use server";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";

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

  const { error } = await supabase
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

  // authentication check
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // authorization
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to update  this booking");

  //building update data
  const updatedFields = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };

  // mutation
  const { error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", bookingId)
    .eq("guestId", session.user.guestId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  // refresh data
  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  // redirect
  redirect("/account/reservations");
}
