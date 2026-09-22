// Zentrale Datenquelle für Öffnungszeiten & Kontaktdaten.
// Wird in Startseite, Kontakt, Footer und LocalBusiness-Schema verwendet (docs/konzept.md, Abschnitt c).
// Platzhalter sind markiert und müssen vor Go-live final bestätigt werden (siehe docs/konzept.md, Abschnitt f).

export const businessInfo = {
  name: "Sybille's Nähparadies",
  slogan: "Ob Stoffe, Wolle, Nadel oder Faden – alles in Sybille's Laden",
  street: "Spargasse 5",
  postalCode: "97688",
  city: "Bad Kissingen",
  country: "DE",
  phone: "+49 160 97955075", // noch zu bestätigen
  email: "", // Platzhalter – fehlt noch
};

export const openingHours = [
  { day: "Montag", hours: "09:00–17:00 Uhr", schemaDay: "Monday", opens: "09:00", closes: "17:00" },
  { day: "Dienstag", hours: "09:00–17:00 Uhr", schemaDay: "Tuesday", opens: "09:00", closes: "17:00" },
  { day: "Mittwoch", hours: "09:00–17:00 Uhr", schemaDay: "Wednesday", opens: "09:00", closes: "17:00" },
  { day: "Donnerstag", hours: "09:00–17:00 Uhr", schemaDay: "Thursday", opens: "09:00", closes: "17:00" },
  { day: "Freitag", hours: "09:00–16:00 Uhr", schemaDay: "Friday", opens: "09:00", closes: "16:00" },
  { day: "Samstag", hours: "geschlossen", schemaDay: "Saturday", opens: null, closes: null },
  { day: "Sonntag", hours: "geschlossen", schemaDay: "Sunday", opens: null, closes: null },
] as const;
