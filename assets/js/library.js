/* ترخيم — المكتبة */
(function () {
  "use strict";
  const T = window.TARKHEEM; if (!T) return;
  const el = document.getElementById("allDishes"); if (!el) return;

  const DICON = {
    kabsa: '<path d="M4 18h16M6 18c0-5 2.7-8 6-8s6 3 6 8"/><path d="M12 10V6M9 6h6"/>',
    mandi: '<path d="M3 12h18M5 12a7 7 0 0 1 14 0M8 19h8"/><path d="M12 19v-3"/>',
    mashawi: '<path d="M12 22c4 0 7-2.7 7-6.5 0-4-3-6-4-9-1.6 1.6-2 3-2 4.5C11 9 9 6.5 9 4.5 7 7 5 9.5 5 15.5 5 19.3 8 22 12 22Z"/>',
    steak: '<path d="M3 12h11a4 4 0 0 1 0 8H8a5 5 0 0 1-5-5z"/><path d="M14 12 21 5"/>',
    slow: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    burger: '<path d="M4 11h16a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/><path d="M5 8c1-2 3-3 7-3s6 1 7 3M6 18h12"/>'
  };

  el.innerHTML = T.DISHES.map(d => `<a class="dish" href="dish.html?d=${d.slug}">
      <span class="di"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${DICON[d.slug] || DICON.steak}</svg></span>
      <b>${d.name}</b><span>${d.cuts.length} قطعيات</span></a>`).join("");
})();
