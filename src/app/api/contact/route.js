import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateBody(body) {
  if (!body || typeof body !== "object") {
    return "Invalid request body.";
  }

  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (name.length < 2) return "Please enter your full name.";
  if (phone.length < 8) return "Please enter a valid phone number.";
  if (!EMAIL_RE.test(email)) return "Please enter a valid email address.";
  if (message.length < 10) return "Please share a brief project description.";

  return { name, phone, email, message };
}

async function submitViaAppsScript(validated) {
  const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
  const secret = (process.env.CONTACT_FORM_SECRET ?? "").trim();

  if (!scriptUrl) {
    throw new Error("Contact form is not configured yet.");
  }

  if (!secret) {
    throw new Error("CONTACT_FORM_SECRET is not configured.");
  }

  const payload = {
    ...validated,
    secret,
    submittedAt: new Date().toISOString(),
  };

  const response = await fetch(scriptUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    redirect: "follow",
    cache: "no-store",
  });

  const text = await response.text();
  let result = { success: response.ok };

  try {
    result = JSON.parse(text);
  } catch {
    if (!response.ok) {
      throw new Error("Could not save your enquiry.");
    }
  }

  if (!response.ok || result.success === false) {
    throw new Error(result.error ?? "Could not save your enquiry.");
  }

  return result;
}

export async function POST(request) {
  if (!process.env.GOOGLE_APPS_SCRIPT_URL) {
    return NextResponse.json(
      { error: "Contact form is not configured yet. Please try email or WhatsApp." },
      { status: 503 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const validated = validateBody(body);
  if (typeof validated === "string") {
    return NextResponse.json({ error: validated }, { status: 400 });
  }

  try {
    await submitViaAppsScript(validated);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Could not save your enquiry." }, { status: 502 });
  }
}
