/* مولّد صفحات ترخيم — يبني الصفحات من نفس الـ shell (HTML ثابت، روابط قابلة للزحف) */
const fs = require("fs");
const donor = fs.readFileSync("cuts.html", "utf8");

const NAV = `<nav class="nav" aria-label="التنقل الرئيسي">
      <a href="cuts.html"{{on:cuts}}>دليل القطعيات</a>
      <a href="dish.html?d=kabsa"{{on:dish}}>وش تطبخ</a>
      <a href="cook.html"{{on:cook}}>مختبر الطبخ</a>
      <a href="library.html"{{on:lib}}>المكتبة</a>
      <a href="category.html"{{on:shop}}>المتجر</a>
    </nav>`;

function navFor(active) {
  let nav = NAV;
  ["cuts", "dish", "cook", "lib", "shop"].forEach(k => {
    nav = nav.replace("{{on:" + k + "}}", k === active ? ' class="is-on"' : "");
  });
  return nav;
}

function shell(p) {
  let s = donor;
  s = s.replace(/<title>[\s\S]*?<\/title>/, "<title>" + p.title + "</title>");
  s = s.replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="' + p.desc + '">');
  s = s.replace(/<nav class="nav"[\s\S]*?<\/nav>/, navFor(p.active));
  s = s.replace(/<main class="wrap">[\s\S]*?<\/main>/, p.main);
  // version-agnostic: swap the donor's page script for this page's script
  s = s.replace(/<script src="assets\/js\/cuts-data\.js[^"]*"><\/script>\s*<script src="assets\/js\/cuts\.js[^"]*"><\/script>/,
    '<script src="assets/js/cuts-data.js?v=2"></script>\n' + p.scripts);
  if (s.indexOf(p.scripts) === -1) throw new Error("script injection failed for " + p.file);
  return s;
}

/* ================= cook.html ================= */
const cookMain = `<main class="wrap">
  <div class="crumbs"><a href="index.html">الرئيسية</a><span class="sep">›</span><span class="cur">مختبر الطبخ</span></div>
  <div class="page-head"><div>
    <span class="eyebrow">مختبر الطبخ</span>
    <h1>الحرارة والزمن — أداتاك الحقيقيتان</h1>
    <div class="cnt">اللحم لا يستجيب للنية، يستجيب للفيزياء. هذه هي القواعد التي تحكم كل قطعة على النار.</div>
  </div></div>

  <section class="section" style="padding-top:8px">
    <div class="sec-head"><div><span class="eyebrow">01 — الطرق</span><h2>ست طرق، ست نتائج</h2>
      <div class="sub">اختيار الطريقة ليس ذوقاً — هو نتيجة لنوع النسيج داخل القطعة.</div></div></div>
    <div class="method-grid" id="methodAll"></div>
  </section>

  <section class="section" style="padding-top:0">
    <div class="sec-head"><div><span class="eyebrow">02 — درجة النضج</span><h2>مرجع الحرارات</h2>
      <div class="sub">حرارة مركز القطعة بالمئوية. اضغط أي درجة لترى أين تقع على المقياس.</div></div></div>
    <div class="ruler" style="max-width:640px">
      <div class="ruler__read"><span class="n" id="dName">—</span><span class="t" id="dTemp">—</span></div>
      <div class="ruler__scale"><span class="ruler__pin" id="dPin" data-t=""></span></div>
      <div class="ruler__steps" id="dSteps"></div>
      <p style="font-family:var(--f-mono);font-size:.66rem;color:var(--muted);margin-top:14px" id="dNote"></p>
    </div>
    <div class="temp-rail" id="tempRail" style="margin-top:22px"></div>
  </section>

  <section class="section" style="padding-top:0">
    <div class="sec-head"><div><span class="eyebrow">03 — الكمية</span><h2>كم لحم للشخص؟</h2>
      <div class="sub">أكثر سؤال يُسأل قبل العزيمة. هذه أرقام تخطيط عملية.</div></div></div>
    <div class="otable-wrap"><table class="otable">
      <thead><tr><th>الحالة</th><th>للشخص الواحد</th><th>ملاحظة</th></tr></thead>
      <tbody>
        <tr><td>لحم بالعظم (كبسة · مندي)</td><td>400–500 جم</td><td>العظم يشكّل ثلث الوزن تقريباً</td></tr>
        <tr><td>لحم منزوع العظم</td><td>250–300 جم</td><td>للأطباق الرئيسية</td></tr>
        <tr><td>ستيك</td><td>250–350 جم</td><td>شريحة سميكة أفضل من شريحتين رفيعتين</td></tr>
        <tr><td>مفروم (برجر)</td><td>150–180 جم</td><td>للقرص الواحد</td></tr>
        <tr><td>طبخ بطيء بالعظم</td><td>350–450 جم</td><td>ينكمش أكثر من غيره</td></tr>
      </tbody></table></div>
  </section>

  <section class="section" style="padding-top:0">
    <div class="sec-head"><div><span class="eyebrow">04 — الأخطاء</span><h2>خمسة أخطاء تُفسد قطعة ممتازة</h2></div></div>
    <div class="lib-grid">
      <div class="lib-card"><span class="k">خطأ 01</span><h3>اللحم بارد على النار</h3><p>القطعة الخارجة من الثلاجة مباشرة تحترق من الخارج قبل أن يسخن قلبها. أخرجها 30 دقيقة قبل الطبخ.</p></div>
      <div class="lib-card"><span class="k">خطأ 02</span><h3>سطح رطب</h3><p>الماء يمنع تفاعل ميلارد. طالما السطح مبلّل، اللحم يُسلق ولا يتحمّر مهما ارتفعت الحرارة.</p></div>
      <div class="lib-card"><span class="k">خطأ 03</span><h3>ازدحام المقلاة</h3><p>كل قطعة إضافية تخفض حرارة المقلاة وتُطلق بخاراً. اطبخ على دفعات.</p></div>
      <div class="lib-card"><span class="k">خطأ 04</span><h3>التقطيع فوراً</h3><p>القطع مباشرة بعد النار يُخرج العصارة إلى اللوح. أرِح اللحم 5–20 دقيقة حسب حجمه.</p></div>
      <div class="lib-card"><span class="k">خطأ 05</span><h3>التقطيع مع الألياف</h3><p>القطع دائماً عكس اتجاه الألياف. الاتجاه الخاطئ يجعل قطعة طرية تبدو قاسية.</p></div>
      <div class="lib-card"><span class="k">القاعدة</span><h3>قِس، لا تخمّن</h3><p>ميزان حرارة رخيص يفرق أكثر من أي مهارة. درجتان زائدتان تحوّلان نصف النيء إلى متوسط.</p></div>
    </div>
  </section>
</main>`;

