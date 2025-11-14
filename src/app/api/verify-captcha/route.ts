import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    if (!secretKey) {
      console.error("RECAPTCHA_SECRET_KEY is not set in environment variables");
      return NextResponse.json(
        { success: false, error: "Server configuration error" },
        { status: 500 }
      );
    }

    if (!token) {
      console.error("Token is missing from request body");
      return NextResponse.json(
        { success: false, error: "Token is required" },
        { status: 400 }
      );
    }

    console.log("Verifying captcha token...");
    const res = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${secretKey}&response=${token}`,
      }
    );

    if (!res.ok) {
      console.error(`Google reCAPTCHA API error: ${res.status} ${res.statusText}`);
      return NextResponse.json(
        { success: false, error: `API error: ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    console.log("reCAPTCHA verification result:", data);

    return NextResponse.json({ success: data.success });
  } catch (error) {
    console.error("Error in verify-captcha route:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}