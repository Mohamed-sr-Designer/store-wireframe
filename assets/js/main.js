/* =========================================================
   E-commerce Wireframe · interactions (Saudi content)
   ========================================================= */
(function () {
  "use strict";

  const CATS = ["إلكترونيات", "الأزياء", "المنزل", "العناية", "البقالة", "ألعاب", "الرياضة"];
  const rnd = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
  const pick = arr => arr[rnd(0, arr.length - 1)];

  function make(prefix, n, opts = {}) {
    const out = [];
    for (let i = 1; i <= n; i++) {
      const price = rnd(4, 130) * 10 - 1;            // e.g. 199
      const hasOff = opts.sale ? true : Math.random() < 0.4;
      const off = hasOff ? pick([10, 15, 20, 25, 30, 40]) : 0;
      const old = off ? Math.round(price / (1 - off / 100)) : null;
      out.push({
        id: `${prefix}-${i}`,
        name: "اسم المنتج",
        cat: pick(CATS),
        price, old, off,
        isNew: opts.isNew || false,
        rating: (rnd(38, 50) / 10),
        reviews: rnd(6, 480)
      });
    }
    return out;
  }

  const FLASH = make("f", 6, { sale: true });
  const BEST = make("b", 10);
  const NEW = make("n", 10, { isNew: true });

  const money = n => Number(n).toLocaleString("en-US");

  const stars = (r, rev) => {
    const full = Math.round(r);
    return `<div class="stars"><span class="s">${"★".repeat(full)}${"☆".repeat(5 - full)}</span><b>${r.toFixed(1)}</b><span>(${rev})</span></div>`;
  };

  function cardHTML(p) {
    const badges = [];
    if (p.off) badges.push(`<span class="tag-off">%${p.off}-</span>`);
    if (p.old && !p.off) badges.push(`<span class="tag-sale">عرض</span>`);
    if (p.isNew) badges.push(`<span class="tag-new">جديد</span>`);
    return `<article class="pcard">
      <div class="pcard__media">
        <div class="pcard__badges">${badges.join("")}</div>
        <button class="wish" type="button" aria-label="المفضلة"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21l7.7-7.6 1.1-1a5.5 5.5 0 0 0 0-7.8Z"/></svg></button>
      </div>
      <div class="pcard__body">
        <span class="pcard__cat">${p.cat}</span>
        <h3 class="pcard__title">اسم المنتج</h3>
        <p class="pcard__desc">وصف مختصر للمنتج يوضّح أهم مميّزاته.</p>
        ${stars(p.rating, p.reviews)}
        <div class="pcard__foot">
          <div class="price">${money(p.price)}<span class="cur">ر.س</span>${p.old ? `<del>${money(p.old)}</del>` : ""}</div>
          <button class="add" type="button" aria-label="أضف للسلة" data-add data-id="${p.id}" data-name="اسم المنتج" data-price="${p.price}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
          </button>
        </div>
      </div>
    </article>`;
  }

  function fill(id, list) {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = list.map(cardHTML).join("");
    bindAdd(el);
  }
  fill("flashShelf", FLASH);
  fill("bestGrid", BEST);
  fill("newGrid", NEW);

  /* ---------- Cart ---------- */
  const KEY = "wf_cart";
  let cart = load();
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) {} }

  const $count = document.getElementById("cartCount");
  const $body = document.getElementById("cartBody");
  const $foot = document.getElementById("cartFoot");
  const $total = document.getElementById("cartTotal");

  function addItem(d) {
    const found = cart.find(i => i.id === d.id);
    if (found) found.qty++;
    else cart.push({ id: d.id, name: d.name, price: parseFloat(d.price), qty: 1 });
    save(); renderCart(); bump();
    toast("تمت إضافة المنتج للسلة");
  }
  function changeQty(id, delta) {
    const it = cart.find(i => i.id === id);
    if (!it) return;
    it.qty += delta;
    if (it.qty <= 0) cart = cart.filter(i => i.id !== id);
    save(); renderCart();
  }
  function removeItem(id) { cart = cart.filter(i => i.id !== id); save(); renderCart(); }

  function renderCart() {
    const totalQty = cart.reduce((s, i) => s + i.qty, 0);
    $count.textContent = totalQty;
    $count.classList.toggle("show", totalQty > 0);
    const tb = document.getElementById("tabCartBadge");
    if (tb) { tb.textContent = totalQty; tb.classList.toggle("show", totalQty > 0); }

    if (!cart.length) {
      $body.innerHTML = `<div class="cart-empty">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.6"/><circle cx="18" cy="20" r="1.6"/><path d="M2 3h3l2.4 12.4a2 2 0 0 0 2 1.6h8.5a2 2 0 0 0 2-1.6L23 7H6"/></svg>
        <p>سلتك فاضية الحين</p>
        <button class="btn btn--ghost btn--sm" id="keepShopping" type="button">تابع التسوّق</button>
      </div>`;
      $foot.hidden = true;
      const ks = document.getElementById("keepShopping");
      if (ks) ks.addEventListener("click", closeDrawer);
      return;
    }
    $body.innerHTML = cart.map(i => `<div class="citem">
      <div class="ph"></div>
      <div class="ci-b">
        <h5>${i.name}</h5>
        <div class="ci-p">${money(i.price * i.qty)} ر.س</div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-top:8px">
          <div class="qty">
            <button data-dec="${i.id}" type="button" aria-label="تقليل">−</button>
            <span>${i.qty}</span>
            <button data-inc="${i.id}" type="button" aria-label="زيادة">+</button>
          </div>
          <button class="ci-x" data-rm="${i.id}" type="button">إزالة</button>
        </div>
      </div>
    </div>`).join("");
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    $total.textContent = money(total);
    $foot.hidden = false;
  }

  $body.addEventListener("click", e => {
    const inc = e.target.closest("[data-inc]");
    const dec = e.target.closest("[data-dec]");
    const rm = e.target.closest("[data-rm]");
    if (inc) changeQty(inc.dataset.inc, 1);
    if (dec) changeQty(dec.dataset.dec, -1);
    if (rm) removeItem(rm.dataset.rm);
  });

  function bindAdd(scope) {
    scope.querySelectorAll("[data-add]").forEach(btn => {
      if (btn._bound) return; btn._bound = true;
      btn.addEventListener("click", () => {
        addItem(btn.dataset);
        btn.classList.add("added");
        setTimeout(() => btn.classList.remove("added"), 800);
      });
    });
  }

  function bump() {
    $count.animate([{ transform: "scale(1)" }, { transform: "scale(1.5)" }, { transform: "scale(1)" }], { duration: 350, easing: "ease" });
  }

  /* ---------- Drawer / menu ---------- */
  const overlay = document.getElementById("overlay");
  const drawer = document.getElementById("drawer");
  const mnav = document.getElementById("mnav");
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

  const tabCart = document.getElementById("tabCart");
  const tabMenu = document.getElementById("tabMenu");
  if (tabCart) tabCart.addEventListener("click", openDrawer);
  if (tabMenu) tabMenu.addEventListener("click", openMnav);

  // active-state toggles (visual only — no navigation)
  const tabbarItems = document.querySelectorAll(".tabbar__i:not(#tabCart):not(#tabMenu)");
  tabbarItems.forEach(b => b.addEventListener("click", () => {
    tabbarItems.forEach(x => x.classList.remove("active"));
    b.classList.add("active");
  }));
  const chips = document.querySelectorAll(".catnav .chip");
  chips.forEach(c => c.addEventListener("click", () => {
    chips.forEach(x => x.classList.remove("active"));
    c.classList.add("active");
  }));

  renderCart();

  /* ---------- Toast ---------- */
  const $toast = document.getElementById("toast");
  const $toastMsg = document.getElementById("toastMsg");
  let tT;
  function toast(msg) {
    $toastMsg.textContent = msg;
    $toast.classList.add("show");
    clearTimeout(tT);
    tT = setTimeout(() => $toast.classList.remove("show"), 2400);
  }

  /* ---------- Countdown ---------- */
  const cd = document.getElementById("countdown");
  if (cd) {
    const h = cd.querySelector('[data-cd="h"]'), m = cd.querySelector('[data-cd="m"]'), s = cd.querySelector('[data-cd="s"]');
    function tick() {
      const now = new Date(); const end = new Date(now); end.setHours(24, 0, 0, 0);
      let d = Math.max(0, Math.floor((end - now) / 1000));
      h.textContent = String(Math.floor(d / 3600)).padStart(2, "0"); d %= 3600;
      m.textContent = String(Math.floor(d / 60)).padStart(2, "0");
      s.textContent = String(d % 60).padStart(2, "0");
    }
    tick(); setInterval(tick, 1000);
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
