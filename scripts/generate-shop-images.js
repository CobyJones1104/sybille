// Erzeugt SVG-Grafiken für Kategorien und Produkte (keine Fotos, eigene Zeichnungen).
const fs = require("fs");
const path = require("path");

const OUT = "/home/user/sybille/public/images/shop";
fs.mkdirSync(OUT, { recursive: true });

const weave = (id, color = "#000", opacity = 0.07) => `
  <pattern id="${id}" width="6" height="6" patternUnits="userSpaceOnUse">
    <path d="M0 0h6v6H0z" fill="none"/>
    <path d="M0 3h6M3 0v6" stroke="${color}" stroke-opacity="${opacity}" stroke-width="1"/>
  </pattern>`;

function svg(w, h, defs, body, bg) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
<defs>${defs}</defs>
<rect width="${w}" height="${h}" fill="${bg}"/>
${body}
</svg>`;
}

// --- Stoffmuster ---------------------------------------------------------
function floral(w, h, bg, petal, leaf, center) {
  const defs = `
  <pattern id="fl" width="60" height="60" patternUnits="userSpaceOnUse">
    <g transform="translate(30,30)">
      ${[0, 72, 144, 216, 288]
        .map((a) => `<ellipse cx="0" cy="-11" rx="5.5" ry="10" fill="${petal}" transform="rotate(${a})"/>`)
        .join("")}
      <circle r="4.5" fill="${center}"/>
    </g>
    <g transform="translate(0,0)">
      ${[0, 72, 144, 216, 288]
        .map((a) => `<ellipse cx="0" cy="-7" rx="3.5" ry="6.5" fill="${petal}" opacity=".65" transform="rotate(${a})"/>`)
        .join("")}
    </g>
    <path d="M44 6c6 4 8 10 6 16-6 1-11-3-12-9 2-4 4-6 6-7z" fill="${leaf}" opacity=".8"/>
    <path d="M12 44c6 3 9 9 7 15-6 1-11-3-13-9 2-3 4-5 6-6z" fill="${leaf}" opacity=".6"/>
  </pattern>
  ${weave("wv")}`;
  return svg(w, h, defs, `<rect width="${w}" height="${h}" fill="url(#fl)"/><rect width="${w}" height="${h}" fill="url(#wv)"/>`, bg);
}

function knit(w, h, bg, stitch) {
  const defs = `
  <pattern id="kn" width="16" height="20" patternUnits="userSpaceOnUse">
    <path d="M8 0C3 5 3 15 8 20M8 0c5 5 5 15 0 20" fill="none" stroke="${stitch}" stroke-width="2.2" stroke-linecap="round" opacity=".55"/>
    <path d="M0 10c4-5 4-5 8 0M16 10c-4-5-4-5-8 0" fill="none" stroke="${stitch}" stroke-width="1.6" opacity=".35"/>
  </pattern>`;
  return svg(w, h, defs, `<rect width="${w}" height="${h}" fill="url(#kn)"/>`, bg);
}

function stripes(w, h, bg, c1, c2) {
  const defs = `
  <pattern id="st" width="46" height="46" patternUnits="userSpaceOnUse">
    <rect width="46" height="46" fill="none"/>
    <rect x="0" width="14" height="46" fill="${c1}" opacity=".85"/>
    <rect x="20" width="5" height="46" fill="${c2}" opacity=".7"/>
    <rect x="31" width="2.5" height="46" fill="${c2}" opacity=".45"/>
  </pattern>
  ${weave("wv")}`;
  return svg(w, h, defs, `<rect width="${w}" height="${h}" fill="url(#st)"/><rect width="${w}" height="${h}" fill="url(#wv)"/>`, bg);
}

function gingham(w, h, bg, c) {
  const defs = `
  <pattern id="gh" width="40" height="40" patternUnits="userSpaceOnUse">
    <rect width="20" height="40" fill="${c}" opacity=".45"/>
    <rect width="40" height="20" fill="${c}" opacity=".45"/>
    <rect width="20" height="20" fill="${c}" opacity=".85"/>
  </pattern>`;
  return svg(w, h, defs, `<rect width="${w}" height="${h}" fill="url(#gh)"/>`, bg);
}

function felt(w, h, bg, fleck) {
  const rnd = (seed) => {
    let x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };
  let dots = "";
  for (let i = 0; i < 260; i++) {
    const x = rnd(i * 1.3) * w;
    const y = rnd(i * 2.7 + 5) * h;
    const r = 0.8 + rnd(i * 3.1) * 1.6;
    dots += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="${fleck}" opacity="${(0.12 + rnd(i * 4.4) * 0.22).toFixed(2)}"/>`;
  }
  return svg(w, h, `${weave("wv", "#fff", 0.05)}`, `${dots}<rect width="${w}" height="${h}" fill="url(#wv)"/>`, bg);
}

