import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token } = await req.json();

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  const res = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
    { method: "POST" }
  );

  const data = await res.json();

  return NextResponse.json({ success: data.success });
}