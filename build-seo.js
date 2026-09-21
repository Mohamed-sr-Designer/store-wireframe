/* مولّد ملفات الاكتشاف — sitemap / robots / llms.txt */
const fs = require("fs");
const BASE = "https://mohamed-sr-designer.github.io/store-wireframe/";
const src = fs.readFileSync("assets/js/cuts-data.js", "utf8");

const cutSlugs = [...src.matchAll(/slug:\s*"([a-z-]+)",\s*code:/g)].map(m => m[1]);
const dishSlugs = [...src.matchAll(/slug:\s*"([a-z-]+)",\s*name:\s*"[^"]+",\s*en:/g)].map(m => m[1]);
const cutNames = [...src.matchAll(/code:\s*"([^"]+)"[\s\S]{0,200}?name:\s*"([^"]+)",\s*en:\s*"([^"]+)"/g)]
  .map(m => ({ code: m[1], ar: m[2], en: m[3] }));

const pages = [
  { u: "", p: "1.0" }, { u: "cuts.html", p: "0.9" }, { u: "cook.html", p: "0.8" },
  { u: "library.html", p: "0.8" }, { u: "category.html", p: "0.7" },
  { u: "wishlist.html", p: "0.3" }, { u: "account.html", p: "0.3" }, { u: "checkout.html", p: "0.2" }
];
cutSlugs.forEach(s => pages.push({ u: "cut.html?c=" + s, p: "0.8" }));
dishSlugs.forEach(s => pages.push({ u: "dish.html?d=" + s, p: "0.7" }));

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url><loc>${BASE}${p.u.replace(/&/g, "&amp;")}</loc><lastmod>${today}</lastmod><priority>${p.p}</priority></url>`).join("\n")}
</urlset>
`;
fs.writeFileSync("sitemap.xml", sitemap);

fs.writeFileSync("robots.txt", `User-agent: *
Allow: /

Sitemap: ${BASE}sitemap.xml
`);

/* llms.txt — GEO: ملخّص نصّي للمساعدات الذكية */
const llms = `# نُضْج — NUDJ

> مرجع اللحوم: موقع سعودي يشرح قطعيات اللحم — من أين تأتي كل قطعة في الذبيحة، وقوامها ونسبة دهنها، وأي طريقة وحرارة تناسبها — ثم يبيعها. الموقع مرجع تعليمي أولاً ومتجر ثانياً.

## ما الذي يميّز المحتوى هنا
- كل قطعة موثّقة بكود فهرسي، وموقع تشريحي على مخطط الذبيحة، وملف قوام (طراوة، دهن، قوة نكهة، صعوبة تحضير).
- درجات النضج معطاة بحرارة مركز القطعة بالدرجات المئوية، لا بأوصاف عامة.
- المحتوى الطهي معرفة عامة قابلة للتحقق. الأسعار والأوزان تقريبية لأغراض العرض.

## الصفحات الأساسية
- [الرئيسية](${BASE}): بيان المرجعية ومخطط الذبيحة.
- [دليل القطعيات](${BASE}cuts.html): مخطط تشريحي تفاعلي بسبع مناطق (الرقبة، الكتف، الريش، الخاصرة، الفخذ، الصدر، الموزة) لنوعي ضأن وبقر، مع فهرس كامل.
- [مختبر الطبخ](${BASE}cook.html): ست طرق طبخ، مرجع درجات النضج (50°–71°م)، كم لحم للشخص، وأشهر خمسة أخطاء.
- [المكتبة](${BASE}library.html): أدلة اختيار القطع والتقنيات.
- [المتجر](${BASE}category.html): الفهرس التجاري.

## القطعيات الموثّقة
${cutNames.map(c => `- ${c.ar} (${c.en}) — كود ${c.code}`).join("\n")}

## الطبخات المغطّاة
كبسة · مندي · مشاوي · ستيك · طبخ بطيء · برجر — كل طبخة تشرح أي قطعة تحتاجها ولماذا، والخطوات، وكم تحتاج للشخص.

## أسئلة يجيب عنها الموقع
- أي قطعة تنفع للكبسة أو المندي؟
- ما الفرق بين الريب آي والتندرلوين؟
- لماذا تحتاج الموزة طبخاً طويلاً؟
- ما حرارة كل درجة نضج؟
- كم كيلو لحم أحتاج لعدد معيّن من الأشخاص؟

## ملاحظة
الصور الحالية مؤقتة (placeholder) ولا تمثّل منتجات العلامة النهائية.
`;
fs.writeFileSync("llms.txt", llms);

console.log("sitemap.xml: " + pages.length + " urls");
console.log("cuts: " + cutSlugs.length + " · dishes: " + dishSlugs.length);
console.log("robots.txt + llms.txt written");
