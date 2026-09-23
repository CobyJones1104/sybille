"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";

type Status = "idle" | "submitting" | "success" | "error";

// In der statischen Vorschau gibt es keinen Server, der das Formular annimmt.
const istVorschau = process.env.NEXT_PUBLIC_STATIC_PREVIEW === "1";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("request_failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 text-center text-[var(--color-foreground)]">
        Vielen Dank für Ihre Nachricht! Wir melden uns so schnell wie möglich bei Ihnen.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {istVorschau && (
        <p className="rounded-xl border border-[var(--color-border)] bg-[var(--color-background-alt)] p-3 text-xs text-[var(--color-muted-foreground)]">
          Statische Vorschau: Das Formular ist hier nur zur Ansicht, es wird nichts versendet.
        </p>
      )}
      {/* Honeypot-Feld gegen Spam: für Menschen unsichtbar, Bots füllen es aus */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <Field label="Name" htmlFor="name">
        <input
          id="name"
          name="name"
          type="text"
          required
          minLength={2}
          autoComplete="name"
          className={inputClass}
        />
      </Field>

      <Field label="E-Mail" htmlFor="email">
        <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} />
      </Field>

      <Field label="Betreff" htmlFor="subject">
        <select id="subject" name="subject" defaultValue="Allgemein" className={inputClass}>
          <option>Frage zum Produkt</option>
          <option>Abholung</option>
          <option>Allgemein</option>
        </select>
      </Field>

      <Field label="Nachricht" htmlFor="message">
        <textarea id="message" name="message" required minLength={5} rows={5} className={inputClass} />
      </Field>

      <p className="text-xs text-[var(--color-muted-foreground)]">
        Mit dem Absenden werden Ihre Angaben zur Bearbeitung Ihrer Anfrage verwendet. Mehr dazu
        in unserer{" "}
        <a href="/datenschutz" className="underline hover:text-[var(--color-primary)]">
          Datenschutzerklärung
        </a>
        .
      </p>

      <Button type="submit" disabled={istVorschau || status === "submitting"}>
        {status === "submitting" ? "Wird gesendet …" : "Nachricht senden"}
      </Button>

      {status === "error" && (
        <p className="text-sm text-[var(--color-destructive)]">
          Da ist etwas schiefgelaufen. Bitte versuchen Sie es erneut oder rufen Sie uns an.
        </p>
      )}
    </form>
  );
}

const inputClass =
  "w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-2.5 text-base text-[var(--color-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]";

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div className="text-left">
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      {children}
    </div>
  );
}
