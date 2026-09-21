/* نُضْج — صفحة الطبخة (ابدأ من الطبخة، انتهِ بالقطعة) */
(function () {
  "use strict";
  const T = window.NUDJ; if (!T) return;
  if (!document.getElementById("dishMain")) return;
  const $ = id => document.getElementById(id);
  const money = n => Number(n).toLocaleString("en-US");

  const DICON = {
    kabsa: '<path d="M4 18h16M6 18c0-5 2.7-8 6-8s6 3 6 8"/><path d="M12 10V6M9 6h6"/>',
    mandi: '<path d="M3 12h18M5 12a7 7 0 0 1 14 0M8 19h8"/><path d="M12 19v-3"/>',
    mashawi: '<path d="M12 22c4 0 7-2.7 7-6.5 0-4-3-6-4-9-1.6 1.6-2 3-2 4.5C11 9 9 6.5 9 4.5 7 7 5 9.5 5 15.5 5 19.3 8 22 12 22Z"/>',
    steak: '<path d="M3 12h11a4 4 0 0 1 0 8H8a5 5 0 0 1-5-5z"/><path d="M14 12 21 5"/>',
    slow: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    burger: '<path d="M4 11h16a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/><path d="M5 8c1-2 3-3 7-3s6 1 7 3M6 18h12"/>'
  };
  const dishTile = d => `<a class="dish" href="dish.html?d=${d.slug}">
      <span class="di"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${DICON[d.slug] || DICON.steak}</svg></span>
      <b>${d.name}</b><span>${d.cuts.length} قطعيات</span></a>`;

  const slug = new URLSearchParams(location.search).get("d");
  const d = T.dishBySlug(slug) || T.DISHES[0];

  document.title = `${d.name} — أي قطعة تحتاج؟ · نُضْج`;
  const md = document.querySelector('meta[name="description"]');
  if (md) md.setAttribute("content", `${d.name}: ${d.needs}. القطعيات الموصى بها ولماذا، الخطوات، وكم لحم تحتاج للشخص — من نُضْج.`);

  $("crumbDish").textContent = d.name;
  $("dishEn").textContent = d.en.toUpperCase();
  $("dishName").textContent = d.name;
  $("dishIntro").textContent = d.intro;
  $("dishNeeds").textContent = d.needs;
  $("dishWhy").textContent = d.why;
  $("dishAvoid").textContent = d.avoid;
  $("dishPer").textContent = d.perPerson;
  $("dishImg").innerHTML = ``;

  $("dishSteps").innerHTML = `<div class="cut-index">${d.steps.map((s, i) =>
    `<div class="cut-index__row" style="grid-template-columns:3rem 1fr">
       <span class="cut-code"><b>${String(i + 1).padStart(2, "0")}</b></span><span>${s}</span></div>`).join("")}</div>`;

  /* القطعيات الموصى بها */
  $("dishCuts").innerHTML = d.cuts.map(s => T.bySlug(s)).filter(Boolean).map(c => `<article class="pcard">
      <div class="pcard__media">
        <a class="pcard__link" href="cut.html?c=${c.slug}" aria-label="${c.name}"></a></div>
      <div class="pcard__body">
        <div class="pcard__meta"><span class="cut-code"><b>${c.code}</b></span><span class="pcard__cat">${T.PRIMALS[c.animal][c.primal].name}</span></div>
        <a class="pcard__title" href="cut.html?c=${c.slug}">${c.name}</a>
        <div class="spec-strip">${[0, 1, 2, 3].map(i =>
    `<div class="spec-row ${i === 3 ? "eff" : ""}"><span class="k">${["طراوة", "دهن", "نكهة", "تحضير"][i]}</span>
          <span class="spec-bar">${[1, 2, 3, 4, 5].map(n => `<i class="${n <= c.spec[i] ? "on" : ""}"></i>`).join("")}</span></div>`).join("")}</div>
        <div class="pcard__foot">
          <div class="price">${money(c.price)}<span class="cur">ر.س</span></div>
          <button class="add" type="button" aria-label="أضف للسلة" data-cut="${c.slug}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
          </button>
        </div>
      </div></article>`).join("");

  $("otherDishes").innerHTML = T.DISHES.filter(x => x.slug !== d.slug).map(dishTile).join("");
  if (window.TKWish) window.TKWish.paint($("dishCuts"));

  /* ---- structured data: HowTo + Breadcrumb ---- */
  (function ld() {
    const base = location.href.split("?")[0].replace(/dish\.html$/, "");
    const data = [{
      "@context": "https://schema.org", "@type": "HowTo",
      name: d.name + " — أي قطعة تحتاج وكيف تُطبخ",
      description: d.intro,
      supply: d.cuts.map(s => { const c = T.bySlug(s); return { "@type": "HowToSupply", name: c ? c.name : s }; }),
      step: d.steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, text: s })),
      yield: d.perPerson
    }, {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "الرئيسية", item: base + "index.html" },
        { "@type": "ListItem", position: 2, name: "وش تطبخ", item: base + "library.html" },
        { "@type": "ListItem", position: 3, name: d.name }
      ]
    }];
    const s = document.createElement("script");
    s.type = "application/ld+json"; s.textContent = JSON.stringify(data);
    document.head.appendChild(s);
  })();

  /* add to cart */
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-cut]"); if (!b) return;
    e.preventDefault();
    const c = T.bySlug(b.dataset.cut); if (!c || !window.TKCart) return;
    window.TKCart.add({ id: c.slug, name: c.name, price: c.price, img: c.img }, 1);
    b.classList.add("added"); setTimeout(() => b.classList.remove("added"), 800);
  });
})();