// --- Objekte -------------------------------------------------------------
// Gewickeltes Wollknäuel: mehrere gegeneinander verdrehte Bündel paralleler
// Fäden, an der Kugel beschnitten – erst dadurch wirkt es wie echte Wicklung.
function yarnBall(w, h, bg, colors) {
  const cx = w / 2;
  const cy = h / 2;
  const r = Math.min(w, h) * 0.32;

  const bundle = (angle, color, gap, width, phase) => {
    const lines = [];
    for (let y = -r * 1.1 + phase; y < r * 1.1; y += gap) {
      const bend = (1 - Math.abs(y) / (r * 1.15)) * r * 0.42;
      lines.push(
        `<path d="M${-r * 1.2} ${y.toFixed(1)} Q 0 ${(y - bend).toFixed(1)} ${r * 1.2} ${y.toFixed(1)}"
               fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round"/>`
      );
    }
    return `<g transform="rotate(${angle})">${lines.join("")}</g>`;
  };

  const base = colors[0];
  const groups = colors
    .map((c, i) => bundle(-38 + i * 47, c, 11 + i * 1.5, 6.5 - i * 0.4, i * 3))
    .join("");

  return svg(
    w,
    h,
    `<clipPath id="cp"><circle cx="0" cy="0" r="${r}"/></clipPath>
     <radialGradient id="sh" cx="35%" cy="30%" r="80%">
       <stop offset="0%" stop-color="#fff" stop-opacity=".35"/>
       <stop offset="55%" stop-color="#fff" stop-opacity="0"/>
       <stop offset="100%" stop-color="#000" stop-opacity=".22"/>
     </radialGradient>`,
    `<ellipse cx="${cx}" cy="${cy + r * 0.95}" rx="${r * 0.8}" ry="${r * 0.14}" fill="#000" opacity=".1"/>
     <g transform="translate(${cx} ${cy})">
       <circle r="${r}" fill="${base}"/>
       <g clip-path="url(#cp)">${groups}</g>
       <circle r="${r}" fill="url(#sh)"/>
     </g>
     <path d="M${cx + r * 0.8} ${cy + r * 0.55} c 18 12, 34 10, 44 -6"
           fill="none" stroke="${colors[colors.length - 1]}" stroke-width="5.5" stroke-linecap="round"/>`,
    bg
  );
}

function buttons(w, h, bg, face, rim) {
  const b = (cx, cy, r) => `
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="${face}"/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${rim}" stroke-width="2" opacity=".5"/>
    <circle cx="${cx}" cy="${cy}" r="${r * 0.68}" fill="none" stroke="${rim}" stroke-width="1.5" opacity=".35"/>
    ${[
      [-1, -1],
      [1, -1],
      [-1, 1],
      [1, 1],
    ]
      .map(([dx, dy]) => `<circle cx="${cx + dx * r * 0.28}" cy="${cy + dy * r * 0.28}" r="${r * 0.11}" fill="${rim}" opacity=".7"/>`)
      .join("")}`;
  return svg(
    w,
    h,
    "",
    `${b(w * 0.36, h * 0.42, Math.min(w, h) * 0.2)}
     ${b(w * 0.63, h * 0.38, Math.min(w, h) * 0.14)}
     ${b(w * 0.52, h * 0.68, Math.min(w, h) * 0.16)}`,
    bg
  );
}

