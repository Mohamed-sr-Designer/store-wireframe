/* =========================================================
   نُضْج — الرئيسية
   ========================================================= */
(function () {
  "use strict";
  const T = window.NUDJ; if (!T) return;
  const money = n => Number(n).toLocaleString("en-US");
  const $ = id => document.getElementById(id);

  const specStrip = s => `<div class="spec-strip">${[0, 1, 2, 3].map(i =>
    `<div class="spec-row ${i === 3 ? "eff" : ""}"><span class="k">${["طراوة", "دهن", "نكهة", "تحضير"][i]}</span>
     <span class="spec-bar">${[1, 2, 3, 4, 5].map(n => `<i class="${n <= s[i] ? "on" : ""}"></i>`).join("")}</span></div>`).join("")}</div>`;

  const cutCard = c => `<article class="pcard">
      <div class="pcard__media">
        <a class="pcard__link" href="cut.html?c=${c.slug}" aria-label="${c.name}"></a></div>
      <div class="pcard__body">
        <div class="pcard__meta"><span class="cut-code"><b>${c.code}</b></span><span class="pcard__cat">${T.PRIMALS[c.animal][c.primal].name}</span></div>
        <a class="pcard__title" href="cut.html?c=${c.slug}">${c.name}</a>
        ${specStrip(c.spec)}
        <div class="pcard__foot">
          <div class="price${c.old ? " sale" : ""}">${money(c.price)}<span class="cur">ر.س</span>${c.old ? `<del>${money(c.old)}</del>` : ""}</div>
          <button class="add" type="button" aria-label="أضف للسلة" data-cut="${c.slug}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
          </button>
        </div>
      </div></article>`;

  /* ---- 04 · قطعة الأسبوع ---- */
  const FEATURED = "lamb-shank";
  const f = T.bySlug(FEATURED);
  if (f && $("featCut")) {
    $("featCut").innerHTML = `
      <div class="cut-hero__img"></div>
      <div class="cut-hero__in">
        <span class="cut-code"><b>${f.code}</b></span>
        <h2 style="font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;margin:.5rem 0 .3rem">${f.name}</h2>
        <span class="en">${f.en}</span>
        <p class="why">${f.why}</p>
        <div style="margin:20px 0">${specStrip(f.spec)}</div>
        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <a class="btn btn--brand" href="cut.html?c=${f.slug}">اقرأ القطعة كاملة</a>
          <button class="btn btn--ghost" type="button" data-cut="${f.slug}">أضف للسلة · ${money(f.price)} ر.س</button>
        </div>
      </div>`;
  }

  /* ---- 03 · مناطق المخطط ---- */
  if ($("primalRail")) {
    $("primalRail").innerHTML = T.ZONES.map(z => {
      const p = T.PRIMALS["ضأن"][z];
      const n = T.byZone("ضأن", z).length;
      return `<a class="primal-link" href="cuts.html#${z}">
        <span class="pl-n">${p.name}</span>
        <span class="pl-c">${n} قطعيات</span>
      </a>`;
    }).join("");
  }

  /* ---- 07 · رفّ الطلب ---- */
  if ($("shopShelf")) {
    const picks = ["lamb-leg", "beef-ribeye", "lamb-rack", "beef-tenderloin", "lamb-shoulder", "beef-chuck"]
      .map(s => T.bySlug(s)).filter(Boolean);
    $("shopShelf").innerHTML = picks.map(cutCard).join("");
  }

  /* ---- add-to-cart delegation (cuts model) ---- */
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-cut]"); if (!b) return;
    e.preventDefault();
    const c = T.bySlug(b.dataset.cut); if (!c || !window.TKCart) return;
    window.TKCart.add({ id: c.slug, name: c.name, price: c.price, img: c.img }, 1);
    if (b.classList.contains("add")) { b.classList.add("added"); setTimeout(() => b.classList.remove("added"), 800); }
  });

  /* ---- 05 · مرجع الحرارات ---- */
  if ($("tempRail")) {
    $("tempRail").innerHTML = T.DONENESS.map(d =>
      `<div class="temp-col"><b>${d.t}°</b><span>${d.n}</span></div>`).join("");
  }
})();
