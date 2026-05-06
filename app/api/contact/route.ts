import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  phone: string;
  email?: string;
  suburb: string;
  service: string;
  message?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactPayload = await req.json();

    if (!body.name || !body.phone || !body.suburb || !body.service) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const ghlWebhook = process.env.GHL_WEBHOOK_URL;
    if (ghlWebhook) {
      await fetch(ghlWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...body,
          source: "flashflooring.com.au",
          timestamp: new Date().toISOString(),
        }),
      });
    } else {
      console.log("Flash Flooring lead:", body);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