function zipper(w, h, bg, tape, metal) {
  const cx = w / 2;
  const teeth = [];
  for (let y = h * 0.12; y < h * 0.88; y += 13) {
    teeth.push(
      `<rect x="${cx - 15}" y="${y}" width="13" height="7" rx="2.5" fill="${metal}"/>
       <rect x="${cx + 2}" y="${y + 6}" width="13" height="7" rx="2.5" fill="${metal}" opacity=".85"/>`
    );
  }
  return svg(
    w,
    h,
    "",
    `<rect x="${cx - 46}" y="${h * 0.08}" width="34" height="${h * 0.84}" rx="4" fill="${tape}"/>
     <rect x="${cx + 12}" y="${h * 0.08}" width="34" height="${h * 0.84}" rx="4" fill="${tape}"/>
     ${teeth.join("")}
     <rect x="${cx - 13}" y="${h * 0.52}" width="26" height="30" rx="7" fill="${metal}"/>
     <path d="M${cx} ${h * 0.82} v 22" stroke="${metal}" stroke-width="4" stroke-linecap="round"/>
     <rect x="${cx - 9}" y="${h * 0.86}" width="18" height="26" rx="5" fill="none" stroke="${metal}" stroke-width="4"/>`,
    bg
  );
}

function scissors(w, h, bg, blade, handle) {
  const cx = w / 2;
  const cy = h / 2;
  return svg(
    w,
    h,
    "",
    `<g transform="translate(${cx} ${cy}) rotate(-20)">
      <path d="M-4 -70 L 6 -70 L 14 18 L -2 18 Z" fill="${blade}"/>
      <path d="M-14 -68 L -4 -68 L 2 18 L -14 18 Z" fill="${blade}" opacity=".78"/>
      <circle cx="0" cy="24" r="7" fill="${handle}"/>
      <ellipse cx="-22" cy="52" rx="17" ry="23" fill="none" stroke="${handle}" stroke-width="9" transform="rotate(-16 -22 52)"/>
      <ellipse cx="22" cy="52" rx="17" ry="23" fill="none" stroke="${handle}" stroke-width="9" transform="rotate(16 22 52)"/>
    </g>`,
    bg
  );
}

function patternPaper(w, h, bg, line, accent) {
  return svg(
    w,
    h,
    `<pattern id="gr" width="22" height="22" patternUnits="userSpaceOnUse">
      <path d="M22 0H0v22" fill="none" stroke="${line}" stroke-opacity=".25" stroke-width="1"/>
     </pattern>`,
    `<rect width="${w}" height="${h}" fill="url(#gr)"/>
     <path d="M${w * 0.2} ${h * 0.78} C ${w * 0.26} ${h * 0.3}, ${w * 0.52} ${h * 0.18}, ${w * 0.74} ${h * 0.3}
              L ${w * 0.8} ${h * 0.76} Z" fill="none" stroke="${accent}" stroke-width="3" stroke-dasharray="9 7" stroke-linejoin="round"/>
     <circle cx="${w * 0.2}" cy="${h * 0.78}" r="4" fill="${accent}"/>
     <circle cx="${w * 0.8}" cy="${h * 0.76}" r="4" fill="${accent}"/>`,
    bg
  );
}