/* ================= dish.html ================= */
const dishMain = `<main class="wrap" id="dishMain">
  <div class="crumbs"><a href="index.html">الرئيسية</a><span class="sep">›</span><a href="library.html">وش تطبخ</a><span class="sep">›</span><span class="cur" id="crumbDish">—</span></div>

  <div class="cut-hero">
    <div class="cut-hero__img" id="dishImg"></div>
    <div class="cut-hero__in">
      <span class="cut-code"><b id="dishEn">—</b></span>
      <h1 id="dishName">—</h1>
      <p class="why" id="dishIntro">—</p>
    </div>
  </div>

  <div class="cut-grid">
    <div>
      <section class="cut-block">
        <span class="sub">01 — المطلوب</span>
        <h2>أي قطعة تحتاج؟</h2>
        <p id="dishNeeds">—</p>
        <div class="tipbox" style="margin-top:18px"><span class="k">لماذا هذه القطع تحديداً</span><p id="dishWhy">—</p></div>
      </section>

      <section class="cut-block">
        <span class="sub">02 — الخطوات</span>
        <h2>كيف تُطبخ</h2>
        <div id="dishSteps" style="margin-top:14px"></div>
      </section>

      <section class="cut-block">
        <span class="sub">03 — تجنّب</span>
        <h2>ما الذي لا ينفع هنا</h2>
        <p id="dishAvoid">—</p>
      </section>
    </div>

    <aside>
      <div class="buybox">
        <span class="k">تخطيط الكمية</span>
        <h3 id="dishPer">—</h3>
        <p style="font-size:.86rem;color:var(--text);line-height:1.9;margin-bottom:18px">احسب على أساس عدد الضيوف، وزد 10٪ احتياطاً.</p>
        <a class="btn btn--brand btn--block" href="cook.html">افتح مختبر الطبخ</a>
        <div class="note"><span>تقطيع وتجهيز حسب الطبخة — مجاناً</span><span>اذكر اسم الطبخة في ملاحظات الطلب</span></div>
      </div>
    </aside>
  </div>

  <section class="section">
    <div class="sec-head"><div><span class="eyebrow">القطعيات الموصى بها</span><h2>اشترِ القطعة الصحيحة</h2>
      <div class="sub">كل قطعة هنا لها صفحة مرجع كاملة — اقرأها قبل الطلب.</div></div>
      <a class="seeall" href="cuts.html">كل القطعيات <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a></div>
    <div class="shelf" id="dishCuts"></div>
  </section>

  <section class="section" style="padding-top:0">
    <div class="sec-head"><div><span class="eyebrow">طبخات أخرى</span><h2>وش تطبخ غير كذا</h2></div></div>
    <div class="dish-grid" id="otherDishes"></div>
  </section>
</main>`;

