/* ترخيم — المتجر: فهرس القطعيات بتصفية حقيقية */
(function () {
  "use strict";
  const T = window.TARKHEEM; if (!T) return;
  const grid = document.getElementById("shopGrid"); if (!grid) return;
  const $ = id => document.getElementById(id);
  const money = n => Number(n).toLocaleString("en-US");

  const state = { animal: new Set(), zone: new Set(), method: new Set(), trait: new Set(), sort: "code" };

  const opt = (label, group, value, count) => `<div class="fopt" data-g="${group}" data-v="${value}">
      <span class="box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
      ${label}<span class="cnt">${count}</span></div>`;

  /* build filters from the data */
  $("fAnimal").innerHTML = ["ضأن", "بقر"].map(a =>
    opt(a, "animal", a, T.byAnimal(a).length)).join("");

  $("fZone").innerHTML = T.ZONES.map(z => {
    const n = T.CUTS.filter(c => c.primal === z).length;
    return n ? opt(T.PRIMALS["ضأن"][z].name.replace(/\s*\(.*\)/, ""), "zone", z, n) : "";
  }).join("");

  $("fMethod").innerHTML = Object.keys(T.METHODS).map(m => {
    const n = T.CUTS.filter(c => c.methods.indexOf(m) > -1).length;
    return n ? opt(T.METHODS[m].name, "method", m, n) : "";
  }).join("");

  function matches(c) {
    if (state.animal.size && !state.animal.has(c.animal)) return false;
    if (state.zone.size && !state.zone.has(c.primal)) return false;
    if (state.method.size && !c.methods.some(m => state.method.has(m))) return false;
    if (state.trait.has("tender") && c.spec[0] < 4) return false;
    if (state.trait.has("fat") && c.spec[1] < 4) return false;
    if (state.trait.has("easy") && c.spec[3] > 2) return false;
    return true;
  }

  const SORTS = {
    code: (a, b) => a.code.localeCompare(b.code, "ar"),
    low: (a, b) => a.price - b.price,
    high: (a, b) => b.price - a.price,
    tender: (a, b) => b.spec[0] - a.spec[0],
    bold: (a, b) => b.spec[2] - a.spec[2]
  };

  const card = c => `<article class="pcard">
      <div class="pcard__media"><img class="imgfill" src="${c.img}" alt="${c.name}" loading="lazy">
        <a class="pcard__link" href="cut.html?c=${c.slug}" aria-label="${c.name}"></a>
        ${c.old ? `<div class="pcard__badges"><span class="tag-off">%${Math.round((1 - c.price / c.old) * 100)}-</span></div>` : ""}
        <button class="wish" type="button" aria-label="أضف للمفضلة"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21l7.7-7.6 1.1-1a5.5 5.5 0 0 0 0-7.8Z"/></svg></button>
      </div>
      <div class="pcard__body">
        <div class="pcard__meta"><span class="cut-code"><b>${c.code}</b></span><span class="pcard__cat">${T.PRIMALS[c.animal][c.primal].name}</span></div>
        <a class="pcard__title" href="cut.html?c=${c.slug}">${c.name}</a>
        <div class="spec-strip">${[0, 1, 2, 3].map(i =>
    `<div class="spec-row ${i === 3 ? "eff" : ""}"><span class="k">${["طراوة", "دهن", "نكهة", "تحضير"][i]}</span>
          <span class="spec-bar">${[1, 2, 3, 4, 5].map(n => `<i class="${n <= c.spec[i] ? "on" : ""}"></i>`).join("")}</span></div>`).join("")}</div>
        <div class="pcard__foot">
          <div class="price${c.old ? " sale" : ""}">${money(c.price)}<span class="cur">ر.س</span>${c.old ? `<del>${money(c.old)}</del>` : ""}</div>
          <button class="add" type="button" aria-label="أضف للسلة" data-cut="${c.slug}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
          </button>
        </div>
      </div></article>`;

  function render() {
    const list = T.CUTS.filter(matches).sort(SORTS[state.sort] || SORTS.code);
    grid.innerHTML = list.map(card).join("");
    $("resCount").textContent = list.length;
    $("shopEmpty").hidden = list.length > 0;
    grid.hidden = list.length === 0;
  }

  /* filter interaction */
  document.querySelectorAll(".filter .fopt").forEach(o => o.addEventListener("click", () => {
    o.classList.toggle("on");
    const g = o.dataset.g, v = o.dataset.v, t = o.dataset.trait;
    if (t) { state.trait.has(t) ? state.trait.delete(t) : state.trait.add(t); }
    else if (g) { state[g].has(v) ? state[g].delete(v) : state[g].add(v); }
    render();
  }));

  $("catSort").addEventListener("change", e => { state.sort = e.target.value; render(); });

  $("clearF").addEventListener("click", () => {
    ["animal", "zone", "method", "trait"].forEach(k => state[k].clear());
    document.querySelectorAll(".filter .fopt.on").forEach(o => o.classList.remove("on"));
    render();
  });

  const ft = $("filterToggle");
  if (ft) ft.addEventListener("click", () => document.querySelector(".filter").classList.toggle("open"));

  /* deep link: category.html?a=ضأن  أو  ?z=leg */
  const q = new URLSearchParams(location.search);
  if (q.get("a")) { state.animal.add(q.get("a")); document.querySelectorAll('[data-g="animal"]').forEach(o => { if (o.dataset.v === q.get("a")) o.classList.add("on"); }); }
  if (q.get("z")) { state.zone.add(q.get("z")); document.querySelectorAll('[data-g="zone"]').forEach(o => { if (o.dataset.v === q.get("z")) o.classList.add("on"); }); }

  /* add to cart + wishlist heart */
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-cut]"); if (!b) return;
    e.preventDefault();
    const c = T.bySlug(b.dataset.cut); if (!c || !window.TKCart) return;
    window.TKCart.add({ id: c.slug, name: c.name, price: c.price, img: c.img }, 1);
    b.classList.add("added"); setTimeout(() => b.classList.remove("added"), 800);
  });

  render();
})();
