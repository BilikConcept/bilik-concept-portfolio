import { NextResponse } from "next/server";

const COOKIE_NAME = "bilik_site_access";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const pin = body?.pin;

  if (!pin || pin !== process.env.SITE_ACCESS_PIN) {
    return NextResponse.json(
      { ok: false, message: "Invalid PIN" },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true });

  response.cookies.set(COOKIE_NAME, "granted", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}
