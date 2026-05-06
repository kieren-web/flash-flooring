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

    const apiKey = process.env.GHL_API_KEY;
    const locationId = process.env.GHL_LOCATION_ID;

    if (!apiKey || !locationId) {
      console.log("Flash Flooring lead (GHL not configured):", body);
      return NextResponse.json({ success: true });
    }

    // Split name into first/last
    const nameParts = body.name.trim().split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ") || "";

    const ghlHeaders = {
      "Authorization": `Bearer ${apiKey}`,
      "Version": "2021-07-28",
      "Content-Type": "application/json",
    };

    // Create contact in GHL
    const contactRes = await fetch("https://services.leadconnectorhq.com/contacts/", {
      method: "POST",
      headers: ghlHeaders,
      body: JSON.stringify({
        firstName,
        lastName,
        phone: body.phone,
        ...(body.email ? { email: body.email } : {}),
        locationId,
        city: body.suburb,
        source: "flashflooring.com.au",
        tags: ["website-lead", "flash-flooring"],
      }),
    });

    const contactData = await contactRes.json();
    const contactId = contactData?.contact?.id;

    // Add a note with service + project details
    if (contactId) {
      const noteLines = [
        `Source: Flash Flooring Website`,
        `Service Requested: ${body.service}`,
        `Suburb: ${body.suburb}`,
        body.message ? `Project Details: ${body.message}` : null,
      ].filter(Boolean).join("\n");

      await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/notes`, {
        method: "POST",
        headers: ghlHeaders,
        body: JSON.stringify({ body: noteLines }),
      });
    } else {
      console.error("GHL contact creation failed:", contactData);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
