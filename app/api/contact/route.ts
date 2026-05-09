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
      Authorization: `Bearer ${apiKey}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
    };

    // ── Step 1: Create contact (or detect duplicate) ──────────────────────────
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
        tags: ["flash-flooring"], // permanent identifier tag only
      }),
    });

    const contactData = await contactRes.json();

    // Extract contactId — from new contact or from duplicate error response
    let contactId: string | null = contactData?.contact?.id ?? null;
    if (!contactId && contactRes.status === 400) {
      contactId = contactData?.meta?.contactId ?? null;
    }

    // Fallback: if GHL didn't include contactId in the 400 error, search by email or phone
    if (!contactId && contactRes.status === 400) {
      const searchQuery = body.email || body.phone;
      const searchRes = await fetch(
        `https://services.leadconnectorhq.com/contacts/search?locationId=${locationId}&query=${encodeURIComponent(searchQuery)}`,
        { headers: ghlHeaders }
      );
      const searchData = await searchRes.json();
      contactId = searchData?.contacts?.[0]?.id ?? null;
    }

    if (!contactId) {
      console.error("GHL: could not resolve contactId", contactData);
      return NextResponse.json({ success: true }); // don't surface errors to user
    }

    // ── Step 2: Add note with full submission details ─────────────────────────
    const noteLines = [
      `📋 Quote Request — Flash Flooring Website`,
      ``,
      `Name: ${body.name}`,
      `Phone: ${body.phone}`,
      body.email ? `Email: ${body.email}` : null,
      `Suburb: ${body.suburb}`,
      `Service: ${body.service}`,
      body.message ? `Message: ${body.message}` : null,
    ]
      .filter((l) => l !== null)
      .join("\n");

    await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/notes`, {
      method: "POST",
      headers: ghlHeaders,
      body: JSON.stringify({ body: noteLines }),
    });

    // ── Step 3: Remove website-enquiry tag (ignore if not present) ────────────
    await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/tags`, {
      method: "DELETE",
      headers: ghlHeaders,
      body: JSON.stringify({ tags: ["website-enquiry"] }),
    });

    // ── Step 4: Re-add website-enquiry tag — fires GHL trigger every time ─────
    await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/tags`, {
      method: "POST",
      headers: ghlHeaders,
      body: JSON.stringify({ tags: ["website-enquiry"] }),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
