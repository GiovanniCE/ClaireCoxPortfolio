export const formatDate = (iso: string) => {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
};

export const profileInitials = (name: string) =>
    name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

// SVG placeholder with safe text wrapping using <foreignObject>.
// - "watermark": faint, multi‑line, clamped title inside the art (3 lines)
// - "caption": semi‑opaque band at the bottom (2 lines)
export function makeCardPlaceholder(title: string, mode: 'watermark' | 'caption' = 'watermark') {
    const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    const enc = encodeURIComponent;

    const baseTop = `
<defs>
<linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>
<stop offset='0%' stop-color='#e9efff'/>
<stop offset='100%' stop-color='#ffe5ef'/>
</linearGradient>
</defs>
<rect width='100%' height='100%' rx='24' ry='24' fill='url(#g)'/>
`;

    const watermark = `
<foreignObject x='24' y='24' width='752' height='372'>
<div xmlns='http://www.w3.org/1999/xhtml'
style="
font: 600 28px system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;
color:#0f172a; opacity:.30; line-height:1.2;
display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical;
overflow:hidden; word-wrap:break-word; hyphens:auto;">
${esc(title)}
</div>
</foreignObject>`;

    const caption = `
<rect x='0' y='320' width='800' height='100' rx='0' ry='0' fill='#0f172a' fill-opacity='.55'/>
<foreignObject x='24' y='336' width='752' height='72'>
<div xmlns='http://www.w3.org/1999/xhtml'
style="
font: 700 22px system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;
color:white; line-height:1.25;
display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical;
overflow:hidden; word-wrap:break-word; hyphens:auto;">
${esc(title)}
</div>
</foreignObject>`;

    const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 420'>
${baseTop}
${mode === 'caption' ? caption : watermark}
</svg>`;

    return `data:image/svg+xml;charset=utf-8,${enc(svg)}`;
}