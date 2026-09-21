/* نُضْج — مختبر الطبخ */
(function () {
  "use strict";
  const T = window.NUDJ; if (!T) return;
  const $ = id => document.getElementById(id);
  if (!$("methodAll")) return;

  const MI = {
    flame: '<path d="M12 22c4 0 7-2.7 7-6.5 0-4-3-6-4-9-1.6 1.6-2 3-2 4.5C11 9 9 6.5 9 4.5 7 7 5 9.5 5 15.5 5 19.3 8 22 12 22Z"/>',
    pan: '<path d="M3 12h11a4 4 0 0 1 0 8H8a5 5 0 0 1-5-5z"/><path d="M14 12 21 5"/>',
    oven: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M7 6h.01M11 6h.01"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    pot: '<path d="M4 9h16v7a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/><path d="M2 9h20M7 5l1 4M17 5l-1 4"/>',
    swap: '<path d="M7 4 3 8l4 4"/><path d="M3 8h13a4 4 0 0 1 0 8h-1"/><path d="m17 20 4-4-4-4"/>'
  };
  const LONG = {
    grill: "للقطعيات الطرية قليلة النسيج الضام: الريش، الخاصرة، الريب آي. الحرارة المباشرة تبني قشرة في دقائق.",
    pan: "أعلى تلامس وأفضل قشرة. تحتاج سطحاً جافاً تماماً ومقلاة ساخنة قبل أن يلمسها اللحم.",
    oven: "حرارة محيطة متساوية — الأنسب للقطع الكبيرة الكاملة كالفخذ والكتف.",
    slow: "حرارة منخفضة وزمن طويل يحوّل الكولاجين إلى جيلاتين. للموزة والرقبة والصدر.",
    braise: "تحمير جاف أولاً لبناء النكهة، ثم سائل مغطّى. أفضل ما يناسب الأكتاف والمكعبات.",
    reverse: "فرن منخفض حتى قبل درجة الهدف بقليل، ثم تحمير نهائي سريع. أدق طريقة للستيك السميك."
  };

  $("methodAll").innerHTML = Object.keys(T.METHODS).map(k => {
    const M = T.METHODS[k];
    return `<div class="method">
      <span class="mi"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${MI[M.icon] || MI.pan}</svg></span>
      <b>${M.name}</b><span>${LONG[k] || M.note}</span></div>`;
  }).join("");

  /* ruler */
  const steps = $("dSteps"), pin = $("dPin");
  const NOTE = {
    rare: "سطح محمّر وقلب أحمر بارد. للقطع الطرية جداً فقط.",
    mr: "الدرجة المرجعية لمعظم الستيك: قلب وردي دافئ وعصارة محفوظة.",
    med: "وردي فاتح في المنتصف. تبدأ العصارة بالانخفاض هنا.",
    mw: "أثر وردي خفيف فقط. مناسبة للفخذ المشوي كاملاً.",
    well: "بلا لون وردي. ضرورية للمفروم والدواجن، ومكلفة لبقية القطع."
  };
  steps.innerHTML = T.DONENESS.map(d => `<button type="button" data-k="${d.k}">${d.n}</button>`).join("");
  function pick(k) {
    const d = T.DONENESS.find(x => x.k === k);
    $("dName").textContent = d.n; $("dTemp").textContent = d.t + "°م";
    pin.style.left = d.pos + "%"; pin.setAttribute("data-t", d.t + "°");
    $("dNote").textContent = NOTE[k];
    steps.querySelectorAll("button").forEach(b => b.classList.toggle("on", b.dataset.k === k));
  }
  steps.addEventListener("click", e => { const b = e.target.closest("button"); if (b) pick(b.dataset.k); });
  pick("mr");

  $("tempRail").innerHTML = T.DONENESS.map(d =>
    `<div class="temp-col"><b>${d.t}°</b><span>${d.n}</span></div>`).join("");
})();