/* ================= library.html ================= */
const libMain = `<main class="wrap">
  <div class="crumbs"><a href="index.html">الرئيسية</a><span class="sep">›</span><span class="cur">المكتبة</span></div>
  <div class="page-head"><div>
    <span class="eyebrow">المكتبة</span>
    <h1>أسئلة اللحم — مجاب عنها</h1>
    <div class="cnt">أدلة مبنية على أسئلة حقيقية يبحث عنها الناس قبل الشراء.</div>
  </div></div>

  <section class="section" style="padding-top:8px">
    <div class="sec-head"><div><span class="eyebrow">اختيار القطعة</span><h2>أي قطعة أشتري؟</h2></div></div>
    <div class="lib-grid">
      <a class="lib-card" href="dish.html?d=kabsa"><span class="k">دليل</span><h3>أي قطعة تنفع للكبسة؟</h3><p>الفرق بين الفخذ والكتف في المرق والمنظر، وكم كيلو تحتاج لعدد ضيوفك.</p><span class="rd">اقرأ ←</span></a>
      <a class="lib-card" href="dish.html?d=mandi"><span class="k">دليل</span><h3>أفضل قطعة للمندي</h3><p>لماذا يتفوّق الكتف على الفخذ في الطبخ الطويل المغلق، وما الذي يجعله لا يجف.</p><span class="rd">اقرأ ←</span></a>
      <a class="lib-card" href="cut.html?c=beef-ribeye"><span class="k">مقارنة</span><h3>الريب آي أم التندرلوين؟</h3><p>واحد يُطبخ للنكهة والآخر للقوام — ولماذا يختلف السعر بينهما كل هذا الاختلاف.</p><span class="rd">اقرأ ←</span></a>
    </div>
  </section>

  <section class="section" style="padding-top:0">
    <div class="sec-head"><div><span class="eyebrow">التقنية</span><h2>لماذا يتصرف اللحم هكذا؟</h2></div></div>
    <div class="lib-grid">
      <a class="lib-card" href="cut.html?c=lamb-shank"><span class="k">تقنية</span><h3>لماذا تحتاج الموزة ثلاث ساعات؟</h3><p>الكولاجين لا يذوب بالحرارة العالية بل بالزمن — ماذا يحدث داخل القطعة ساعة بساعة.</p><span class="rd">اقرأ ←</span></a>
      <a class="lib-card" href="cook.html"><span class="k">مرجع</span><h3>درجات النضج بالأرقام</h3><p>من 50° إلى 71°: ماذا يعني كل رقم داخل اللحم، ولماذا ترتفع الحرارة بعد رفعه عن النار.</p><span class="rd">اقرأ ←</span></a>
      <a class="lib-card" href="cook.html"><span class="k">مرجع</span><h3>كم لحم للشخص الواحد؟</h3><p>أرقام تخطيط عملية للعزائم: بالعظم، منزوع العظم، ستيك، ومفروم.</p><span class="rd">اقرأ ←</span></a>
    </div>
  </section>

  <section class="section" style="padding-top:0">
    <div class="sec-head"><div><span class="eyebrow">ابدأ من الطبخة</span><h2>كل الطبخات</h2></div></div>
    <div class="dish-grid" id="allDishes"></div>
  </section>
</main>`;

