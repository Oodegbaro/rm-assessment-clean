import { NextResponse } from "next/server";
import { verifySession } from "./lib/session";
import { getModuleProgress } from "./lib/kv";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/assessment") ||
    pathname.startsWith("/home") ||
    pathname.startsWith("/training")
  ) {
    const token = req.cookies.get("session")?.value;
    const payload = await verifySession(token);
    if (!payload || !payload.email) {
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }

    // The 7 module files are static assets under /training-modules/ --
    // reachable directly by URL regardless of what the hub page shows or
    // hides. This is the actual enforcement point for "modules must be done
    // in order," not just a cosmetic lock on the hub's UI.
    const moduleMatch = pathname.match(/^\/training-modules\/module-0?(\d+)-/);
    if (moduleMatch) {
      const requestedModule = Number(moduleMatch[1]);
      if (requestedModule > 1) {
        const completed = await getModuleProgress(payload.email);
        const priorRequired = Array.from({ length: requestedModule - 1 }, (_, i) => i + 1);
        const hasAllPrior = priorRequired.every((n) => completed.includes(n));
        if (!hasAllPrior) {
          const trainingHub = new URL("/training", req.url);
          return NextResponse.redirect(trainingHub);
        }
      }
    }
  }

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = req.cookies.get("admin_session")?.value;
    const payload = await verifySession(token);
    if (!payload || !payload.admin) {
      const loginUrl = new URL("/admin/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/assessment/:path*", "/home/:path*", "/training/:path*", "/training-modules/:path*", "/admin/:path*"],
};
