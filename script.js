/* =========================================================
   THE DAILY CHRONICLE: behaviour
   ========================================================= */

// ================= EDIT THESE =================
var TITLE = "The Daily Chronicle";

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

  /* ---------- typewriter masthead, then the page prints in ---------- */
  var el = document.getElementById("tw-title");
  function finish() {
    document.body.classList.add("ready");
    setTimeout(function () { el.classList.add("done"); }, 1400);
  }
  if (reduce) {
    el.textContent = TITLE; el.classList.add("done"); document.body.classList.add("ready");
  } else {
    var i = 0;
    (function type() {
      el.textContent = TITLE.slice(0, i);
      if (i < TITLE.length) { i++; setTimeout(type, 85 + Math.random() * 60); }
      else { finish(); }
    })();
  }

  /* =======================================================
     FAUX NEWSPAPER SIDE COLUMNS
     ======================================================= */
  var HEADLINES = [
    "Council Takes Up Market Plan", "Rain to Linger Through Weekend", "Library Fund Nears Its Goal",
    "Bridge Work Ahead of Schedule", "Harvest Fair Draws Record Crowd", "Rail Service to Resume Monday",
    "Merchants Report Brisk Trade", "Committee Delays Decision", "Society Announces Spring Lecture",
    "Clock Tower Repairs Complete", "Fares to Remain Unchanged", "Orchestra Opens Winter Season",
    "Garden Club Plans Exhibit", "Harbor Dredging Nears End", "Schools Adjust Winter Hours"
  ];

  var SENTENCES = [
    "Officials said the proposal would be reviewed again at the next regular session.",
    "Residents gathered on Tuesday evening to hear from several speakers on the matter.",
    "Prices for common goods were reported steady for the third consecutive week.",
    "A spokesman declined to comment on the details until the review is complete.",
    "Several attendees noted that the changes were long overdue.",
    "The committee is expected to release its findings before the end of the month.",
    "Travelers are advised to check conditions before setting out.",
    "Merchants along the main street reported brisk business throughout the afternoon.",
    "The work, which began early in the season, is now said to be nearly complete.",
    "Organizers hope to welcome a larger crowd than in previous years.",
    "According to those familiar with the plan, construction could begin by spring.",
    "No injuries were reported, and normal service resumed within the hour.",
    "The society will hold its annual meeting at the usual hour and place.",
    "Tickets may be had at the door or from any member of the committee.",
    "A brief statement was read aloud and later entered into the record.",
    "Local schools will remain open unless further notice is given.",
    "The proceeds will go toward the upkeep of the public library.",
    "Observers expect the vote to be close, though nothing is certain.",
    "The matter was referred to a special committee for further study.",
    "Members were reminded that dues are payable before the first of the month."
  ];

  var ADS = [
    { big: "NOTICE",   small: "Annual meeting of the society, first Tuesday of the month. All members welcome." },
    { big: "FOR SALE", small: "Quality goods at fair prices. Inquire within." },
    { big: "WANTED",   small: "Steady hands for seasonal work. Apply in person." },
    { big: "LOST",     small: "One brown satchel. Finder rewarded. Inquire at this office." },
    { big: "TONIGHT",  small: "Doors open at seven. Admission free." }
  ];

  var CAPTIONS = [
    "Crowds gather along the main street.", "Work continues on the north bank.",
    "Members of the society pose for the camera.", "The market at midday."
  ];

  var CLASSIFIEDS = [
    "Room to let, quiet street.", "Piano, good tone. Offers invited.", "Lessons in French and arithmetic.",
    "Wanted: reliable cart and horse.", "Found: one pair of spectacles.", "Tailor seeks apprentice."
  ];

  // small seeded random so the filler looks the same on every visit
  function rng(seed) {
    return function () {
      seed |= 0; seed = seed + 0x6D2B79F5 | 0;
      var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function pick(r, arr) { return arr[Math.floor(r() * arr.length)]; }
  function div(cls) { var d = document.createElement("div"); d.className = cls; return d; }
  function tag(name, text) { var n = document.createElement(name); if (text) n.textContent = text; return n; }

  function makeArticle(r) {
    var box = div("item");
    box.appendChild(tag("h4", pick(r, HEADLINES)));
    var paras = 1 + Math.floor(r() * 3);
    for (var p = 0; p < paras; p++) {
      var n = 2 + Math.floor(r() * 4), s = [];
      while (s.length < n) {
        var line = pick(r, SENTENCES);
        if (s.indexOf(line) === -1) s.push(line);   // no repeats within a paragraph
      }
      box.appendChild(tag("p", s.join(" ")));
    }
    return box;
  }
  function makeAd(r) {
    var ad = pick(r, ADS);
    var box = div("adbox" + (r() < 0.45 ? " clipped" : ""));
    box.appendChild(div("big")).textContent = ad.big;
    box.appendChild(div("small")).textContent = ad.small;
    return box;
  }
  function makePhoto(r) {
    var box = div("photo");
    var img = div("img");
    img.style.height = (90 + Math.floor(r() * 60)) + "px";
    box.appendChild(img);
    box.appendChild(div("cap")).textContent = pick(r, CAPTIONS);
    return box;
  }
  function makeClassified(r) {
    var box = div("item classified");
    box.appendChild(tag("h4", "Classified"));
    for (var k = 0; k < 4; k++) box.appendChild(tag("p", pick(r, CLASSIFIEDS)));
    return box;
  }
  function makeBlock(r) {
    var x = r();
    if (x < 0.12) return makeAd(r);
    if (x < 0.22) return makePhoto(r);
    if (x < 0.28) return makeClassified(r);
    return makeArticle(r);
  }

  function fillSide(side, seed) {
    side.innerHTML = "";
    if (side.clientWidth < 150 || side.clientHeight < 100) return;

    var count = Math.max(1, Math.min(3, Math.floor(side.clientWidth / 190)));
    var wrap = div("cols");
    side.appendChild(wrap);

    var r = rng(seed);
    for (var c = 0; c < count; c++) {
      var col = div("col");
      wrap.appendChild(col);
      var guard = 0;
      while (col.scrollHeight <= col.clientHeight && guard++ < 120) {
        col.appendChild(makeBlock(r));
      }
    }
  }

  var left = document.querySelector(".side-left");
  var right = document.querySelector(".side-right");
  function fillAll() { fillSide(left, 11); fillSide(right, 47); }

  var timer;
  function scheduleFill() { clearTimeout(timer); timer = setTimeout(fillAll, 150); }

  fillAll();
  window.addEventListener("resize", scheduleFill);
  if ("ResizeObserver" in window) new ResizeObserver(scheduleFill).observe(document.getElementById("paper"));
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fillAll);
})();
