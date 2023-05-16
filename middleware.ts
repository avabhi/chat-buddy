import { withAuth } from "next-auth/middleware";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export default withAuth({
  pages: {
    signIn: "/",
  },
});

// export default withAuth(
//   // `withAuth` augments your `Request` with the user's token.
//   function middleware(req) {
//     console.log(req.nextauth.token);
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => token?.role === "admin",
//     },
//     pages: {
//       signIn: "/",
//     },
//   }
// );

// export const config = { matcher: ["/admin"] };
// export default withAuth({
//   callbacks: {
//     authorized: async ({ req, token }) => {
//       const pathname = req.nextUrl.pathname;

//       if (pathname.startsWith("/_next") || pathname === "/favicon.ico")
//         return true;

//       if (token) return true;

//       return false;
//     },
//   },
//   pages: {
//     signIn: "/",
//   },
// });
// export function middleware(request: NextRequest) {
//   console.log("lol!!!");
// }

export const config = {
  matcher: ["/conversations/:path*", "/users/:path*"],
};
