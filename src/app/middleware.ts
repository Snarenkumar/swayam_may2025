// middleware.js
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(async function middleware(req) {
  const session = await getServerSession(authOptions);
  console.log("middleware running");

  // If the user is not authenticated, redirect to Google login
  if (!session?.user) {
    const callbackUrl = encodeURIComponent(req.nextUrl.pathname);
    console.log(callbackUrl);
    return NextResponse.redirect(
      new URL(`/api/auth/signin/google?callbackUrl=${callbackUrl}`, req.url)
    );
  }

  // If authenticated, continue to the requested page
  return NextResponse.next();
});

export const config = {
  matcher: ["/api/registration"], // Apply middleware to protected routes
};
