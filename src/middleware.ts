import { clerkMiddleware } from "@clerk/nextjs/server";

// Clerk v6 middleware API
export default clerkMiddleware();

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
