/* =========================================================
   THE DAILY CHRONICLE: behaviour
   ========================================================= */

// ================= EDIT THESE =================
var TITLE = "The Method";

var EVENTS = [
  { date: "1998",  head: "The Idea Takes Shape",     text: "Replace this with a short description of your first milestone. One or two sentences work best." },
  { date: "2003",  head: "Doors Open to the Public", text: "Describe what happened, who was involved, and why it mattered." },
  { date: "2009",  head: "A Turning Point",          text: "Add your own event here. Dates can be years, months, or anything you like." },
  { date: "2014",  head: "Growth Across the Region", text: "Keep headlines short, like real newspaper headlines, and let the text add the detail." },
  { date: "2020",  head: "New Chapter Begins",       text: "Add or remove events freely. The timeline adjusts to however many you list." },
  { date: "Today", head: "The Story Continues",      text: "Finish with where things stand now and what comes next." }
];
// ==============================================

(function () {
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- dateline ---------- */
  document.getElementById("today").textContent =
    new Date().toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  /* ---------- build timeline ---------- */
  var list = document.getElementById("events");
  EVENTS.forEach(function (e, i) {
    var li = document.createElement("li");
    li.className = "event";

    var stamp = document.createElement("span");
    stamp.className = "stamp";
    stamp.textContent = e.date;

    var art = document.createElement("article");
    var h = document.createElement("h3"); h.textContent = e.head;
    var p = document.createElement("p");  p.textContent = e.text;
    art.appendChild(h); art.appendChild(p);

    li.appendChild(stamp);
    li.appendChild(art);

    // paperclip on every other clipping
    if (i % 2 === 0) {
      var clip = document.createElement("span");
      clip.className = "paperclip";
      li.appendChild(clip);
    }
    list.appendChild(li);
  });

  /* ---------- clippings print in as they scroll into view ---------- */
  var items = [].slice.call(document.querySelectorAll(".event"));
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.2 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- ink line fills as you scroll; stamps light up ---------- */
  var rail = document.querySelector(".rail");
  var ink = document.querySelector(".ink");
  var stamps = [].slice.call(document.querySelectorAll(".stamp"));
  var ticking = false;

  function update() {
    var r = rail.getBoundingClientRect();
    var mid = window.innerHeight * 0.55;
    var filled = Math.min(Math.max(mid - r.top, 0), r.height);
    ink.style.height = filled + "px";
    stamps.forEach(function (s) {
      var b = s.getBoundingClientRect();
      s.classList.toggle("lit", b.top + b.height / 2 < mid);
    });
    ticking = false;
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();

  /* ---------- static masthead, then the page prints in ---------- */
  var el = document.getElementById("tw-title");
  el.textContent = TITLE;
  document.body.classList.add("ready");

  /* =======================================================
     FAUX NEWSPAPER SIDE COLUMNS (COMICS)
     ======================================================= */
  var COMICS = [
    { src: "comic1.png", cap: "Figure 1" },
    { src: "comic2.png", cap: "Figure 2" },
    { src: "comic3.png", cap: "Figure 3" },
    { src: "comic4.png", cap: "Figure 4" },
    { src: "comic5.png", cap: "Figure 5" },
    { src: "comic6.png", cap: "Figure 6" }
  ];

  function div(cls) { var d = document.createElement("div"); d.className = cls; return d; }

  function makeComicCard(comic) {
    var box = div("photo comic-card");
    var imgEl = document.createElement("img");
    imgEl.src = comic.src;
    imgEl.alt = comic.cap;
    imgEl.style.width = "100%";
    imgEl.style.height = "auto";
    imgEl.style.display = "block";
    
    box.appendChild(imgEl);
    var cap = div("cap");
    cap.textContent = "";
    box.appendChild(cap);
    return box;
  }

  function fillSide(side, comicsSlice) {
    side.innerHTML = "";
    if (side.clientWidth < 150 || side.clientHeight < 100) return;

    var wrap = div("cols");
    side.appendChild(wrap);

    var col = div("col");
    wrap.appendChild(col);

    comicsSlice.forEach(function (comic) {
      col.appendChild(makeComicCard(comic));
    });
  }

  var left = document.querySelector(".side-left");
  var right = document.querySelector(".side-right");
  
  function fillAll() {
    // Split 6 comics across left and right sidebars (3 on each)
    fillSide(left, COMICS.slice(0, 3));
    fillSide(right, COMICS.slice(3, 6));
  }

  var timer;
  function scheduleFill() { clearTimeout(timer); timer = setTimeout(fillAll, 150); }

  fillAll();
  window.addEventListener("resize", scheduleFill);
  if ("ResizeObserver" in window) new ResizeObserver(scheduleFill).observe(document.getElementById("paper"));
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fillAll);
})();