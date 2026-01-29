import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { env } from "@/env";

export async function updateSession(request: NextRequest) {
	let supabaseResponse = NextResponse.next({
		request,
	});

	// With Fluid compute, don't put this client in a global environment
	// variable. Always create a new one on each request.
	const supabase = createServerClient(
		env.NEXT_PUBLIC_SUPABASE_URL,
		env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value }) => {
						request.cookies.set(name, value);
					});
					supabaseResponse = NextResponse.next({
						request,
					});
					cookiesToSet.forEach(({ name, value, options }) => {
						supabaseResponse.cookies.set(name, value, options);
					});
				},
			},
		},
	);

	// Do not run code between createServerClient and
	// supabase.auth.getClaims(). A simple mistake could make it very hard to debug
	// issues with users being randomly logged out.

	// IMPORTANT: If you remove getClaims() and you use server-side rendering
	// with the Supabase client, your users may be randomly logged out.
	const { data } = await supabase.auth.getClaims();
	const user = data?.claims;

	// 1. Define Route Groups for clarity
	const toggleRoutes = ["/signin", "/signup"];
	const publicRoutes = ["/", "/privacy", "/terms", "/contact", "/api", "/auth"];

	// 2. Check current path
	const path = request.nextUrl.pathname;
	const isAuthRoute = toggleRoutes.some((route) => path.startsWith(route));
	const isPublicRoute =
		publicRoutes.some((route) => path.startsWith(route)) || isAuthRoute;

	// 3. Handle Redirects
	// Guest tries to access protected route -> Redirect to Sign In
	if (!user && !isPublicRoute) {
		const url = request.nextUrl.clone();
		url.pathname = "/signin";
		return NextResponse.redirect(url);
	}

	// User tries to access auth route (signin/signup) -> Redirect to Dashboard
	if (user && isAuthRoute) {
		const url = request.nextUrl.clone();
		url.pathname = "/dashboard";
		return NextResponse.redirect(url);
	}

	// IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
	// creating a new response object with NextResponse.next() make sure to:
	// 1. Pass the request in it, like so:
	//    const myNewResponse = NextResponse.next({ request })
	// 2. Copy over the cookies, like so:
	//    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
	// 3. Change the myNewResponse object to fit your needs, but avoid changing
	//    the cookies!
	// 4. Finally:
	//    return myNewResponse
	// If this is not done, you may be causing the browser and server to go out
	// of sync and terminate the user's session prematurely!

	return supabaseResponse;
}
