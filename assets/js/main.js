/* =========================================================
   Meat-store Wireframe · interactions (Saudi content)
   ========================================================= */
(function () {
  "use strict";

  const P = (id, name, cat, price, old) => ({ id, name, cat, price, old, off: old ? Math.round((1 - price / old) * 100) : 0, rating: (Math.round((38 + Math.random() * 12)) / 10), reviews: Math.floor(6 + Math.random() * 400) });

  const BEST = [
    P("b1", "بوكس نعيمي بلدي صغير", "بلدي ومرابي", 550, 805),
    P("b2", "بوكس حري محلي كبير", "محلي", 950, 1282),
    P("b3", "مفروم الحري 3 كيلو", "مفروم", 299, 517),
    P("b4", "بوكس سواكني محلي صغير", "سواكني", 450, 899),
    P("b5", "بوكس رفيدي محلي كبير", "رفيدي", 800, 1600),
    P("b6", "نعيمي كشميري مقطّع", "نعيمي كشميري", 620, 780),
    P("b7", "ربع حاشي بلدي", "حاشي", 1190, 1400),
    P("b8", "بوكس العائلة المشكّل", "بوكسات", 720, 950),
    P("b9", "لحم عجل بلدي مشكّل", "عجل", 480, 620),
    P("b10", "كبدة وسواقط طازجة", "طازج", 45, 60)
  ];
  const DISC = [
    P("d1", "مفروم الحري 6 كيلو", "مفروم", 550, 690),
    P("d2", "بوكس رفيدي محلي صغير", "رفيدي", 450, 899),
    P("d3", "بوكس سواكني محلي كبير", "سواكني", 800, 1600),
    P("d4", "بوكس حري محلي صغير", "محلي", 550, 805),
    P("d5", "بوكس نعيمي جذع بلدي 100%", "بلدي ومرابي", 805, 1150),
    P("d6", "حري بلدي مقطّع — كيلو", "مفروم", 62, 85),
    P("d7", "ذبيحة نعيمي كاملة", "بلدي ومرابي", 899, 1200),
    P("d8", "شقف حاشي طازج", "حاشي", 240, 320),
    P("d9", "كبسة لحم جاهزة", "المطبخ", 180, 240),
    P("d10", "بوكس نجدي مميّز", "بلدي ومرابي", 650, 820)
  ];
  const OFFERS = [
    P("o1", "بوكس المناسبات الكبير", "بوكسات", 1450, 1800),
    P("o2", "وليمة نعيمي كاملة", "المطبخ", 1290, 1600),
    P("o3", "بوكس المشاوي الجاهزة", "بوكسات", 210, 280),
    P("o4", "بوكس ستيك عجل", "عجل", 320, 410),
    P("o5", "بوكس مفروم مشكّل", "مفروم", 260, 340),
    P("o6", "بوكس الشوي العائلي", "بوكسات", 390, 520),
    P("o7", "ربع عجل بلدي", "عجل", 620, 780),
    P("o8", "بوكس الكبدة والطحال", "طازج", 55, 75),
    P("o9", "بوكس نعيمي هدية", "بلدي ومرابي", 560, 700),
    P("o10", "بوكس سواكني مرابي", "سواكني", 690, 880)
  ];
  const SHELF1 = [
    P("s1", "بوكس نعيمي بلدي صغير", "بلدي", 550, 805),
    P("s2", "بوكس نعيمي جذع بلدي 100%", "بلدي", 805, 1150),
    P("s3", "حري بلدي 100%", "بلدي", 550, 690),
    P("s4", "بوكس حري محلي كبير", "محلي", 950, 1282),
    P("s5", "بوكس نجدي بلدي", "بلدي", 650, 820),
    P("s6", "ذبيحة بلدي كاملة", "بلدي", 899, 1150)
  ];
  const SHELF2 = [
    P("k1", "بوكس سواكني محلي صغير", "سواكني", 450, 899),
    P("k2", "بوكس سواكني محلي كبير", "سواكني", 800, 1600),
    P("k3", "نعيمي كشميري مقطّع", "كشميري", 620, 780),
    P("k4", "بوكس رفيدي محلي صغير", "رفيدي", 450, 899),
    P("k5", "بوكس رفيدي محلي كبير", "رفيدي", 800, 1600),
    P("k6", "سواكني مرابي مميّز", "مرابي", 690, 880)
  ];
  const KITCHEN = [
    P("kt1", "وليمة نعيمي كاملة مع الطبخ", "الولائم", 1290, 1600),
    P("kt2", "مندي لحم حاشي", "الإيدامات", 120, 160),
    P("kt3", "قرصان نجدي", "الإيدامات", 95, 130),
    P("kt4", "مرقوق لحم", "الإيدامات", 85, 110),
    P("kt5", "سلطة سعودية كبيرة", "السلطات", 35, 50),
    P("kt6", "كنافة بالقشطة", "الحلا", 60, 80)
  ];

  const money = n => Number(n).toLocaleString("en-US");
  const stars = (r, rev) => `<div class="stars"><span class="s">${"★".repeat(Math.round(r))}${"☆".repeat(5 - Math.round(r))}</span><b>${r.toFixed(1)}</b><span>(${rev})</span></div>`;

  function cardHTML(p) {
    const badges = [];
    if (p.off) badges.push(`<span class="tag-off">%${p.off}-</span>`);
    return `<article class="pcard">
      <div class="pcard__media">
        <div class="pcard__badges">${badges.join("")}</div>
        <button class="wish" type="button" aria-label="المفضلة"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21l7.7-7.6 1.1-1a5.5 5.5 0 0 0 0-7.8Z"/></svg></button>
      </div>
      <div class="pcard__body">
        <span class="pcard__cat">${p.cat}</span>
        <h3 class="pcard__title">${p.name}</h3>
        ${stars(p.rating, p.reviews)}
        <div class="pcard__foot">
          <div class="price${p.old ? " sale" : ""}">${money(p.price)}<span class="cur">ر.س</span>${p.old ? `<del>${money(p.old)}</del>` : ""}</div>
          <button class="add" type="button" aria-label="أضف للسلة" data-add data-id="${p.id}" data-name="${p.name}" data-price="${p.price}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
          </button>
        </div>
      </div>
    </article>`;
  }
  function fill(id, list) { const el = document.getElementById(id); if (el) { el.innerHTML = list.map(cardHTML).join(""); bindAdd(el); } }

  /* featured tabs */
  const TABS = { best: BEST, disc: DISC, offers: OFFERS };
  fill("featGrid", BEST);
  const featTabs = document.getElementById("featTabs");
  if (featTabs) featTabs.addEventListener("click", e => {
    const t = e.target.closest(".ptab"); if (!t) return;
    featTabs.querySelectorAll(".ptab").forEach(x => x.classList.remove("active"));
    t.classList.add("active");
    fill("featGrid", TABS[t.dataset.tab] || BEST);
  });
  fill("shelf1", SHELF1);
  fill("shelf2", SHELF2);
  fill("kitchenShelf", KITCHEN);

  /* ---------- Cart ---------- */
  const KEY = "meatwf_cart";
  let cart = load();
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) {} }

  const $count = document.getElementById("cartCount");
  const $body = document.getElementById("cartBody");
  const $foot = document.getElementById("cartFoot");
  const $total = document.getElementById("cartTotal");

  function addItem(d) {
    const f = cart.find(i => i.id === d.id);
    if (f) f.qty++;
    else cart.push({ id: d.id, name: d.name, price: parseFloat(d.price), qty: 1 });
    save(); renderCart(); bump(); toast(`تمت إضافة «${d.name}» للسلة`);
  }
  function changeQty(id, dl) { const it = cart.find(i => i.id === id); if (!it) return; it.qty += dl; if (it.qty <= 0) cart = cart.filter(i => i.id !== id); save(); renderCart(); }
  function removeItem(id) { cart = cart.filter(i => i.id !== id); save(); renderCart(); }

  function renderCart() {
    const q = cart.reduce((s, i) => s + i.qty, 0);
    $count.textContent = q; $count.classList.toggle("show", q > 0);
    const tb = document.getElementById("tabCartBadge");
    if (tb) { tb.textContent = q; tb.classList.toggle("show", q > 0); }
    if (!cart.length) {
      $body.innerHTML = `<div class="cart-empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.6"/><circle cx="18" cy="20" r="1.6"/><path d="M2 3h3l2.4 12.4a2 2 0 0 0 2 1.6h8.5a2 2 0 0 0 2-1.6L23 7H6"/></svg><p>سلتك فاضية الحين</p><button class="btn btn--ghost btn--sm" id="keepShopping" type="button">تابع التسوّق</button></div>`;
      $foot.hidden = true;
      const ks = document.getElementById("keepShopping"); if (ks) ks.addEventListener("click", closeDrawer);
      return;
    }
    $body.innerHTML = cart.map(i => `<div class="citem"><div class="ph"></div><div class="ci-b"><h5>${i.name}</h5><div class="ci-p">${money(i.price * i.qty)} ر.س</div><div style="display:flex;align-items:center;justify-content:space-between;margin-top:8px"><div class="qty"><button data-dec="${i.id}" type="button">−</button><span>${i.qty}</span><button data-inc="${i.id}" type="button">+</button></div><button class="ci-x" data-rm="${i.id}" type="button">إزالة</button></div></div></div>`).join("");
    $total.textContent = money(cart.reduce((s, i) => s + i.price * i.qty, 0));
    $foot.hidden = false;
  }
  $body.addEventListener("click", e => {
    const inc = e.target.closest("[data-inc]"), dec = e.target.closest("[data-dec]"), rm = e.target.closest("[data-rm]");
    if (inc) changeQty(inc.dataset.inc, 1); if (dec) changeQty(dec.dataset.dec, -1); if (rm) removeItem(rm.dataset.rm);
  });
  function bindAdd(scope) {
    scope.querySelectorAll("[data-add]").forEach(btn => {
      if (btn._b) return; btn._b = true;
      btn.addEventListener("click", () => { addItem(btn.dataset); btn.classList.add("added"); setTimeout(() => btn.classList.remove("added"), 800); });
    });
  }
  function bump() { $count.animate([{ transform: "scale(1)" }, { transform: "scale(1.5)" }, { transform: "scale(1)" }], { duration: 350, easing: "ease" }); }

  /* ---------- Drawer / menu ---------- */
  const overlay = document.getElementById("overlay"), drawer = document.getElementById("drawer"), mnav = document.getElementById("mnav");
  function openDrawer() { mnav.classList.remove("open"); drawer.classList.add("open"); overlay.classList.add("open"); document.body.classList.add("no-scroll"); }
  function closeDrawer() { drawer.classList.remove("open"); mnav.classList.remove("open"); overlay.classList.remove("open"); document.body.classList.remove("no-scroll"); }
  function openMnav() { drawer.classList.remove("open"); mnav.classList.add("open"); overlay.classList.add("open"); document.body.classList.add("no-scroll"); }
  document.getElementById("cartBtn").addEventListener("click", openDrawer);
  document.getElementById("closeCart").addEventListener("click", closeDrawer);
  document.getElementById("burger").addEventListener("click", openMnav);
  document.getElementById("closeMnav").addEventListener("click", closeDrawer);
  overlay.addEventListener("click", closeDrawer);
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeDrawer(); });
  mnav.querySelectorAll("nav span").forEach(a => a.addEventListener("click", closeDrawer));
  const tabCart = document.getElementById("tabCart"), tabMenu = document.getElementById("tabMenu");
  if (tabCart) tabCart.addEventListener("click", openDrawer);
  if (tabMenu) tabMenu.addEventListener("click", openMnav);
  const tabbarItems = document.querySelectorAll(".tabbar__i:not(#tabCart):not(#tabMenu)");
  tabbarItems.forEach(b => b.addEventListener("click", () => { tabbarItems.forEach(x => x.classList.remove("active")); b.classList.add("active"); }));
  const chips = document.querySelectorAll(".catnav .chip");
  chips.forEach(c => c.addEventListener("click", () => { chips.forEach(x => x.classList.remove("active")); c.classList.add("active"); }));
  renderCart();

  /* ---------- Toast ---------- */
  const $toast = document.getElementById("toast"), $toastMsg = document.getElementById("toastMsg"); let tT;
  function toast(msg) { $toastMsg.textContent = msg; $toast.classList.add("show"); clearTimeout(tT); tT = setTimeout(() => $toast.classList.remove("show"), 2400); }

  /* ---------- Countdown to next Friday ---------- */
  const cd = document.getElementById("countdown");
  if (cd) {
    const g = k => cd.querySelector(`[data-cd="${k}"]`);
    const D = g("d"), H = g("h"), M = g("m"), S = g("s");
    const end = (() => { const n = new Date(); const e = new Date(n); const day = e.getDay(); const add = ((5 - day + 7) % 7) || 7; e.setDate(e.getDate() + add); e.setHours(23, 59, 59, 0); return e; })();
    function tick() {
      let diff = Math.max(0, Math.floor((end - new Date()) / 1000));
      const d = Math.floor(diff / 86400); diff %= 86400;
      const h = Math.floor(diff / 3600); diff %= 3600;
      const m = Math.floor(diff / 60), s = diff % 60;
      D.textContent = String(d).padStart(2, "0"); H.textContent = String(h).padStart(2, "0");
      M.textContent = String(m).padStart(2, "0"); S.textContent = String(s).padStart(2, "0");
    }
    tick(); setInterval(tick, 1000);
  }

  /* ---------- Live purchase ticker ---------- */
  const ticker = document.getElementById("ticker");
  if (ticker) {
    const txt = ticker.querySelector(".tk-txt"), tm = ticker.querySelector(".tk-time");
    const cities = ["الرياض", "جدة", "الدمام", "القصيم", "حائل", "أبها", "مكة", "المدينة", "الخبر", "تبوك"];
    const prods = [...BEST, ...OFFERS, ...SHELF1].map(p => p.name);
    const times = ["قبل لحظات", "قبل دقيقتين", "قبل 5 دقائق", "قبل 8 دقائق", "قبل 12 دقيقة"];
    function roll() {
      const c = cities[Math.floor(Math.random() * cities.length)];
      const p = prods[Math.floor(Math.random() * prods.length)];
      txt.innerHTML = `<b>عميل من ${c}</b> طلب ${p}`;
      tm.textContent = times[Math.floor(Math.random() * times.length)];
      ticker.animate([{ opacity: .3 }, { opacity: 1 }], { duration: 400, easing: "ease" });
    }
    roll(); setInterval(roll, 3800);
  }

  /* ---------- Newsletter ---------- */
  const nf = document.getElementById("newsForm");
  if (nf) nf.addEventListener("submit", e => { e.preventDefault(); nf.reset(); toast("تم الاشتراك بنجاح ✓"); });

  /* ---------- Back to top ---------- */
  const toTop = document.getElementById("toTop");
  window.addEventListener("scroll", () => { toTop.classList.toggle("show", window.scrollY > 600); }, { passive: true });
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------- Reveal ---------- */
  const io = new IntersectionObserver(en => en.forEach(x => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }), { threshold: 0.1 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

})();
