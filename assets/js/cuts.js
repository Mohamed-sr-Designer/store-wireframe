/* =========================================================
   ترخيم — صفحة دليل القطعيات (المخطط التفاعلي)
   ========================================================= */
(function () {
  "use strict";
  const T = window.TARKHEEM; if (!T) return;
  const map = document.getElementById("mapSvg"); if (!map) return;

  let animal = "ضأن";
  let zone = null;

  const money = n => Number(n).toLocaleString("en-US");
  const CHEV = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>';
  const miniBar = v => `<span class="mini-bar">${[1, 2, 3, 4, 5].map(n => `<i class="${n <= v ? "on" : ""}"></i>`).join("")}</span>`;

  /* ---------- panel ---------- */
  const panel = document.getElementById("panel");
  function renderPanel() {
    if (!zone) {
      panel.innerHTML = `<div class="panel-empty">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11.5 4 9l8-4 8 4-5 2.5"/><path d="M4 9v6l8 4 8-4V9"/><path d="m12 13 8-4M12 13v6M12 13 4 9"/></svg>
        اختر منطقة على المخطط لعرض قطعياتها</div>`;
      return;
    }
    const pr = T.PRIMALS[animal][zone];
    const list = T.byZone(animal, zone);
    panel.innerHTML = `
      <div class="panel-head">
        <span class="k">${animal} · منطقة</span>
        <h3>${pr.name}</h3>
        <p>${pr.note}</p>
      </div>
      <div class="cut-list">
        ${list.length ? list.map(c => `
          <a class="cut-row" href="cut.html?c=${c.slug}">
            <span class="thumb"><img class="imgfill" src="${c.img}" alt="${c.name}" loading="lazy"></span>
            <span class="cr-b">
              <span class="cut-code"><b>${c.code}</b></span>
              <b>${c.name}</b>
            </span>
            <span class="cr-p">${money(c.price)} ر.س</span>
            <span class="go">${CHEV}</span>
          </a>`).join("")
        : `<div class="panel-empty" style="padding:28px 0">لا توجد قطعيات مسجّلة في هذه المنطقة بعد.</div>`}
      </div>`;
  }

  /* ---------- map interaction ---------- */
  const groups = [...map.querySelectorAll(".zg")];
  groups.forEach(g => {
    g.setAttribute("role", "button");
    g.setAttribute("tabindex", "0");
    const pick = () => {
      const z = g.dataset.zone;
      zone = (zone === z) ? null : z;
      groups.forEach(x => x.classList.toggle("on", zone && x.dataset.zone === zone));
      renderPanel();
    };
    g.addEventListener("click", pick);
    g.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(); } });
  });

  /* ---------- species ---------- */
  const sp = document.getElementById("species");
  if (sp) sp.addEventListener("click", e => {
    const b = e.target.closest("button[data-animal]"); if (!b) return;
    animal = b.dataset.animal;
    sp.querySelectorAll("button").forEach(x => x.classList.toggle("on", x === b));
    // keep the selected zone if the new species has cuts there, else clear
    if (zone && !T.byZone(animal, zone).length) {
      zone = null; groups.forEach(x => x.classList.remove("on"));
    }
    renderPanel(); renderIndex();
  });

  /* ---------- full index ---------- */
  const idx = document.getElementById("cutIndex");
  function renderIndex() {
    const head = idx.querySelector(".head");
    idx.innerHTML = "";
    idx.appendChild(head);
    T.byAnimal(animal).forEach(c => {
      const a = document.createElement("a");
      a.className = "cut-index__row";
      a.href = "cut.html?c=" + c.slug;
      a.innerHTML = `<span class="cut-code"><b>${c.code}</b></span>
        <span><b>${c.name}</b><span class="en">${c.en}</span></span>
        <span class="hide-s">${miniBar(c.spec[0])}</span>
        <span class="hide-s">${miniBar(c.spec[1])}</span>
        <span class="pr">${money(c.price)}</span>`;
      idx.appendChild(a);
    });
  }

  renderPanel();
  renderIndex();

  /* deep link: cuts.html#leg */
  const h = location.hash.replace("#", "");
  if (h && T.ZONES.indexOf(h) > -1) {
    zone = h;
    groups.forEach(x => x.classList.toggle("on", x.dataset.zone === h));
    renderPanel();
  }
})();
