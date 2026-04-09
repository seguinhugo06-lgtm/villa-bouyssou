import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, firstName, lastName, guests, phone, checkIn, checkOut, message } = body;

    // Validate required fields
    if (!email || !firstName || !lastName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // TODO: Send email via Resend/SendGrid
    // For now, log the contact request
    console.log("Contact form submission:", {
      email,
      firstName,
      lastName,
      guests,
      phone,
      checkIn,
      checkOut,
      message,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
