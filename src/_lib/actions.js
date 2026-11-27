"use server";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings, getYurtPrice } from "./data-service";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "./supabaseAdmin";
import { Resend } from "resend";
import stripe from "./stripe";

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
  // 1.get yurt price from supabase and calculate total
  const yurt = await getYurtPrice(bookingData.yurtId);

  if (!yurt) {
    throw new Error("Yurt not found");
  }
  const yurtPrice = yurt.discount ? yurt.price - yurt.discount : yurt.price;
  const totalPrice = yurtPrice * bookingData.numNights;

  // create the pending booking in supabase
  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    experienceId: formData.get("experienceId")
      ? Number(formData.get("experienceId"))
      : null,
    observations: (formData.get("observations") || "").slice(0, 1000),
    yurtPrice,
    totalPrice,
    extrasPrice: 0,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { data: booking, error } = await supabaseAdmin
    .from("bookings")
    .insert([newBooking])
    .select()
    .single();

  if (error) {
    console.error("Booking creation error:", error);
    throw new Error("Booking could not be created");
  }

  // stripe checkout sesh
  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",

    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Jailoo Yurt Reservation",
          },
          unit_amount: Math.round(totalPrice * 100),
        },
        quantity: 1,
      },
    ],

    metadata: {
      bookingId: String(booking.id),
    },

    payment_intent_data: {
      metadata: {
        bookingId: String(booking.id),
      },
    },
    // redirect on success or error
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/yurts/confirmation?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/yurts/payment-failed`,
  });

  // save the stripe session id to supabase
  const { error: updateError } = await supabaseAdmin
    .from("bookings")
    .update({ stripeSessionId: checkoutSession.id })
    .eq("id", booking.id);

  if (updateError) {
    console.error("Stripe session update error:", updateError);
    throw new Error("Could not update booking with Stripe session");
  }

  revalidatePath(`/yurts/${bookingData.yurtId}`);

  // redirect user to stripe
  redirect(checkoutSession.url);
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
