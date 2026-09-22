import { NextRequest, NextResponse } from "next/server";

// TODO(Design-Phase): Hier ist noch kein echter E-Mail-Versand angebunden.
// Sobald eine Absender-Adresse/Mailtrap-Zugang vorliegt, hier mit dem Skill
// `mailtrap-email-integration` die Zustellung an businessInfo.email einbauen.

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const { name, email, subject, message, website } = body as Record<string, unknown>;

  // Honeypot: Bots füllen versteckte Felder aus, echte Nutzer nicht.
  if (typeof website === "string" && website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  if (
    typeof name !== "string" ||
    name.trim().length < 2 ||
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    typeof message !== "string" ||
    message.trim().length < 5
  ) {
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 400 });
  }

  // Platzhalter-Verarbeitung, bis der echte Versand angebunden ist.
  console.info("[Kontaktformular] Neue Anfrage (noch nicht per E-Mail versendet):", {
    name,
    email,
    subject,
    message,
  });

  return NextResponse.json({ ok: true });
}
