/* =========================================================
   THE DAILY CHRONICLE: behaviour
   All content lives in data.js (TITLE, EVENTS, STORIES,
   SOURCES, COMICS). This file runs on index.html and
   sources.html and skips whatever a page doesn't have.
   ========================================================= */
(function () {
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var T = typeof TITLE   !== "undefined" ? TITLE   : "";
  var E = typeof EVENTS  !== "undefined" ? EVENTS  : [];
  var S = typeof STORIES !== "undefined" ? STORIES : [];
  var R = typeof SOURCES !== "undefined" ? SOURCES : [];
  var C = typeof COMICS  !== "undefined" ? COMICS  : [];

  function $(id) { return document.getElementById(id); }
  function div(cls) { var d = document.createElement("div"); d.className = cls; return d; }
  function colorFor(i) { return i % 2 === 0 ? "yellow" : "green"; }
  function pickColor(c, i) { return c === "green" || c === "yellow" ? c : colorFor(i); }
  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* ---------- masthead + dateline ---------- */
  if ($("today")) {
    $("today").textContent =
      new Date().toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  }
  if ($("tw-title")) $("tw-title").textContent = T;
  document.body.classList.add("ready");

  /* =======================================================
     STICKY NOTE (shared by timeline buttons and mini-stories)
     ======================================================= */
  var overlay = div("note-overlay");
  overlay.hidden = true;
  overlay.innerHTML =
    '<div class="note-stage" role="dialog" aria-modal="true" aria-labelledby="note-title">' +
      '<div class="sticky" tabindex="0">' +
        '<p class="sticky-kicker"></p>' +
        '<h3 id="note-title"></h3>' +
        '<div class="sticky-body"></div>' +
      '</div>' +
      '<span class="sticky-clip" aria-hidden="true"></span>' +
      '<button class="sticky-close" type="button" aria-label="Close note">&times;</button>' +
    '</div>';
  document.body.appendChild(overlay);

  var stage = overlay.querySelector(".note-stage");
  var sticky = overlay.querySelector(".sticky");
  var closeBtn = overlay.querySelector(".sticky-close");
  var kicker = overlay.querySelector(".sticky-kicker");
  var lastFocus = null;

  var SLOTS_WIDE = ["tl"];
  var SLOTS_NARROW = ["tl", "tr", "bl", "br"];

  // pin polaroids around the note at random spots
  function addPolaroids(list) {
    var narrow = window.matchMedia && window.matchMedia("(max-width: 760px)").matches;
    var all = shuffle((narrow ? SLOTS_NARROW : SLOTS_WIDE).slice());
    // prefer spots that don't collide (a side-middle photo clashes with the corners on its side)
    var clash = { ml: ["tl", "bl"], mr: ["tr", "br"], tl: ["ml"], bl: ["ml"], tr: ["mr"], br: ["mr"] };
    var slots = [];
    all.forEach(function (sl) {
      var bad = slots.some(function (o) { return (clash[sl] || []).indexOf(o) !== -1; });
      if (!bad) slots.push(sl);
    });
    all.forEach(function (sl) { if (slots.indexOf(sl) === -1) slots.push(sl); });
    list.slice(0, slots.length).forEach(function (src, k) {
      var pol = div("polaroid slot-" + slots[k]);
      pol.style.setProperty("--rot", (Math.random() * 20 - 10).toFixed(1) + "deg");
      pol.style.setProperty("--dx", Math.round(Math.random() * 20 - 10) + "px");
      pol.style.setProperty("--dy", Math.round(Math.random() * 16 - 8) + "px");
      var img = document.createElement("img");
      img.alt = "";
      img.addEventListener("error", function () { pol.remove(); });
      img.src = src;
      pol.appendChild(img);
      stage.appendChild(pol);
    });
  }

  function openNote(n, opener) {
    lastFocus = opener || null;
    stage.className = "note-stage " + (n.color === "green" ? "green" : "yellow");
    stage.style.setProperty("--tilt", ((Math.random() * 3) - 1.5).toFixed(2) + "deg");
    kicker.textContent = n.kicker || "";
    kicker.hidden = !n.kicker;
    overlay.querySelector("#note-title").textContent = n.title || "";
    var body = overlay.querySelector(".sticky-body");
    body.innerHTML = "";
    String(n.text || "").split(/\n\s*\n/).forEach(function (para) {
      var p = document.createElement("p");
      p.textContent = para.trim();
      body.appendChild(p);
    });
    [].slice.call(stage.querySelectorAll(".polaroid")).forEach(function (el) { el.remove(); });
    addPolaroids([].concat(n.image || []).filter(Boolean));
    overlay.hidden = false;
    sticky.scrollTop = 0;
    closeBtn.focus();
  }

  function closeNote() {
    if (overlay.hidden) return;
    overlay.hidden = true;
    if (lastFocus) lastFocus.focus();
  }

  closeBtn.addEventListener("click", closeNote);
  overlay.addEventListener("click", function (ev) { if (ev.target === overlay) closeNote(); });
  document.addEventListener("keydown", function (ev) {
    if (overlay.hidden) return;
    if (ev.key === "Escape") closeNote();
    if (ev.key === "Tab") {              // keep focus inside the note: close button <-> scrollable text
      ev.preventDefault();
      var order = [closeBtn, sticky], i = order.indexOf(document.activeElement);
      order[i < 0 ? 0 : (i + (ev.shiftKey ? -1 : 1) + order.length) % order.length].focus();
    }
  });

  /* ---------- build timeline ---------- */
  var list = $("events");
  if (list) {
    E.forEach(function (e, i) {
      var li = document.createElement("li");
      li.className = "event";

      var stamp = document.createElement("span");
      stamp.className = "stamp";
      stamp.textContent = e.date;

      var art = document.createElement("article");
      var h = document.createElement("h3"); h.textContent = e.head;
      var p = document.createElement("p");  p.textContent = e.text;
      art.appendChild(h); art.appendChild(p);

      var btn = document.createElement("button");
      
      btn.type = "button";
      btn.className = "note-btn";
      btn.textContent = "Open note";
      if (i === 0) btn.classList.add("has-hint");
      btn.addEventListener("click", function () {
        openNote({ kicker: e.date, title: e.head, text: e.note || e.text, image: e.image, color: pickColor(e.color, i) }, btn);
      });
      art.appendChild(btn);

      li.appendChild(stamp);
      li.appendChild(art);
      list.appendChild(li);
    });

    /* clippings print in as they scroll into view */
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

    /* ink line fills as you scroll; stamps light up */
    var rail = document.querySelector(".rail");
    var ink = document.querySelector(".ink");
    var stamps = [].slice.call(document.querySelectorAll(".stamp"));
    var ticking = false;

    var update = function () {
      var r = rail.getBoundingClientRect();
      var mid = window.innerHeight * 0.55;
      var filled = Math.min(Math.max(mid - r.top, 0), r.height);
      ink.style.height = filled + "px";
      stamps.forEach(function (s) {
        var b = s.getBoundingClientRect();
        s.classList.toggle("lit", b.top + b.height / 2 < mid);
      });
      ticking = false;
    };
    var onScroll = function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
  }

  /* ---------- build mini-stories grid ---------- */
  var grid = $("story-grid");
  if (grid) {
    S.forEach(function (st, i) {
      
      var color = pickColor(st.color, i);
      var box = document.createElement("button");
      box.type = "button";
      box.className = "story-box " + color;

      if (st.icon) {
        var ic = document.createElement("img");
        ic.className = "story-icon";
        ic.alt = "";
        ic.addEventListener("error", function () { ic.remove(); });
        ic.src = st.icon;
        box.appendChild(ic);
      }
      var t = document.createElement("span");
      t.className = "story-title";
      t.textContent = st.title;
      box.appendChild(t);
      if (i === 0) box.classList.add("has-hint");
      box.addEventListener("click", function () {
        openNote({ title: st.title, text: st.text, image: st.image, color: color }, box);
      });
      grid.appendChild(box);
    });
  }

  /* ---------- build sources list (sources.html) ---------- */
  var srcList = $("source-list");
  if (srcList) {
    R.forEach(function (s) {
      var li = document.createElement("li");
      li.className = "source";
      var h = document.createElement("h3"); h.textContent = s.title;
      li.appendChild(h);
      var by = [s.by, s.year].filter(Boolean).join(", ");
      if (by) { var b = document.createElement("p"); b.className = "source-by"; b.textContent = by; li.appendChild(b); }
      if (s.note) { var n = document.createElement("p"); n.textContent = s.note; li.appendChild(n); }
      if (s.url && /^https?:\/\//i.test(s.url)) {
        var a = document.createElement("a");
        a.href = s.url; a.textContent = s.url; a.target = "_blank"; a.rel = "noopener noreferrer";
        li.appendChild(a);
      }
      srcList.appendChild(li);
    });
  }

  /* =======================================================
     FAUX NEWSPAPER SIDE COLUMNS (COMICS, repeated downward)
     ======================================================= */
  var aspect = {};   // src -> height/width, so we know how many cards fill the column

  function loadComics(done) {
    var pending = C.length;
    if (!pending) return done();
    C.forEach(function (c) {
      var im = new Image();
      im.onload = function () { aspect[c.src] = im.naturalHeight / im.naturalWidth; if (--pending === 0) done(); };
      im.onerror = function () { if (--pending === 0) done(); };
      im.src = c.src;
    });
  }

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

  function fillSide(side, set) {
    side.innerHTML = "";
    if (!set.length || side.clientWidth < 150 || side.clientHeight < 100) return;

    var wrap = div("cols");
    var col = div("col");
    wrap.appendChild(col);
    side.appendChild(wrap);

    var colW = col.clientWidth - 24;          // minus the column's side padding
    var y = 30, i = 0, limit = side.clientHeight;
    while (y < limit && i < 300) {            // keep repeating until the margin is full
      var comic = set[i % set.length];
      col.appendChild(makeComicCard(comic));
      y += colW * (aspect[comic.src] || 1.1) + 26;
      i++;
    }
  }

  var left = document.querySelector(".side-left");
  var right = document.querySelector(".side-right");

  function fillAll() {
    var half = Math.ceil(C.length / 2);
    if (left)  fillSide(left,  C.slice(0, half));
    if (right) fillSide(right, C.slice(half));
  }

  var timer;
  function scheduleFill() { clearTimeout(timer); timer = setTimeout(fillAll, 150); }

  loadComics(fillAll);
  window.addEventListener("resize", scheduleFill);
  if ("ResizeObserver" in window) new ResizeObserver(scheduleFill).observe($("paper"));
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fillAll);
})();
