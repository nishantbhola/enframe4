import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getContactConfig() {
  const scriptUrl = (process.env.GOOGLE_APPS_SCRIPT_URL ?? "").trim();
  const secret = (process.env.CONTACT_FORM_SECRET ?? "").trim();

  if (!scriptUrl || !secret) {
    return null;
  }

  return { scriptUrl, secret };
}

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

/**
 * Google Apps Script web apps: POST runs doPost, then 302 to googleusercontent.
 * Follow that URL with GET (not another POST) to read the JSON result.
 */
async function postToAppsScript(url, payload) {
  const postResponse = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    redirect: "manual",
    cache: "no-store",
  });

  if (postResponse.status >= 300 && postResponse.status < 400) {
    const location = postResponse.headers.get("location");
    if (!location) {
      throw new Error("Apps Script redirect missing location header.");
    }

    return fetch(location, {
      method: "GET",
      redirect: "follow",
      cache: "no-store",
    });
  }

  return postResponse;
}

async function submitViaAppsScript(validated, config) {
  const payload = {
    ...validated,
    secret: config.secret,
    submittedAt: new Date().toISOString(),
  };

  const response = await postToAppsScript(config.scriptUrl, payload);
  const text = await response.text();

  let result;
  try {
    result = JSON.parse(text);
  } catch {
    console.error("[contact] Non-JSON Apps Script response:", text.slice(0, 300));
    throw new Error("Invalid response from contact service.");
  }

  if (!response.ok || result.success === false) {
    console.error("[contact] Apps Script error:", result.error ?? response.status);
    throw new Error(result.error ?? "Could not save your enquiry.");
  }

  // doPost returns { sheet }; doGet (wrong redirect) only returns { todaySheet }.
  if (!result.sheet) {
    console.error("[contact] Apps Script did not confirm sheet write:", result);
    throw new Error("Submission was not saved to the sheet.");
  }

  return result;
}

export async function POST(request) {
  const config = getContactConfig();

  if (!config) {
    return NextResponse.json(
      { error: "Contact form is not configured on the server." },
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
    await submitViaAppsScript(validated, config);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[contact] Submit failed:", error.message);
    return NextResponse.json({ error: "Could not save your enquiry." }, { status: 502 });
  }
}
