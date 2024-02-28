import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
export default withAuth(
  function middleware(request) {
    console.log("middleware ran");
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        console.log("I ran");
        return !!token;
      },
    },
  }
);
export const config = {
  matcher: ["/app/home", "/app/paper/:path*", "/app/paper/upload"],
};
