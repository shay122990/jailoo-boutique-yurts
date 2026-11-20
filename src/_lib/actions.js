"use server";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "./supabaseAdmin";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

export async function sendContactEnquiry(prevState, formData) {
  const name = formData.get("name")?.trim();
  const email = formData.get("email")?.trim();
  const enquiry = formData.get("enquiry");
  const arrival = formData.get("arrival");
  const guests = formData.get("guests");
  const message = formData.get("message")?.trim();

  if (!name || !email || !enquiry || !message) {
    return {
      status: "error",
      message: "Please complete all required fields.",
    };
  }

  // 3. Validate input values
  const validEnquiries = ["accommodation", "experiences", "booking", "other"];

  const validGuests = ["1", "2", "3", "4", "5+"];

  if (
    name.length > 100 ||
    email.length > 254 ||
    message.length > 5000 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !validEnquiries.includes(enquiry) ||
    !validGuests.includes(guests)
  ) {
    return {
      status: "error",
      message: "Please check your submitted details.",
    };
  }

  //Send email using Resend
  try {
    const { error } = await resend.emails.send({
      from: "Jailoo <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `New Jailoo enquiry: ${enquiry}`,
      text: `
          Name: ${name}
          Email: ${email}
          Enquiry: ${enquiry}
          Arrival: ${arrival || "Not specified"}
          Guests: ${guests || "Not specified"}

          Message:
          ${message}
      `,
    });

    if (error) {
      console.error("Resend error:", error);

      return {
        status: "error",
        message: "Unable to send your enquiry. Please try again.",
      };
    }

    return {
      status: "success",
      message: "Thank you for reaching out. We'll be in touch soon.",
    };
  } catch (error) {
    console.error("Contact form error:", error);

    return {
      status: "error",
      message: "Something went wrong. Please try again later.",
    };
  }
}
