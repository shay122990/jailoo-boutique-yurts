import { auth } from "./src/_lib/auth";
import { NextResponse } from "next/server";

export const proxy = auth((request) => {
  if (!request.auth) {
    return NextResponse.redirect(new URL("/yurts", request.url));
  }
});

export const config = {
  matcher: ["/account/:path*"],
};