/* ================= category.html ================= */
const shopMain = `<main class="wrap">
  <div class="crumbs"><a href="index.html">الرئيسية</a><span class="sep">›</span><span class="cur">المتجر</span></div>
  <div class="page-head"><div>
    <span class="eyebrow">الفهرس التجاري</span>
    <h1>كل القطعيات — جاهزة للطلب</h1>
    <div class="cnt">صفّ حسب نوع اللحم أو المنطقة أو طريقة الطبخ. كل قطعة لها صفحة مرجع كاملة.</div>
  </div></div>

  <div class="shop">
    <aside class="filter" id="filter">
      <h4>تصفية</h4>
      <div class="fgroup"><h5>نوع اللحم</h5><div id="fAnimal"></div></div>
      <div class="fgroup"><h5>المنطقة</h5><div id="fZone"></div></div>
      <div class="fgroup"><h5>طريقة الطبخ</h5><div id="fMethod"></div></div>
      <div class="fgroup"><h5>القوام</h5>
        <div class="fopt" data-trait="tender"><span class="box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span> طراوة عالية</div>
        <div class="fopt" data-trait="fat"><span class="box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span> دهن مرتفع</div>
        <div class="fopt" data-trait="easy"><span class="box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span> سهلة التحضير</div>
      </div>
      <button class="btn btn--ghost btn--sm btn--block" id="clearF" type="button" style="margin-top:14px">مسح التصفية</button>
    </aside>

    <div>
      <div class="shop-toolbar">
        <button class="filter-toggle" id="filterToggle"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M7 12h10M10 18h4"/></svg> التصفية</button>
        <span class="res"><b id="resCount">0</b> قطعية</span>
        <select id="catSort" aria-label="ترتيب">
          <option value="code">حسب الكود</option>
          <option value="low">السعر: من الأقل</option>
          <option value="high">السعر: من الأعلى</option>
          <option value="tender">الأطرى أولاً</option>
          <option value="bold">الأقوى نكهة</option>
        </select>
      </div>
      <div class="pgrid" id="shopGrid"></div>
      <div class="empty" id="shopEmpty" hidden>
        <h3>لا توجد قطعية تطابق التصفية</h3>
        <p>جرّب توسيع الخيارات أو امسح التصفية.</p>
      </div>
    </div>
  </div>
</main>`;

const pages = [
  { file: "category.html", active: "shop", title: "المتجر — كل القطعيات · ترخيم", desc: "الفهرس التجاري لترخيم: كل القطعيات جاهزة للطلب، مصفّاة حسب نوع اللحم والمنطقة وطريقة الطبخ والقوام.", main: shopMain, scripts: '<script src="assets/js/shop.js?v=1"></script>' },
  { file: "cook.html", active: "cook", title: "مختبر الطبخ — ترخيم", desc: "مختبر الطبخ من ترخيم: طرق الطبخ الست، مرجع درجات النضج بالدرجات المئوية، كم لحم للشخص، وأشهر الأخطاء التي تُفسد قطعة ممتازة.", main: cookMain, scripts: '<script src="assets/js/cook.js?v=1"></script>' },
  { file: "dish.html", active: "dish", title: "وش تطبخ — ترخيم", desc: "ابدأ من الطبخة: كبسة، مندي، مشاوي، ستيك، طبخ بطيء، برجر — ونقول لك أي قطعة تحتاج ولماذا.", main: dishMain, scripts: '<script src="assets/js/dish.js?v=1"></script>' },
  { file: "library.html", active: "lib", title: "المكتبة — ترخيم", desc: "مكتبة ترخيم: أدلة اختيار القطع، تقنيات الطبخ، مرجع الحرارات، وكم لحم تحتاج للعزيمة.", main: libMain, scripts: '<script src="assets/js/library.js?v=1"></script>' }
];

pages.forEach(p => { fs.writeFileSync(p.file, shell(p)); console.log("built " + p.file); });

/* وحّد الـ nav في كل الصفحات القائمة */
const existing = { "cuts.html": "cuts", "cut.html": "cuts", "index.html": "", "category.html": "shop", "product.html": "shop", "checkout.html": "", "wishlist.html": "", "account.html": "" };
Object.keys(existing).forEach(f => {
  if (!fs.existsSync(f)) return;
  let s = fs.readFileSync(f, "utf8");
  const nav = navFor(existing[f]);
  if (/<nav class="nav"[\s\S]*?<\/nav>/.test(s)) s = s.replace(/<nav class="nav"[\s\S]*?<\/nav>/, nav);
  else s = s.replace(/(<\/a>\s*)(<div class="search">)/, "$1" + nav + "\n    $2");
  fs.writeFileSync(f, s);
  console.log("nav → " + f);
});
