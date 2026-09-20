/* ترخيم — شِل موحّد لكل الصفحات: قائمة الموبايل + شريط التابات + الفوتر.
   كانت كل صفحة تحمل نسخة مختلفة، وبعضها يشير لأقسام لم تعد موجودة في البيانات.
   كل رابط هنا شغّال فعلاً: الروابط العميقة للمتجر تستخدم ?a= و ?z= و ?m= التي يقرأها shop.js.
   بيانات الاتصال غير المؤكدة تُكتب بين [أقواس] لتُستبدل بسهولة. */
const fs = require("fs");
const path = require("path");
const dir = __dirname;

/* نفس ترتيب النڤ العلوي: اكتشف ← افهم ← اطبخ ← اشترِ */
const MNAV_BODY = `
<nav><a href="cuts.html">دليل القطعيات</a><a href="dish.html?d=kabsa">وش تطبخ</a><a href="cook.html">مختبر الطبخ</a><a href="library.html">المكتبة</a><a href="category.html">المتجر</a><a href="wishlist.html">المفضلة</a><a href="account.html">حسابي</a></nav>
<div class="mnav__foot"><a class="btn btn--block" href="account.html">تسجيل الدخول</a></div></aside>`;

const I = {
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5.5 9.5V21h13V9.5"/></svg>',
  cuts: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="1"/><path d="M7 16c2-4 4-6.6 5.4-8.8M11 17.4c1.8-3.6 3.5-5.9 4.8-8"/></svg>',
  wish: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21l7.7-7.6 1.1-1a5.5 5.5 0 0 0 0-7.8Z"/></svg>',
  cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.4 12.4a2 2 0 0 0 2 1.6h8.5a2 2 0 0 0 2-1.6L23 7H6"/></svg>',
  acc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.6"/><path d="M4.5 20.5c1.3-3.8 4.1-5.6 7.5-5.6s6.2 1.8 7.5 5.6"/></svg>'
};

/* الصفحة النشطة في شريط التابات: أي صفحة معرفية تُحسب ضمن "القطعيات" */
const TAB_OF = {
  "index.html": "index.html",
  "wishlist.html": "wishlist.html",
  "account.html": "account.html",
  "checkout.html": "account.html"
};
const tabbar = file => {
  const on = TAB_OF[file] || "cuts.html";
  const a = (href, icon, label) =>
    `\n  <a class="tabbar__i${on === href ? " active" : ""}" href="${href}">${icon}<span>${label}</span></a>`;
  return `<nav class="tabbar" id="tabbar" aria-label="تنقّل سريع">` +
    a("index.html", I.home, "الرئيسية") +
    a("cuts.html", I.cuts, "القطعيات") +
    a("wishlist.html", I.wish, "المفضلة") +
    `\n  <button class="tabbar__i" id="tabCart" type="button">${I.cart}<span class="tb-badge" id="tabCartBadge">0</span><span>السلة</span></button>` +
    a("account.html", I.acc, "حسابي") +
    `\n</nav>`;
};

const FOOTER = `<footer class="footer"><div class="wrap"><div class="footer__top">
  <div class="footer__brand">
    <span class="brand"><svg class="mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="2.5" y="2.5" width="19" height="19"/><path d="M6.5 16.5c2-4 4.2-6.6 5.6-9M10.4 18.2c1.9-3.9 3.8-6.4 5.2-8.8M14.6 18.6c1.4-2.9 2.4-4.4 3.3-5.8"/></svg><span class="wordmark">ترخيم<small>TARKHEEM</small></span></span>
    <p>مرجع اللحوم: نشرح القطعة، ومن أين تأتي، وكيف تُطبخ — ثم نبيعها لك.</p>
    <div class="meta"><span>المدينة: <b>[المدينة]</b></span><span>للطلبات: <b>[الرقم الموحّد]</b></span><span>السجل التجاري: <b>[رقم السجل]</b></span></div>
    <div class="social"><span class="sq"></span><span class="sq"></span><span class="sq"></span><span class="sq"></span></div>
  </div>
  <div class="fcol"><h4>المرجع</h4><ul><li><a href="cuts.html">مخطط الذبيحة</a></li><li><a href="cook.html">مختبر الطبخ</a></li><li><a href="cook.html#doneness">درجات النضج</a></li><li><a href="library.html">المكتبة</a></li></ul></div>
  <div class="fcol"><h4>وش تطبخ</h4><ul><li><a href="dish.html?d=kabsa">كبسة</a></li><li><a href="dish.html?d=mandi">مندي</a></li><li><a href="dish.html?d=mashawi">مشاوي</a></li><li><a href="dish.html?d=steak">ستيك</a></li></ul></div>
  <div class="fcol"><h4>تسوّق</h4><ul><li><a href="category.html">كل القطعيات</a></li><li><a href="category.html?a=%D8%B6%D8%A3%D9%86">لحم الضأن</a></li><li><a href="category.html?a=%D8%A8%D9%82%D8%B1">لحم البقر</a></li><li><a href="category.html?m=grill">الأنسب للشوي</a></li><li><a href="category.html?m=slow">الأنسب للطبخ البطيء</a></li></ul></div>
  <div class="fcol"><h4>حسابي</h4><ul><li><a href="account.html">لوحة الحساب</a></li><li><a href="wishlist.html">المفضلة</a></li><li><a href="checkout.html">إتمام الطلب</a></li></ul>
    <div class="footer__pay"><b>طرق الدفع</b><div class="row"><span class="pm"></span><span class="pm"></span><span class="pm"></span><span class="pm"></span></div></div></div>
</div><div class="footer__bottom"><span>© 2026 ترخيم — جميع الحقوق محفوظة</span><span>المملكة العربية السعودية</span></div></div></footer>`;

