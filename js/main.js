/* Progressive enhancements: every feature is isolated so one failure cannot blank the page. */
(function () {
  "use strict";
  var config = window.BLISS_CONFIG;
  if (!config) return;

  function safe(fn) { try { fn(); } catch (error) { console.warn("Bliss enhancement skipped:", error); } }
  function localParts() {
    var parts = new Intl.DateTimeFormat("en-CA", { timeZone: config.timezone, weekday: "long", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
    var out = {};
    parts.forEach(function (p) { out[p.type] = p.value; });
    return out;
  }
  function pretty(time) {
    var bits = time.split(":").map(Number), h = bits[0], m = bits[1], suffix = h >= 12 ? "p.m." : "a.m.";
    h = h % 12 || 12;
    return h + (m ? ":" + String(m).padStart(2, "0") : "") + " " + suffix;
  }
  safe(function () {
    var p = localParts(), day = p.weekday.toLowerCase(), hours = config.hours[day], now = Number(p.hour) * 60 + Number(p.minute);
    var open = Number(hours.open.slice(0, 2)) * 60 + Number(hours.open.slice(3)) ;
    var close = Number(hours.close.slice(0, 2)) * 60 + Number(hours.close.slice(3));
    var isOpen = now >= open && now < close;
    var status = document.getElementById("open-status"), dot = document.querySelector(".status-dot");
    if (status) status.textContent = isOpen ? "Open now · closes " + pretty(hours.close) : "Closed now · opens " + pretty(hours.open);
    if (dot && !isOpen) dot.classList.add("closed");
  });
  safe(function () {
    document.querySelectorAll("[data-phone]").forEach(function (el) { el.href = "tel:" + config.phoneHref; });
    document.querySelectorAll("[data-dock-phone]").forEach(function (el) { el.href = "tel:" + config.phoneHref; });
    document.querySelectorAll("[data-directions],[data-dock-directions]").forEach(function (el) { el.href = config.directionsUrl; });
    document.querySelectorAll("[data-address]").forEach(function (el) { el.textContent = config.address; });
    document.querySelectorAll("[data-phone-text]").forEach(function (el) { el.textContent = config.phone; });
    document.querySelectorAll("[data-instagram]").forEach(function (el) { el.href = config.socials.instagram; });
  });
  safe(function () {
    var dialog = document.getElementById("hours-sheet"), open = document.getElementById("hours-open"), close = document.getElementById("hours-close");
    if (!dialog || !open || !close) return;
    open.addEventListener("click", function () { if (typeof dialog.showModal === "function") dialog.showModal(); else dialog.setAttribute("open", ""); });
    close.addEventListener("click", function () { if (dialog.close) dialog.close(); else dialog.removeAttribute("open"); });
    dialog.addEventListener("click", function (event) { if (event.target === dialog) dialog.close(); });
  });
  safe(function () {
    document.querySelectorAll(".ticket-toggle").forEach(function (button) {
      button.addEventListener("click", function () {
        var expanded = button.getAttribute("aria-expanded") === "true", panel = document.getElementById(button.getAttribute("aria-controls"));
        button.setAttribute("aria-expanded", String(!expanded));
        if (panel) panel.hidden = expanded;
      });
    });
  });
  safe(function () {
    var thread = document.querySelector(".scroll-thread span"), ticking = false;
    if (!thread || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    function update() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      thread.style.height = (max > 0 ? Math.min(100, window.scrollY / max * 100) : 0) + "%";
      ticking = false;
    }
    window.addEventListener("scroll", function () { if (!ticking) { window.requestAnimationFrame(update); ticking = true; } }, { passive: true });
    update();
  });
  safe(function () {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(".magnetic").forEach(function (button) {
        button.addEventListener("pointermove", function (event) {
          var r = button.getBoundingClientRect(), x = (event.clientX - r.left - r.width / 2) * .08, y = (event.clientY - r.top - r.height / 2) * .08;
          button.style.transform = "translate(" + x + "px," + y + "px)";
        });
        button.addEventListener("pointerleave", function () { button.style.transform = ""; });
      });
    }
  });
})();