function needlesThread(w, h, bg, metal, thread) {
  const cx = w / 2;
  const cy = h / 2;
  // Garnrolle mit aufgewickeltem Faden plus Nadel
  const winds = [];
  for (let y = -34; y <= 34; y += 6) {
    winds.push(
      `<path d="M-26 ${y} q 26 ${y > 0 ? -4 : 4} 52 0" fill="none" stroke="${thread}" stroke-width="5" stroke-linecap="round" opacity="${(0.55 + Math.random() * 0.35).toFixed(2)}"/>`
    );
  }
  return svg(
    w,
    h,
    "",
    `<g transform="translate(${cx - 46} ${cy})">
       <rect x="-34" y="-52" width="68" height="14" rx="5" fill="#c9b294"/>
       <rect x="-34" y="38" width="68" height="14" rx="5" fill="#c9b294"/>
       <rect x="-28" y="-40" width="56" height="80" fill="${thread}" opacity=".25"/>
       ${winds.join("")}
     </g>
     <g transform="translate(${cx + 62} ${cy}) rotate(22)">
       <path d="M0 -76 L 4.5 -62 L 4.5 66 L -4.5 66 L -4.5 -62 Z" fill="${metal}"/>
       <ellipse cx="0" cy="-46" rx="2.4" ry="10" fill="${bg}"/>
     </g>
     <path d="M${cx - 8} ${cy - 44} c 30 -10, 52 4, 66 -8" fill="none" stroke="${thread}" stroke-width="4" stroke-linecap="round"/>`,
    bg
  );
}

// --- Ausgabe -------------------------------------------------------------
const P = 400;
const Q = 300;
const C = 240;

const files = {
  // Kategorien (quadratisch)
  "kategorie-stoffe.svg": floral(C, C, "#cfd9e6", "#7a9ec4", "#6f8f5f", "#f0e6d2"),
  "kategorie-wolle-garne.svg": yarnBall(C, C, "#f1e7d8", ["#a85c1a", "#d59a5c"]),
  "kategorie-kurzwaren.svg": buttons(C, C, "#efe4d3", "#fbf7f0", "#8a7358"),
  "kategorie-reissverschluesse.svg": zipper(C, C, "#efe4d3", "#4a4038", "#b9a894"),
  "kategorie-naehzubehoer.svg": scissors(C, C, "#efe4d3", "#9aa3ab", "#a85c1a"),
  "kategorie-schnittmuster.svg": patternPaper(C, C, "#fbf7f0", "#8a7358", "#a85c1a"),

  // Produkte (4:3)
  "baumwollstoff-blumenwiese-blau.svg": floral(P, Q, "#c3d4e8", "#6f97c6", "#71915f", "#f3ead6"),
  "jersey-uni-anthrazit.svg": knit(P, Q, "#3c3f44", "#8d949c"),
  "walkstoff-tannengruen.svg": felt(P, Q, "#2f4a37", "#9dc0a5"),
  "dekostoff-streifen-natur.svg": stripes(P, Q, "#efe3cf", "#c9b294", "#8a7358"),
  "sockenwolle-bunt-melange.svg": yarnBall(P, Q, "#f1e7d8", ["#a85c1a", "#6b7b3c", "#b9455a", "#3f6ea8"]),
  "babywolle-weiss-weich.svg": yarnBall(P, Q, "#f1e7d8", ["#f7f3ec", "#ded2c0"]),
  "perlmuttknoepfe-15mm-set.svg": buttons(P, Q, "#efe4d3", "#fdfbf7", "#9b8a74"),
  "baumwollband-karo-rot.svg": gingham(P, Q, "#f7f1e6", "#b3453f"),
  "reissverschluss-teilbar-60cm-schwarz.svg": zipper(P, Q, "#efe4d3", "#2c2925", "#b9a894"),
  "schneiderschere-profi-25cm.svg": scissors(P, Q, "#efe4d3", "#98a1a9", "#a85c1a"),
  "naehnadeln-faden.svg": needlesThread(P, Q, "#efe4d3", "#a9b2ba", "#a85c1a"),

  // Freigestellte Varianten (transparenter Hintergrund) für Overlays auf farbigen Flächen
  "schere-freigestellt.svg": scissors(C, C, "none", "#d8dde2", "#e7bb8a"),
  "wollknaeuel-freigestellt.svg": yarnBall(C, C, "none", ["#a85c1a", "#d59a5c"]),
};

for (const [name, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(OUT, name), content);
  console.log("geschrieben:", name);
}
