/* =========================================================
   ترخيم — صفحة القطعة (تعليمية أولاً، شراء أخيراً)
   ========================================================= */
(function () {
  "use strict";
  const T = window.TARKHEEM; if (!T) return;
  const root = document.getElementById("cutMain"); if (!root) return;

  const money = n => Number(n).toLocaleString("en-US");
  const slug = new URLSearchParams(location.search).get("c");
  const cut = T.bySlug(slug) || T.CUTS[0];
  const primal = T.PRIMALS[cut.animal][cut.primal];

  const $ = id => document.getElementById(id);
  const set = (id, v) => { const e = $(id); if (e) e.textContent = v; };

  /* ---- head / meta ---- */
  document.title = `${cut.name} — ${cut.code} · ترخيم`;
  $("pDesc").setAttribute("content",
    `${cut.name} (${cut.en}): ${cut.origin} تعرّف على قوامها ونسبة دهنها وأفضل طريقة لطبخها — ترخيم.`);

  /* ---- hero ---- */
  set("crumbCut", cut.name); set("cutCode", cut.code); set("cutName", cut.name);
  set("cutEn", cut.en); set("cutWhy", cut.why); set("cutOrigin", cut.origin); set("cutTip", cut.tip);
  $("cutImg").innerHTML = `<img class="imgfill" src="${cut.img}" alt="${cut.name}">`;

  /* ---- origin locator ---- */
  set("locAnimal", cut.animal + " · المنطقة");
  set("locPrimal", primal.name);
  document.querySelectorAll("#locSvg .lz").forEach(p => p.classList.toggle("on", p.dataset.z === cut.primal));

  /* ---- spec meters ---- */
  const KEYS = [["طراوة", ""], ["دهن", ""], ["قوة النكهة", ""], ["صعوبة التحضير", "eff"]];
  $("cutSpec").innerHTML = `<div class="spec-strip">${KEYS.map((k, i) =>
    `<div class="spec-row ${k[1]}" style="grid-template-columns:7rem 1fr"><span class="k">${k[0]}</span>
     <span class="spec-bar">${[1, 2, 3, 4, 5].map(n => `<i class="${n <= cut.spec[i] ? "on" : ""}"></i>`).join("")}</span></div>`).join("")}</div>`;

  /* ---- best for ---- */
  $("cutBest").innerHTML = cut.bestFor.map(b => `<span class="chip-tag">${b}</span>`).join("");

  /* ---- methods ---- */
  const MI = {
    flame: '<path d="M12 22c4 0 7-2.7 7-6.5 0-4-3-6-4-9-1.6 1.6-2 3-2 4.5C11 9 9 6.5 9 4.5 7 7 5 9.5 5 15.5 5 19.3 8 22 12 22Z"/>',
    pan: '<path d="M3 12h11a4 4 0 0 1 0 8H8a5 5 0 0 1-5-5z"/><path d="M14 12 21 5"/>',
    oven: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M7 6h.01M11 6h.01"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    pot: '<path d="M4 9h16v7a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/><path d="M2 9h20M7 5l1 4M17 5l-1 4"/>',
    swap: '<path d="M7 4 3 8l4 4"/><path d="M3 8h13a4 4 0 0 1 0 8h-1"/><path d="m17 20 4-4-4-4"/>'
  };
  $("cutMethods").innerHTML = cut.methods.map(m => {
    const M = T.METHODS[m]; if (!M) return "";
    return `<div class="method">
      <span class="mi"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${MI[M.icon] || MI.pan}</svg></span>
      <b>${M.name}</b><span>${M.note}</span></div>`;
  }).join("");

  /* ---- doneness ruler ---- */
  if (cut.doneness) {
    $("donenessBlock").hidden = false;
    const steps = $("dSteps"), pin = $("dPin");
    steps.innerHTML = T.DONENESS.map(d => `<button type="button" data-k="${d.k}">${d.n}</button>`).join("");
    function pick(k) {
      const d = T.DONENESS.find(x => x.k === k) || T.DONENESS[1];
      set("dName", d.n); set("dTemp", d.t + "°م");
      pin.style.left = d.pos + "%"; pin.setAttribute("data-t", d.t + "°");
      steps.querySelectorAll("button").forEach(b => b.classList.toggle("on", b.dataset.k === k));
    }
    steps.addEventListener("click", e => { const b = e.target.closest("button"); if (b) pick(b.dataset.k); });
    pick(cut.doneness);
    set("dRest", cut.restMin ? `أرِح اللحم ${cut.restMin} دقيقة بعد رفعه عن النار قبل التقطيع.` :
      "قطعة طبخ بطيء — تُقاس بالطراوة لا بالحرارة.");
  } else {
    set("dRest", "");
  }

  /* ---- buy ---- */
  set("buyName", cut.name);
  set("buyPrice", money(cut.price) + " ر.س");
  set("buyWeight", "الوزن التقريبي: " + cut.weight);
  set("barPrice", money(cut.price) + " ر.س");
  set("barWeight", cut.weight);
  if (cut.old) $("buyOld").textContent = money(cut.old) + " ر.س";

  const qv = $("qVal");
  $("qMinus").addEventListener("click", () => qv.textContent = Math.max(1, (+qv.textContent) - 1));
  $("qPlus").addEventListener("click", () => qv.textContent = (+qv.textContent) + 1);

  function addCut() {
    const q = +qv.textContent || 1;
    if (window.TKCart) window.TKCart.add({ id: cut.slug, name: cut.name, price: cut.price, img: cut.img }, q);
  }
  $("cutAdd").addEventListener("click", addCut);
  $("barAdd").addEventListener("click", addCut);

  /* ---- related cuts (same animal, different cut) ---- */
  const rel = T.byAnimal(cut.animal).filter(c => c.slug !== cut.slug).slice(0, 6);
  $("relatedCuts").innerHTML = rel.map(c => `<article class="pcard">
      <div class="pcard__media"><img class="imgfill" src="${c.img}" alt="${c.name}" loading="lazy">
        <a class="pcard__link" href="cut.html?c=${c.slug}" aria-label="${c.name}"></a></div>
      <div class="pcard__body">
        <div class="pcard__meta"><span class="cut-code"><b>${c.code}</b></span><span class="pcard__cat">${T.PRIMALS[c.animal][c.primal].name}</span></div>
        <a class="pcard__title" href="cut.html?c=${c.slug}">${c.name}</a>
        <div class="spec-strip">${[0, 1, 2, 3].map(i =>
    `<div class="spec-row ${i === 3 ? "eff" : ""}"><span class="k">${["طراوة", "دهن", "نكهة", "تحضير"][i]}</span>
          <span class="spec-bar">${[1, 2, 3, 4, 5].map(n => `<i class="${n <= c.spec[i] ? "on" : ""}"></i>`).join("")}</span></div>`).join("")}</div>
        <div class="pcard__foot"><div class="price">${money(c.price)}<span class="cur">ر.س</span></div></div>
      </div></article>`).join("");
})();
