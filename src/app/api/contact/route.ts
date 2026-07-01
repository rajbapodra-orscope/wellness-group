import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, department, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const scriptUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    if (!scriptUrl) {
      return NextResponse.json({ error: "Sheet webhook not configured" }, { status: 500 });
    }

    const payload = {
      timestamp: new Date().toISOString(),
      name,
      email,
      company,
      department,
      message,
    };

    const res = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Google Script error:", text);
      return NextResponse.json({ error: "Failed to write to sheet" }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
