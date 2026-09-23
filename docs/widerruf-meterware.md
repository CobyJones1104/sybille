# Entscheidungsvorlage: Widerrufsrecht bei zugeschnittener Meterware

**Zweck dieses Dokuments:** Die Frage so aufbereiten, dass ein Rechtstexte-Anbieter oder
eine Anwältin sie in wenigen Minuten beantworten kann – und dass danach im Shop nur noch
ein Schalter umgelegt werden muss.

> **Das hier ist keine Rechtsberatung und keine Einschätzung.** Die Frage ist in Deutschland
> nicht eindeutig geklärt, und wir sind nicht qualifiziert, sie zu entscheiden. Dieses
> Dokument sammelt nur, was für die Entscheidung gebraucht wird.

---

## 1. Worum geht es konkret?

Sybille schneidet Stoffe nach Kundenwunsch von der Rolle – in 0,5-Meter-Schritten, also
z. B. 1,5 m oder 3 m. Der Stoff selbst ist Standardware, nur der Zuschnitt erfolgt
individuell.

**Die Frage:** Zählt dieser Zuschnitt als Anfertigung „nach Kundenspezifikation", für die
das gesetzliche 14-tägige Widerrufsrecht im Fernabsatz entfallen kann (die einschlägige
Ausnahme steht in § 312g Abs. 2 BGB) – oder bleibt das Widerrufsrecht bestehen?

## 2. Warum das wichtig ist – in beide Richtungen

| Falsche Annahme | Mögliche Folge |
|---|---|
| Widerruf wird **zu Unrecht ausgeschlossen** | Die Belehrung ist fehlerhaft. Die Widerrufsfrist verlängert sich erheblich, und fehlerhafte Widerrufsbelehrungen sind ein klassischer Abmahngrund. |
| Widerruf wird **unnötig gewährt** | Zurückgeschickte Zuschnitte sind oft nicht mehr voll verkäuflich – wirtschaftlicher Schaden bei jeder Rücksendung. |

Beide Fehler kosten Geld. Deshalb lohnt die Klärung, bevor der Shop live geht.

## 3. Was in der Diskussion eine Rolle spielt

Diese Punkte tauchen in der Debatte auf und sollten der Rechtsberatung mitgegeben werden –
**nicht als unsere Bewertung, sondern als Sachverhalt:**

- Der Stoff ist **vorgefertigte Standardware**; individuell ist allein die Länge.
- Der Zuschnitt ist **nicht rückgängig zu machen** – ein 1,5-m-Stück lässt sich nicht
  wieder an die Rolle nähen.
- Ein zurückgegebener Zuschnitt ist **teilweise weiterverwendbar** (als Rest/Sonderposten),
  aber in der Regel nicht mehr zum vollen Meterpreis.
- Die **Schrittweite** (0,5 m) bedeutet: Es gibt nur wenige Standardlängen, keine
  beliebig krummen Maße.
- Für **Stückware** (Wolle, Knöpfe, Reißverschlüsse, Scheren) stellt sich die Frage nicht –
  dort gilt das Widerrufsrecht ganz normal.

## 4. Konkrete Fragen an die Rechtsberatung

1. Fällt das Zuschneiden von Meterware in 0,5-m-Schritten unter die Ausnahme vom
   Widerrufsrecht für kundenspezifisch angefertigte Waren?
2. Macht es einen Unterschied, ob nur feste Schritte (0,5 m) oder beliebige Längen
   möglich sind? Sollten wir die Schrittweite ändern?
3. Falls die Ausnahme greift: Wie und wo genau muss die Kundin **vor** dem Kauf darüber
   informiert werden (Produktseite, Warenkorb, Kasse)? Reicht ein Hinweis, oder ist eine
   aktive Bestätigung nötig?
4. Falls die Ausnahme **nicht** greift: Dürfen wir einen Wertersatz für die Wertminderung
   durch den Zuschnitt verlangen, und wie muss das formuliert sein?
5. Gibt es eine **Mindestlänge**, unterhalb derer die Einordnung anders ausfällt?
6. Wäre es rechtlich unbedenklich und praktisch sinnvoll, das Widerrufsrecht **freiwillig**
   zu gewähren, auch wenn es entfallen dürfte?

## 5. Vorbelegung bis zur Klärung: Widerruf gilt

Im Code ist bewusst die **vorsichtigere Variante** eingestellt: Das Widerrufsrecht gilt
auch für Meterware. Begründung: Ein zu Unrecht gewährter Widerruf ist ein wirtschaftliches
Ärgernis, ein zu Unrecht ausgeschlossener ein rechtliches Risiko.

Geschaltet wird das an genau einer Stelle:

```ts
// lib/widerruf.ts
export const meterwareWiderruf: MeterwareWiderrufVariante = "gilt";
//                                                          ^^^^^^
//   "gilt"           = Widerrufsrecht auch für Zuschnitte (aktuelle Vorbelegung)
//   "ausgeschlossen" = Zuschnitte vom Widerruf ausgenommen
```

## 6. Was der Schalter im Shop bewirkt

| Stelle | bei `"gilt"` | bei `"ausgeschlossen"` |
|---|---|---|
| Produktkarte (nur Meterware) | kein Sonderhinweis | Hinweis „Zuschnitt nach Maß – vom Widerruf ausgenommen" |
| Warenkorb | kein Sonderhinweis | Hinweis über den Positionen |
| Seite „Widerruf" | Abschnitt „gilt auch für Zuschnitte" | Abschnitt „Ausnahme für Zuschnitte" |

Der **verbindliche Rechtstext** kommt in beiden Fällen weiterhin vom Rechtstexte-Anbieter –
der Schalter steuert nur, welcher Hinweis im Shop erscheint und welcher Abschnitt
vorbereitet ist.

## 7. Nach der Klärung zu erledigen

- [ ] Antwort der Rechtsberatung hier festhalten (Datum, wer, Ergebnis)
- [ ] `lib/widerruf.ts` auf das Ergebnis setzen
- [ ] Widerrufsbelehrung und Muster-Widerrufsformular vom Rechtstexte-Anbieter einsetzen
      (siehe `app/widerruf/page.tsx`)
- [ ] Falls ausgeschlossen: Prüfen, ob Shopifys Checkout den Hinweis ebenfalls anzeigen muss
- [ ] Offene Frage 5a in `docs/konzept.md` abhaken
