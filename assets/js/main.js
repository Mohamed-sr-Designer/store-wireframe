/* =========================================================
   Meat-store Wireframe · shared JS (home / category / product)
   Clear Arabic (fus-ha) meat & cut names · Saudi content
   ========================================================= */
(function () {
  "use strict";

  const P = (id, name, cat, price, old) => ({ id, name, cat, price, old, off: old ? Math.round((1 - price / old) * 100) : 0, rating: (Math.round(38 + Math.random() * 12) / 10), reviews: Math.floor(6 + Math.random() * 400) });

  /* ---- Catalog (clear names) ---- */
  const WHOLE = [
    P("w1", "ذبيحة ضأن كاملة", "الذبائح", 899, 1150),
    P("w2", "نصف ذبيحة ضأن", "الذبائح", 470, 620),
    P("w3", "ربع ذبيحة ضأن", "الذبائح", 250, 340),
    P("w4", "ذبيحة عجل كاملة", "الذبائح", 1250, 1600),
    P("w5", "ربع ذبيحة إبل", "الذبائح", 1190, 1400),
    P("w6", "بوكس لحم عائلي مشكّل", "بوكسات", 720, 950)
  ];
  const CUTS = [
    P("c1", "فخذ ضأن بالعظم", "لحم الضأن", 120, 160),
    P("c2", "كتف ضأن", "لحم الضأن", 95, 130),
    P("c3", "ريش ضأن مقطّعة", "لحم الضأن", 110, 150),
    P("c4", "موزة ضأن (ساق)", "لحم الضأن", 90, 120),
    P("c5", "شرائح لحم بقري", "لحم البقر", 62, 85),
    P("c6", "ستيك ريب آي بقري", "لحم البقر", 95, 130)
  ];
  const BEST = [
    P("b1", "فخذ ضأن بالعظم", "لحم الضأن", 120, 160),
    P("b2", "لحم بقري مفروم — كيلو", "اللحم المفروم", 48, 65),
    P("b3", "ذبيحة ضأن كاملة", "الذبائح", 899, 1150),
    P("b4", "شرائح لحم بقري", "لحم البقر", 62, 85),
    P("b5", "ريش ضأن مقطّعة", "لحم الضأن", 110, 150),
    P("b6", "لحم عجل مقطّع مكعبات", "لحم العجل", 68, 90),
    P("b7", "لحم إبل مقطّع", "لحم الإبل", 78, 105),
    P("b8", "بوكس المشاوي الجاهزة", "المشاوي", 210, 280),
    P("b9", "كتف ضأن", "لحم الضأن", 95, 130),
    P("b10", "كبدة طازجة", "القطعيات", 45, 60)
  ];
  const DISC = [
    P("d1", "لحم ضأن مفروم — كيلو", "اللحم المفروم", 55, 90),
    P("d2", "ربع ذبيحة ضأن", "الذبائح", 250, 340),
    P("d3", "لحم بقري مكعبات", "لحم البقر", 58, 82),
    P("d4", "موزة ضأن (ساق)", "لحم الضأن", 90, 125),
    P("d5", "إسكالوب عجل", "لحم العجل", 72, 98),
    P("d6", "كباب مشكّل", "المشاوي", 65, 90),
    P("d7", "لحم للكبسة والمظبي", "المطبخ", 88, 120),
    P("d8", "قطع لحم للمندي", "المطبخ", 95, 130),
    P("d9", "لحم بقري مفروم — كيلو", "اللحم المفروم", 48, 68),
    P("d10", "سنام إبل", "لحم الإبل", 130, 175)
  ];
  const OFFERS = [
    P("o1", "بوكس لحم عائلي مشكّل", "بوكسات", 720, 950),
    P("o2", "وليمة ضأن كاملة مع الطبخ", "المطبخ", 1290, 1600),
    P("o3", "بوكس المشاوي الجاهزة", "المشاوي", 210, 280),
    P("o4", "ستيك ريب آي بقري", "لحم البقر", 95, 130),
    P("o5", "مفروم مشكّل — 3 كيلو", "اللحم المفروم", 150, 210),
    P("o6", "ذبيحة عجل كاملة", "الذبائح", 1250, 1600),
    P("o7", "ربع ذبيحة إبل", "لحم الإبل", 1190, 1400),
    P("o8", "كبسة لحم جاهزة", "المطبخ", 180, 240),
    P("o9", "شرائح لحم بقري", "لحم البقر", 62, 85),
    P("o10", "مندي لحم جاهز", "المطبخ", 120, 160)
  ];
  const KITCHEN = [
    P("kt1", "وليمة ضأن كاملة مع الطبخ", "الولائم", 1290, 1600),
    P("kt2", "مندي لحم جاهز", "الإيدامات", 120, 160),
    P("kt3", "قرصان لحم", "الإيدامات", 95, 130),
    P("kt4", "مرقوق لحم", "الإيدامات", 85, 110),
    P("kt5", "كبسة لحم جاهزة", "الأطباق", 180, 240),
    P("kt6", "مظبي ضأن", "الأطباق", 260, 330)
  ];


  /* ---- cut index codes (نُضْج reference system) ---- */
  const CODE_LETTER = [["ضأن", "ض"], ["بقر", "ب"], ["عجل", "ع"], ["إبل", "إ"], ["مفروم", "م"], ["الذبائح", "ذ"],
  ["بوكس", "ب"], ["مشاوي", "ش"], ["المطبخ", "ط"], ["الولائم", "ط"], ["الإيدامات", "ط"], ["الأطباق", "ط"],
  ["كبدة", "ق"], ["القطعيات", "ق"], ["طازج", "ق"]];
  function codeFor(cat, i) {
    let L = "ت";
    for (const [k, v] of CODE_LETTER) { if (cat && cat.indexOf(k) > -1) { L = v; break; } }
    return L + "–" + String(i + 1).padStart(2, "0");
  }

  /* ---- spec profile: culinary characteristics of the cut (not ratings) ----
     tender = طراوة · fat = دهن · bold = قوة النكهة · effort = صعوبة التحضير  (0–5) */
  const SPEC_BY_CUT = [
    [/فخذ/, [3, 2, 4, 3]], [/كتف/, [2, 3, 4, 4]], [/ريش/, [4, 4, 4, 2]],
    [/موزة|ساق/, [1, 2, 5, 5]], [/ستيك|ريب آي|شرائح|فيليه/, [5, 4, 3, 2]],
    [/مفروم/, [5, 3, 3, 1]], [/مكعبات|مقطّع|مقطع/, [3, 2, 3, 3]],
    [/ذبيحة|نصف|ربع/, [3, 3, 4, 4]], [/كبدة|سواقط|كوارع/, [4, 1, 5, 2]],
    [/سنام/, [4, 5, 4, 3]], [/بوكس|وليمة|كبسة|مندي|قرصان|مرقوق|مظبي/, [3, 3, 4, 2]]
  ];
  function specFor(name) {
    for (const [re, v] of SPEC_BY_CUT) { if (re.test(name)) return v; }
    return [3, 3, 3, 3];
  }
  [BEST, DISC, OFFERS, WHOLE, CUTS, KITCHEN].forEach(l => l.forEach((p, i) => {
    p.code = codeFor(p.cat, i); p.spec = specFor(p.name);
  }));

  const SHOP = [...BEST.slice(0, 5), ...CUTS, ...WHOLE.slice(0, 4), ...DISC.slice(0, 5)].map((p, i) => ({ ...p, id: "sh" + i }));
  const RELATED = [...CUTS.slice(0, 3), ...BEST.slice(0, 3)].map((p, i) => ({ ...p, id: "rel" + i }));

  const money = n => Number(n).toLocaleString("en-US");
  const stars = (r, rev) => `<div class="stars"><span class="s">${"★".repeat(Math.round(r))}${"☆".repeat(5 - Math.round(r))}</span><b>${r.toFixed(1)}</b>${rev != null ? `<span>(${rev})</span>` : ""}</div>`;

  /* spec meters — culinary profile of the cut, replaces star ratings */
  const SPEC_KEYS = [["طراوة", ""], ["دهن", ""], ["نكهة", ""], ["تحضير", "eff"]];
  const specStrip = s => `<div class="spec-strip">${SPEC_KEYS.map((k, i) =>
    `<div class="spec-row ${k[1]}"><span class="k">${k[0]}</span><span class="spec-bar">${[1, 2, 3, 4, 5].map(n => `<i class="${n <= (s ? s[i] : 3) ? "on" : ""}"></i>`).join("")}</span></div>`).join("")}</div>`;

  function cardHTML(p) {
    const badges = p.off ? `<span class="tag-off">%${p.off}-</span>` : "";
    return `<article class="pcard">
      <div class="pcard__media">
        <a class="pcard__link" href="product.html" aria-label="${p.name}"></a>
        <div class="pcard__badges">${badges}</div>
        <button class="wish" type="button" aria-label="أضف للمفضلة"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21l7.7-7.6 1.1-1a5.5 5.5 0 0 0 0-7.8Z"/></svg></button>
      </div>
      <div class="pcard__body">
        <div class="pcard__meta"><span class="cut-code"><b>${p.code || ""}</b></span><span class="pcard__cat">${p.cat}</span></div>
        <a class="pcard__title" href="product.html">${p.name}</a>
        ${specStrip(p.spec)}
        <div class="pcard__foot">
          <div class="price${p.old ? " sale" : ""}">${money(p.price)}<span class="cur">ر.س</span>${p.old ? `<del>${money(p.old)}</del>` : ""}</div>
          <button class="add" type="button" aria-label="أضف للسلة" data-add data-id="${p.id}" data-name="${p.name}" data-price="${p.price}" data-img="${p.img || ""}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
          </button>
        </div>
      </div>
    </article>`;
  }
  function fill(id, list) { const el = document.getElementById(id); if (el) { el.innerHTML = list.map(cardHTML).join(""); bindAdd(el); } }

  /* ---- Home ---- */
  const TABS = { best: BEST, disc: DISC, offers: OFFERS };
  fill("featGrid", BEST);
  const featTabs = document.getElementById("featTabs");
  if (featTabs) featTabs.addEventListener("click", e => {
    const t = e.target.closest(".ptab"); if (!t) return;
    featTabs.querySelectorAll(".ptab").forEach(x => x.classList.remove("active")); t.classList.add("active");
    fill("featGrid", TABS[t.dataset.tab] || BEST);
  });
  fill("shelf1", WHOLE);
  fill("shelf2", CUTS);
  fill("kitchenShelf", KITCHEN);

  /* ---- Category page ---- */
  fill("catGrid", SHOP);
  const catSort = document.getElementById("catSort");
  if (catSort) catSort.addEventListener("change", () => {
    let list = [...SHOP];
    const v = catSort.value;
    if (v === "low") list.sort((a, b) => a.price - b.price);
    else if (v === "high") list.sort((a, b) => b.price - a.price);
    else if (v === "off") list.sort((a, b) => b.off - a.off);
    fill("catGrid", list);
  });
  // filter options (visual toggle only)
  document.querySelectorAll(".filter .fopt").forEach(o => o.addEventListener("click", () => o.classList.toggle("on")));
  const filterToggle = document.getElementById("filterToggle");
  if (filterToggle) filterToggle.addEventListener("click", () => { const f = document.querySelector(".filter"); if (f) f.classList.toggle("open"); });
  document.querySelectorAll(".pager .pg[data-pg]").forEach(pg => pg.addEventListener("click", () => {
    document.querySelectorAll(".pager .pg[data-pg]").forEach(x => x.classList.remove("active")); pg.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }));

  /* ---- Product page ---- */
  fill("relatedShelf", RELATED);
  document.querySelectorAll(".opt-group").forEach(g => g.addEventListener("click", e => {
    const o = e.target.closest(".opt"); if (!o) return;
    g.querySelectorAll(".opt").forEach(x => x.classList.remove("active")); o.classList.add("active");
  }));
  document.querySelectorAll(".gallery .thumb").forEach(t => t.addEventListener("click", () => {
    document.querySelectorAll(".gallery .thumb").forEach(x => x.classList.remove("active")); t.classList.add("active");
  }));
  /* qty stepper — only on the legacy product page (cut.html binds its own) */
  const qv = document.getElementById("qVal");
  if (qv && document.getElementById("pAdd")) {
    document.getElementById("qMinus").addEventListener("click", () => { qv.textContent = Math.max(1, (+qv.textContent) - 1); });
    document.getElementById("qPlus").addEventListener("click", () => { qv.textContent = (+qv.textContent) + 1; });
  }
  const pAdd = document.getElementById("pAdd");
  if (pAdd) pAdd.addEventListener("click", () => {
    const q = qv ? +qv.textContent : 1;
    addItem({ id: pAdd.dataset.id, name: pAdd.dataset.name, price: pAdd.dataset.price, img: pAdd.dataset.img }, q);
  });
  // detail tabs
  document.querySelectorAll(".dtabs .dtab").forEach(t => t.addEventListener("click", () => {
    document.querySelectorAll(".dtabs .dtab").forEach(x => x.classList.remove("active")); t.classList.add("active");
    document.querySelectorAll(".dpane").forEach(p => p.classList.toggle("active", p.dataset.pane === t.dataset.pane));
  }));

  /* ---- Cross-page navigation (no <a> tags) ---- */
  document.addEventListener("click", e => {
    if (e.target.closest(".add,.wish,.qty,button[data-add]")) return;
    const nav = e.target.closest("[data-nav]"); if (!nav) return;
    window.location.href = nav.getAttribute("data-nav");
  });

  /* ---------- Cart (shared) ---------- */
  const KEY = "meatwf_cart";
  let cart = load();
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) {} }
  const $count = document.getElementById("cartCount");
  const $body = document.getElementById("cartBody");
  const $foot = document.getElementById("cartFoot");
  const $total = document.getElementById("cartTotal");

  function addItem(d, qty) {
    qty = qty || 1;
    const f = cart.find(i => i.id === d.id);
    if (f) f.qty += qty;
    else cart.push({ id: d.id, name: d.name, price: parseFloat(d.price), qty, img: d.img || "" });
    save(); renderCart(); bump(); toast(`تمت إضافة «${d.name}» للسلة`);
  }
  function changeQty(id, dl) { const it = cart.find(i => i.id === id); if (!it) return; it.qty += dl; if (it.qty <= 0) cart = cart.filter(i => i.id !== id); save(); renderCart(); }
  function removeItem(id) { cart = cart.filter(i => i.id !== id); save(); renderCart(); }

  function renderCart() {
    const q = cart.reduce((s, i) => s + i.qty, 0);
    if ($count) { $count.textContent = q; $count.classList.toggle("show", q > 0); }
    const tb = document.getElementById("tabCartBadge");
    if (tb) { tb.textContent = q; tb.classList.toggle("show", q > 0); }
    if (!$body) return;
    if (!cart.length) {
      $body.innerHTML = `<div class="cart-empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.6"/><circle cx="18" cy="20" r="1.6"/><path d="M2 3h3l2.4 12.4a2 2 0 0 0 2 1.6h8.5a2 2 0 0 0 2-1.6L23 7H6"/></svg><p>سلتك فاضية الحين</p><button class="btn btn--ghost btn--sm" id="keepShopping" type="button">تابع التسوّق</button></div>`;
      if ($foot) $foot.hidden = true;
      const ks = document.getElementById("keepShopping"); if (ks) ks.addEventListener("click", closeDrawer);
      return;
    }
    $body.innerHTML = cart.map(i => `<div class="citem"><div class="ph">${i.img ? `` : ""}</div><div class="ci-b"><h5>${i.name}</h5><div class="ci-p">${money(i.price * i.qty)} ر.س</div><div style="display:flex;align-items:center;justify-content:space-between;margin-top:8px"><div class="qty"><button data-dec="${i.id}" type="button">−</button><span>${i.qty}</span><button data-inc="${i.id}" type="button">+</button></div><button class="ci-x" data-rm="${i.id}" type="button">إزالة</button></div></div></div>`).join("");
    if ($total) $total.textContent = money(cart.reduce((s, i) => s + i.price * i.qty, 0));
    if ($foot) $foot.hidden = false;
  }
  if ($body) $body.addEventListener("click", e => {
    const inc = e.target.closest("[data-inc]"), dec = e.target.closest("[data-dec]"), rm = e.target.closest("[data-rm]");
    if (inc) changeQty(inc.dataset.inc, 1); if (dec) changeQty(dec.dataset.dec, -1); if (rm) removeItem(rm.dataset.rm);
  });
  function bindAdd(scope) {
    scope.querySelectorAll("[data-add]").forEach(btn => {
      if (btn._b) return; btn._b = true;
      btn.addEventListener("click", ev => { ev.stopPropagation(); addItem(btn.dataset); btn.classList.add("added"); setTimeout(() => btn.classList.remove("added"), 800); });
    });
  }
  function bump() { if ($count) $count.animate([{ transform: "scale(1)" }, { transform: "scale(1.5)" }, { transform: "scale(1)" }], { duration: 350, easing: "ease" }); }

  /* ---------- Drawer / menu ---------- */
  const overlay = document.getElementById("overlay"), drawer = document.getElementById("drawer"), mnav = document.getElementById("mnav");
  function openDrawer() { if (!drawer) return; if (mnav) mnav.classList.remove("open"); drawer.classList.add("open"); overlay.classList.add("open"); document.body.classList.add("no-scroll"); }
  function closeDrawer() { if (drawer) drawer.classList.remove("open"); if (mnav) mnav.classList.remove("open"); if (overlay) overlay.classList.remove("open"); document.body.classList.remove("no-scroll"); }
  function openMnav() { if (!mnav) return; if (drawer) drawer.classList.remove("open"); mnav.classList.add("open"); overlay.classList.add("open"); document.body.classList.add("no-scroll"); }
  const g = id => document.getElementById(id);
  if (g("cartBtn")) g("cartBtn").addEventListener("click", openDrawer);
  if (g("closeCart")) g("closeCart").addEventListener("click", closeDrawer);
  if (g("burger")) g("burger").addEventListener("click", openMnav);
  if (g("closeMnav")) g("closeMnav").addEventListener("click", closeDrawer);
  if (overlay) overlay.addEventListener("click", closeDrawer);
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeDrawer(); });
  if (mnav) mnav.querySelectorAll("nav span").forEach(a => a.addEventListener("click", closeDrawer));
  if (g("tabCart")) g("tabCart").addEventListener("click", openDrawer);
  if (g("tabMenu")) g("tabMenu").addEventListener("click", openMnav);
  const tabbarItems = document.querySelectorAll(".tabbar__i:not(#tabCart):not(#tabMenu)");
  tabbarItems.forEach(b => b.addEventListener("click", () => { tabbarItems.forEach(x => x.classList.remove("active")); b.classList.add("active"); }));
  const chips = document.querySelectorAll(".catnav .chip");
  chips.forEach(c => c.addEventListener("click", ev => { if (c.hasAttribute("data-nav")) return; chips.forEach(x => x.classList.remove("active")); c.classList.add("active"); }));
  renderCart();

  /* public cart API for page-specific scripts (cut.js …) */
  window.TKCart = { add: addItem, open: openDrawer, close: closeDrawer, toast: m => toast(m) };

  /* ---------- Entry points: wire account/wishlist/checkout ---------- */
  document.querySelectorAll(".header__tools .tool").forEach(t => { const s = t.querySelector("small"); if (!s) return; const v = s.textContent.trim(); if (v === "حسابي") t.dataset.nav = "account.html"; else if (v === "المفضلة") t.dataset.nav = "wishlist.html"; });
  document.querySelectorAll(".tabbar__i").forEach(t => { const s = t.querySelector("span:last-child"); if (s && s.textContent.trim() === "المفضلة") t.dataset.nav = "wishlist.html"; });
  document.querySelectorAll(".mnav nav span").forEach(s => { if (s.textContent.trim() === "حسابي") s.dataset.nav = "account.html"; });
  document.querySelectorAll("#cartFoot .btn--block").forEach(b => b.dataset.nav = "checkout.html");
  document.querySelectorAll("button").forEach(b => { if (b.textContent.trim() === "شراء الآن") b.dataset.nav = "checkout.html"; });
  /* ---------- Wishlist store (slugs, shared across pages) ----------
     القطعة تُعرف من رابط بطاقتها cut.html?c=<slug>، فلا تحتاج البطاقات أي تعديل. */
  const WKEY = "meatwf_wish";
  function wishLoad() { try { return JSON.parse(localStorage.getItem(WKEY)) || []; } catch (e) { return []; } }
  function wishSave(l) { try { localStorage.setItem(WKEY, JSON.stringify(l)); } catch (e) {} }
  function slugOfCard(card) {
    const a = card && card.querySelector('a[href*="cut.html?c="]');
    if (!a) return null;
    const m = a.getAttribute("href").match(/[?&]c=([^&]+)/);
    return m ? decodeURIComponent(m[1]) : null;
  }
  window.TKWish = {
    list: wishLoad,
    has: s => wishLoad().indexOf(s) > -1,
    toggle(s) { const l = wishLoad(); const i = l.indexOf(s); i > -1 ? l.splice(i, 1) : l.push(s); wishSave(l); return i === -1; },
    paint: sc => paintHearts(sc)
  };
  /* اعكس الحالة المحفوظة على كل القلوب في الصفحة */
  function paintHearts(scope) {
    const l = wishLoad();
    (scope || document).querySelectorAll(".pcard .wish").forEach(w => {
      const s = slugOfCard(w.closest(".pcard"));
      if (s) w.classList.toggle("on", l.indexOf(s) > -1);
    });
  }
  paintHearts();
  // heart toggle (outside the wishlist page, which manages its own removal)
  document.addEventListener("click", e => {
    const w = e.target.closest(".wish"); if (!w || w.closest("#wishGrid")) return;
    const s = slugOfCard(w.closest(".pcard"));
    if (!s) { w.classList.toggle("on"); return; }
    const added = window.TKWish.toggle(s);
    w.classList.toggle("on", added);
    toast(added ? "تمت الإضافة للمفضلة" : "تمت الإزالة من المفضلة");
  });

  function emptyHTML(title, sub) { return `<div class="empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21l7.7-7.6 1.1-1a5.5 5.5 0 0 0 0-7.8Z"/></svg><h3>${title}</h3><p>${sub}</p><button class="btn" data-nav="category.html" type="button">تصفّح القطعيات</button></div>`; }

  /* ---------- Wishlist page ---------- */
  const wg = document.getElementById("wishGrid");
  if (wg) {
    const T = window.NUDJ;
    const wc = document.getElementById("wishCount");
    const wishCard = c => `<article class="pcard">
      <div class="pcard__media">
        <a class="pcard__link" href="cut.html?c=${c.slug}" aria-label="${c.name}"></a>
        <button class="wish on" type="button" aria-label="إزالة من المفضلة"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21l7.7-7.6 1.1-1a5.5 5.5 0 0 0 0-7.8Z"/></svg></button>
      </div>
      <div class="pcard__body">
        <div class="pcard__meta"><span class="cut-code"><b>${c.code}</b></span><span class="pcard__cat">${T.PRIMALS[c.animal][c.primal].name}</span></div>
        <a class="pcard__title" href="cut.html?c=${c.slug}">${c.name}</a>
        <div class="pcard__foot">
          <div class="price">${money(c.price)}<span class="cur">ر.س</span></div>
          <button class="add" type="button" aria-label="أضف للسلة" data-wadd="${c.slug}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
          </button>
        </div>
      </div></article>`;

    function wishCuts() { return T ? window.TKWish.list().map(s => T.bySlug(s)).filter(Boolean) : []; }
    function renderWish() {
      const list = wishCuts();
      if (wc) wc.textContent = list.length;
      if (!list.length) {
        document.getElementById("wishArea").innerHTML =
          emptyHTML("قائمة مفضلتك فاضية", "تصفّح القطعيات واحفظ اللي يعجبك بضغطة على القلب.");
        const ah = document.getElementById("addAll"); if (ah) ah.hidden = true;
        return;
      }
      wg.innerHTML = list.map(wishCard).join("");
    }
    renderWish();
    wg.addEventListener("click", e => {
      const w = e.target.closest(".wish");
      if (w) {
        /* لازم نوقف الصعود: بعد إعادة الرسم تصير البطاقة خارج الـDOM،
           فيفشل شرط closest("#wishGrid") في الهاندلر العام ويعيد إضافتها. */
        e.stopPropagation();
        const card = w.closest(".pcard"), s = slugOfCard(card);
        if (s) { window.TKWish.toggle(s); renderWish(); toast("تمت الإزالة من المفضلة"); }
        return;
      }
      const b = e.target.closest("[data-wadd]");
      if (b && T) {
        const c = T.bySlug(b.dataset.wadd);
        if (c) { addItem({ id: c.slug, name: c.name, price: c.price, img: c.img }); }
      }
    });
    const addAll = document.getElementById("addAll");
    if (addAll) addAll.addEventListener("click", () => {
      const list = wishCuts(); if (!list.length) return;
      list.forEach(c => addItem({ id: c.slug, name: c.name, price: c.price, img: c.img }));
      toast("تمت إضافة كل المفضلة للسلة");
    });
  }

  /* ---------- Checkout page ---------- */
  const sumItems = document.getElementById("sumItems");
  if (sumItems) {
    const gc = id => document.getElementById(id);
    function renderCheckout() {
      const items = cart;
      if (!items.length) {
        sumItems.innerHTML = `<div class="sum-empty">
          <p>سلتك فاضية — ما فيه شي نحسبه لك بعد.</p>
          <a class="btn btn--block" href="category.html">تصفّح القطعيات</a></div>`;
        ["sumSub", "sumVat", "sumTotal"].forEach(id => { if (gc(id)) gc(id).textContent = "— ر.س"; });
        if (gc("sumShip")) gc("sumShip").textContent = "—";
        if (gc("placeOrder")) gc("placeOrder").disabled = true;
        return;
      }
      if (gc("placeOrder")) gc("placeOrder").disabled = false;
      sumItems.innerHTML = items.map(i => `<div class="sum-item"><div class="ph">${i.img ? `` : ""}</div><div class="si-b"><h5>${i.name}</h5><span class="si-q">الكمية: ${i.qty}</span></div><span class="si-p">${money(i.price * i.qty)} ر.س</span></div>`).join("");
      const sub = items.reduce((s, i) => s + i.price * i.qty, 0);
      const ship = sub >= 300 ? 0 : 25, vat = Math.round(sub * 0.15), total = sub + ship + vat;
      gc("sumSub").textContent = money(sub) + " ر.س";
      gc("sumShip").innerHTML = ship ? money(ship) + " ر.س" : '<span class="free">مجاني</span>';
      gc("sumVat").textContent = money(vat) + " ر.س";
      gc("sumTotal").textContent = money(total) + " ر.س";
    }
    renderCheckout();
    document.querySelectorAll("[data-radio]").forEach(grp => grp.addEventListener("click", e => {
      const o = e.target.closest(".radio-opt"); if (!o) return;
      grp.querySelectorAll(".radio-opt").forEach(x => x.classList.remove("active")); o.classList.add("active");
    }));
    if (gc("couponBtn")) gc("couponBtn").addEventListener("click", () => toast("تم تطبيق الكوبون (تجريبي)"));
    if (gc("placeOrder")) gc("placeOrder").addEventListener("click", () => toast("تم تأكيد طلبك بنجاح ✓ (تجريبي)"));
  }

  /* ---------- Account page ---------- */
  document.querySelectorAll(".acc-menu .am[data-panel]").forEach(m => m.addEventListener("click", () => {
    document.querySelectorAll(".acc-menu .am").forEach(x => x.classList.remove("active")); m.classList.add("active");
    document.querySelectorAll(".acc-panel").forEach(p => p.classList.toggle("active", p.dataset.panel === m.dataset.panel));
  }));

  /* ---------- Toast ---------- */
  const $toast = document.getElementById("toast"), $toastMsg = document.getElementById("toastMsg"); let tT;
  function toast(msg) { if (!$toast) return; $toastMsg.textContent = msg; $toast.classList.add("show"); clearTimeout(tT); tT = setTimeout(() => $toast.classList.remove("show"), 2400); }

  /* ---------- Countdown ---------- */
  const cd = document.getElementById("countdown");
  if (cd) {
    const q = k => cd.querySelector(`[data-cd="${k}"]`), D = q("d"), H = q("h"), M = q("m"), S = q("s");
    const end = (() => { const e = new Date(); const add = ((5 - e.getDay() + 7) % 7) || 7; e.setDate(e.getDate() + add); e.setHours(23, 59, 59, 0); return e; })();
    function tick() {
      let diff = Math.max(0, Math.floor((end - new Date()) / 1000));
      const d = Math.floor(diff / 86400); diff %= 86400;
      const h = Math.floor(diff / 3600); diff %= 3600;
      D.textContent = String(d).padStart(2, "0"); H.textContent = String(h).padStart(2, "0");
      M.textContent = String(Math.floor(diff / 60)).padStart(2, "0"); S.textContent = String(diff % 60).padStart(2, "0");
    }
    tick(); setInterval(tick, 1000);
  }

  /* ---------- Ticker ---------- */
  const ticker = document.getElementById("ticker");
  if (ticker) {
    const txt = ticker.querySelector(".tk-txt"), tm = ticker.querySelector(".tk-time");
    const cities = ["الرياض", "جدة", "الدمام", "القصيم", "حائل", "أبها", "مكة", "المدينة", "الخبر", "تبوك"];
    const prods = [...BEST, ...OFFERS, ...WHOLE].map(p => p.name);
    const times = ["قبل لحظات", "قبل دقيقتين", "قبل 5 دقائق", "قبل 8 دقائق", "قبل 12 دقيقة"];
    const R = a => a[Math.floor(Math.random() * a.length)];
    function roll() { txt.innerHTML = `<b>عميل من ${R(cities)}</b> طلب ${R(prods)}`; tm.textContent = R(times); ticker.animate([{ opacity: .3 }, { opacity: 1 }], { duration: 400, easing: "ease" }); }
    roll(); setInterval(roll, 3800);
  }

  /* ---------- Newsletter ---------- */
  const nf = document.getElementById("newsForm");
  if (nf) nf.addEventListener("submit", e => { e.preventDefault(); nf.reset(); toast("تم الاشتراك بنجاح ✓"); });

  /* ---------- Back to top ---------- */
  const toTop = document.getElementById("toTop");
  if (toTop) { window.addEventListener("scroll", () => toTop.classList.toggle("show", window.scrollY > 600), { passive: true }); toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" })); }

  /* ---------- Reveal ---------- */
  const io = new IntersectionObserver(en => en.forEach(x => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }), { threshold: 0.08 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

})();
