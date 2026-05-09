import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, contact, feedback, stars } = body;

    if (!name || !contact || !feedback) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const apiKey = process.env.GHL_API_KEY;
    const locationId = process.env.GHL_LOCATION_ID;

    if (!apiKey || !locationId) {
      console.log("Review feedback (GHL not configured):", body);
      return NextResponse.json({ success: true });
    }

    const ghlHeaders = {
      Authorization: `Bearer ${apiKey}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
    };

    // Detect if contact is email or phone
    const isEmail = contact.includes("@");
    const nameParts = name.trim().split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ") || "";

    // ── Step 1: Create contact ────────────────────────────────────────────────
    const contactRes = await fetch("https://services.leadconnectorhq.com/contacts/", {
      method: "POST",
      headers: ghlHeaders,
      body: JSON.stringify({
        firstName,
        lastName,
        ...(isEmail ? { email: contact } : { phone: contact }),
        locationId,
        source: "flashflooring.com.au/review",
        tags: ["flash-flooring"],
      }),
    });

    const contactData = await contactRes.json();

    // Extract contactId from new contact or duplicate error
    let contactId: string | null = contactData?.contact?.id ?? null;
    if (!contactId && contactRes.status === 400) {
      contactId = contactData?.meta?.contactId ?? null;
    }

    // Fallback: search by email or phone
    if (!contactId && contactRes.status === 400) {
      const searchRes = await fetch(
        `https://services.leadconnectorhq.com/contacts/search?locationId=${locationId}&query=${encodeURIComponent(contact)}`,
        { headers: ghlHeaders }
      );
      const searchData = await searchRes.json();
      contactId = searchData?.contacts?.[0]?.id ?? null;
    }

    if (!contactId) {
      console.error("GHL review feedback: could not resolve contactId", contactData);
      return NextResponse.json({ success: true });
    }

    // ── Step 2: Add note with feedback details ────────────────────────────────
    const note = [
      `⚠️ Private Review Feedback — Flash Flooring`,
      ``,
      `Name: ${name}`,
      `Contact: ${contact}`,
      `Stars given: ${stars} out of 5`,
      ``,
      `Feedback:`,
      feedback,
    ].join("\n");

    await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/notes`, {
      method: "POST",
      headers: ghlHeaders,
      body: JSON.stringify({ body: note }),
    });

    // ── Step 3: Remove review-feedback tag (ignore if not present) ────────────
    await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/tags`, {
      method: "DELETE",
      headers: ghlHeaders,
      body: JSON.stringify({ tags: ["review-feedback"] }),
    });

    // ── Step 4: Re-add review-feedback tag — fires GHL alert automation ───────
    await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/tags`, {
      method: "POST",
      headers: ghlHeaders,
      body: JSON.stringify({ tags: ["review-feedback"] }),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Review feedback error:", err);
    return NextResponse.json({ success: true }); // always show success to user
  }
}
