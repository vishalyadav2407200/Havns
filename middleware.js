import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname, origin } = req.nextUrl;
    const { token } = req.nextauth;
    if (pathname.startsWith("/dashboard") && token?.user?.role !== "host") {
      return new NextResponse("you are not a administrator");
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token;
      },
    },
  },
);
export const config = {
  matcher: ["/profile/:path*", "/protected/:path*", "/dashboard/:path*"],
};