/* الشريط العلوي: كان يعد بهدية 300 ر.س وتطبيق غير موجودين.
   لا نعد بما لا نملك — نقول ما نقدّمه فعلاً، والاتصال يبقى [قوساً] يُستبدل. */
const UTIL = `<div class="util"><div class="wrap"><div class="u-l"><span class="promo">كل قطعة عندنا لها صفحة تشرحها: من أين تأتي وكيف تُطبخ</span><span>[الرقم الموحّد]</span></div><div class="u-r"><a href="cuts.html">دليل القطعيات</a><a href="cook.html">مختبر الطبخ</a><a href="account.html">تتبّع طلبك</a></div></div></div>`;

const SEARCH_PH = "دوّر على قطعة… ريش، فخذ، ريب آي، موزة…";

/* عناوين ووصف الصفحات التي بُنيت قبل إعادة التموضع */
const HEAD = {
  "wishlist.html": ["المفضلة — قطعياتك المحفوظة · ترخيم", "القطعيات التي حفظتها للرجوع إليها — مع كودها ومنشئها وسعرها."],
  "checkout.html": ["إتمام الطلب · ترخيم", "أكمل طلبك: التواصل، عنوان التوصيل، الموعد، وطريقة الدفع."],
  "account.html": ["حسابي — الطلبات والعناوين · ترخيم", "لوحة حسابك في ترخيم: طلباتك، عناوين التوصيل، والإعدادات."]
};

/* أيقونة التبويب: نفس علامة ترخيم (خطوط القطع داخل مربع) — تمنع طلب favicon.ico الفاشل */
const FAVICON = `<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' fill='%236B1D24'/%3E%3Cg fill='none' stroke='%23F4F1EA' stroke-width='1.6'%3E%3Cpath d='M6.5 16.5c2-4 4.2-6.6 5.6-9M10.4 18.2c1.9-3.9 3.8-6.4 5.2-8.8M14.6 18.6c1.4-2.9 2.4-4.4 3.3-5.8'/%3E%3C/g%3E%3C/svg%3E">`;

/* الشريط العلوي يسبق <header> مباشرة في كل الصفحات، فنقطع عنده بدل عدّ الـ</div>
   — العدّ كان يتجاوز حدّ الشريط في الصفحات المنسّقة على أكثر من سطر. */
const RX = {
  util: /<div class="util">[\s\S]*?(?=<header)/,
  mnavBody: /(<aside class="mnav"[\s\S]*?<\/div>)[\s\S]*?<\/aside>/,
  tabbar: /<nav class="tabbar"[\s\S]*?<\/nav>/,
  footer: /<footer class="footer">[\s\S]*?<\/footer>/
};

fs.readdirSync(dir).filter(f => f.endsWith(".html") && f !== "product.html").forEach(f => {
  const p = path.join(dir, f);
  let s = fs.readFileSync(p, "utf8");
  const before = s.length;
  const missing = Object.keys(RX).filter(k => !RX[k].test(s));
  if (missing.length) throw new Error(f + " — missing shell block(s): " + missing.join(", "));

  s = s.replace(RX.util, UTIL + "\n\n")
       .replace(RX.mnavBody, "$1" + MNAV_BODY)
       .replace(RX.tabbar, tabbar(f))
       .replace(RX.footer, FOOTER)
       .replace(/(<input type="text" placeholder=")[^"]*(" aria-label="بحث")/g, "$1" + SEARCH_PH + "$2");

  s = s.replace(/\n?<link rel="icon"[^>]*>/, "")
       .replace(/(<meta name="theme-color"[^>]*>)/, "$1\n" + FAVICON);

  const h = HEAD[f];
  if (h) {
    s = s.replace(/<title>[\s\S]*?<\/title>/, "<title>" + h[0] + "</title>");
    s = /<meta name="description"/.test(s)
      ? s.replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="' + h[1] + '">')
      : s.replace(/(<\/title>)/, '$1\n<meta name="description" content="' + h[1] + '">');
  }

  /* حارس: ريجكس طمّاع قد يبتلع نصف الصفحة بصمت. لا نكتب إلا إذا بقي الحجم معقولاً. */
  if (s.length < before * 0.75)
    throw new Error(f + " — refusing to write: " + before + " → " + s.length + " chars (a pattern over-matched)");

  fs.writeFileSync(p, s);
  console.log("  ✓ " + f + "  (" + before + " → " + s.length + ")");
});
console.log("shell unified (util + mnav + tabbar + footer + search + head)");
