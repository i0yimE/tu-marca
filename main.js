/* =============================================================
   TU MARCA — main.js (IIFE, sin módulos, funciona en file://)
   ============================================================= */
(function () {
  "use strict";

  var data = window.__BRAND__ || {};
  var fineHover = matchMedia("(hover: hover) and (pointer: fine)").matches;

  data.mailtoLink = "mailto:" + (data.email || "");
  data.whatsappLink = "https://wa.me/" + (data.whatsappNumber || "").replace(/\D/g, "") +
    "?text=" + encodeURIComponent("Hola! Quiero hacer una consulta.");

  var $ = function (sel, scope) { return (scope || document).querySelector(sel); };
  var $$ = function (sel, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(sel)); };
  var escHTML = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  function safe(fn, name) {
    try { fn(); } catch (e) { if (window.console) console.warn("[" + name + "] failed:", e); }
  }

  function waLink(message) {
    var num = (data.whatsappNumber || "").replace(/\D/g, "");
    return "https://wa.me/" + num + "?text=" + encodeURIComponent(message);
  }

  /* ---------------------------------------------------------
     Cursor
     --------------------------------------------------------- */
  function initCursor() {
    var root = $("[data-cursor-root]");
    if (!root || !fineHover) return;
    document.documentElement.classList.add("has-cursor");
    var ring = root.querySelector(".cursor-ring");
    var dot = root.querySelector(".cursor-dot");
    var tx = 0, ty = 0, rx = 0, ry = 0, firstMove = false;

    window.addEventListener("mousemove", function (e) {
      tx = e.clientX; ty = e.clientY;
      if (dot) dot.style.transform = "translate3d(" + tx + "px," + ty + "px,0)";
      if (!firstMove) {
        firstMove = true; rx = tx; ry = ty;
        if (ring) ring.style.transform = "translate3d(" + rx + "px," + ry + "px,0)";
        root.classList.add("is-ready");
      }
    }, { passive: true });

    function tick() {
      rx += (tx - rx) * 0.18; ry += (ty - ry) * 0.18;
      if (ring) ring.style.transform = "translate3d(" + rx + "px," + ry + "px,0)";
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    var HOVERABLES = "[data-cursor], .card, .btn, a[href], .product-card, .filter-pill";
    document.addEventListener("mouseover", function (e) {
      if (e.target.closest && e.target.closest(HOVERABLES)) root.classList.add("is-interactive");
    });
    document.addEventListener("mouseout", function (e) {
      var related = e.relatedTarget;
      if (e.target.closest && e.target.closest(HOVERABLES) && !(related && related.closest && related.closest(HOVERABLES))) {
        root.classList.remove("is-interactive");
      }
    });
  }

  /* ---------------------------------------------------------
     Nav — sticky solidify + mobile fullscreen menu
     --------------------------------------------------------- */
  function initNav() {
    var nav = $(".nav");
    if (nav) {
      var onScroll = function () {
        if (window.scrollY > 60) nav.classList.add("is-scrolled");
        else nav.classList.remove("is-scrolled");
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }
    var burger = $("[data-nav-burger]");
    var mobile = $("[data-nav-mobile]");
    if (!burger || !mobile) return;
    burger.addEventListener("click", function () {
      var open = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!open));
      mobile.setAttribute("data-open", String(!open));
      document.body.style.overflow = open ? "" : "hidden";
    });
    $$("a", mobile).forEach(function (a) {
      a.addEventListener("click", function () {
        burger.setAttribute("aria-expanded", "false");
        mobile.setAttribute("data-open", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------------------------------------------------------
     Smooth anchor scroll (native)
     --------------------------------------------------------- */
  function initSmoothAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute("href");
      if (!id || id === "#") return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      var navOffset = 88;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - navOffset,
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
      });
    });
  }

  /* ---------------------------------------------------------
     Marquee (differentials + texture gallery) — GSAP-driven,
     falls back to CSS-less static row if GSAP is unavailable.
     --------------------------------------------------------- */
  function initMarquees() {
    $$("[data-marquee]").forEach(function (track) {
      if (track.dataset.marqueeBound) return;
      track.dataset.marqueeBound = "1";
      var clone = track.cloneNode(true);
      clone.removeAttribute("data-marquee");
      clone.setAttribute("aria-hidden", "true");
      track.parentNode.appendChild(clone);
      if (!window.gsap) return;
      var distance = track.scrollWidth + 38;
      var speed = parseFloat(track.dataset.speed || "50");
      gsap.to([track, clone], {
        x: -distance, duration: distance / speed, ease: "none", repeat: -1,
        modifiers: { x: gsap.utils.unitize(function (x) { return parseFloat(x) % distance; }) }
      });
    });
  }

  /* ---------------------------------------------------------
     Tilt (product cards) — subtle, never gated by reduced-motion
     --------------------------------------------------------- */
  function initTilt() {
    if (!fineHover) return;
    $$(".product-card").forEach(function (card) {
      if (card.dataset.tiltBound) return;
      card.dataset.tiltBound = "1";
      var MAX = 6, tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        tx = -py * MAX; ty = px * MAX;
        if (!raf) raf = requestAnimationFrame(loop);
      });
      card.addEventListener("mouseleave", function () {
        tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(loop);
      });
      function loop() {
        cx += (tx - cx) * 0.15; cy += (ty - cy) * 0.15;
        card.style.setProperty("--rx", cx.toFixed(2) + "deg");
        card.style.setProperty("--ry", cy.toFixed(2) + "deg");
        raf = (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) ? requestAnimationFrame(loop) : null;
      }
    });
  }

  /* ---------------------------------------------------------
     Reveal on scroll — universal, low threshold + safety net
     --------------------------------------------------------- */
  function initReveals() {
    var els = $$("[data-reveal]");
    if (!els.length) return;
    if (typeof IntersectionObserver === "undefined") {
      els.forEach(function (el) { el.classList.add("is-revealed"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.01, rootMargin: "0px 0px -2% 0px" });
    els.forEach(function (el) { io.observe(el); });

    setTimeout(function () {
      $$("[data-reveal]:not(.is-revealed)").forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-revealed");
      });
    }, 6000);
  }

  /* ---------------------------------------------------------
     Split text reveal (headlines)
     --------------------------------------------------------- */
  function splitWords(el) {
    el.setAttribute("aria-label", el.textContent.trim().replace(/\s+/g, " "));
    var wrap = function (text) {
      return text.split(/(\s+)/).map(function (w) {
        return /^\s+$/.test(w) ? w : '<span class="split-word" aria-hidden="true">' + escHTML(w) + "</span>";
      }).join("");
    };
    var html = Array.prototype.map.call(el.childNodes, function (node) {
      if (node.nodeType === 3) return wrap(node.textContent);
      if (node.nodeName === "BR") return "<br>";
      if (node.nodeType === 1) {
        var tag = node.tagName.toLowerCase();
        return "<" + tag + ">" + wrap(node.textContent) + "</" + tag + ">";
      }
      return "";
    }).join("");
    el.innerHTML = html;
    return el.querySelectorAll(".split-word");
  }

  function initSplitText() {
    if (!window.gsap || !window.ScrollTrigger) return;
    $$("[data-split]").forEach(function (el) {
      if (el.dataset.splitBound) return;
      el.dataset.splitBound = "1";
      if (el.classList.contains("reveal")) el.classList.remove("reveal");
      var parts = splitWords(el);
      gsap.set(parts, { y: 20, opacity: 0 });
      gsap.to(parts, {
        y: 0, opacity: 1, duration: 0.9, stagger: 0.035, ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true }
      });
    });
  }

  /* ---------------------------------------------------------
     Catalog — mount from manifest + filter/search
     --------------------------------------------------------- */
  function productCardHTML(p) {
    var msg = "Hola! Quiero consultar por: " + p.name;
    return (
      '<article class="product-card" data-product-card data-category="' + escHTML(p.category) + '" data-name="' + escHTML(p.name.toLowerCase()) + '">' +
        '<div class="product-figure"><img src="assets/img/' + escHTML(p.image) + '" alt="' + escHTML(p.name) + '" loading="lazy" decoding="async"></div>' +
        '<div class="product-body">' +
          '<span class="product-tag">' + escHTML(catLabel(p.category)) + '</span>' +
          "<h3>" + escHTML(p.name) + "</h3>" +
          '<p class="product-desc">' + escHTML(p.description) + "</p>" +
          '<dl class="product-specs">' +
            "<div><dt>Composición:</dt><dd>" + escHTML(p.composition) + "</dd></div>" +
            "<div><dt>Talles:</dt><dd>" + escHTML(p.sizes) + "</dd></div>" +
            "<div><dt>Colores:</dt><dd>" + escHTML(p.colors) + "</dd></div>" +
            "<div><dt>Cuidado:</dt><dd>" + escHTML(p.care) + "</dd></div>" +
          "</dl>" +
          '<a class="btn btn-accent btn-sm btn-block" target="_blank" rel="noopener" href="' + waLink(msg) + '">Consultar por WhatsApp</a>' +
        "</div>" +
      "</article>"
    );
  }

  function catLabel(id) {
    var found = (data.categories || []).filter(function (c) { return c.id === id; })[0];
    return found ? found.label : id;
  }

  function mountCatalogGrid() {
    var target = $("[data-catalog-grid]");
    if (!target || target.children.length > 0 || !data.products) return;
    target.innerHTML = data.products.map(productCardHTML).join("");
  }

  function mountCatalogFilters() {
    var target = $("[data-catalog-filters]");
    if (!target || target.children.length > 0 || !data.categories) return;
    var html = '<button type="button" class="filter-pill is-active" data-filter="todas">Todas</button>';
    html += data.categories.map(function (c) {
      return '<button type="button" class="filter-pill" data-filter="' + escHTML(c.id) + '">' + escHTML(c.label) + "</button>";
    }).join("");
    target.innerHTML = html;
  }

  function initCatalogInteractions() {
    var grid = $("[data-catalog-grid]");
    var filters = $("[data-catalog-filters]");
    var search = $("[data-catalog-search]");
    var empty = $("[data-catalog-empty]");
    if (!grid) return;

    var activeFilter = "todas";

    function applyFilters() {
      var q = (search && search.value || "").trim().toLowerCase();
      var cards = $$(".product-card", grid);
      var visibleCount = 0;
      cards.forEach(function (card) {
        var matchesCategory = activeFilter === "todas" || card.dataset.category === activeFilter;
        var matchesSearch = !q || card.dataset.name.indexOf(q) !== -1 || card.dataset.category.indexOf(q) !== -1;
        var visible = matchesCategory && matchesSearch;
        card.style.display = visible ? "" : "none";
        if (visible) visibleCount++;
      });
      if (empty) empty.classList.toggle("is-visible", visibleCount === 0);
    }

    if (filters) {
      filters.addEventListener("click", function (e) {
        var btn = e.target.closest && e.target.closest("[data-filter]");
        if (!btn) return;
        activeFilter = btn.dataset.filter;
        $$(".filter-pill", filters).forEach(function (p) { p.classList.toggle("is-active", p === btn); });
        applyFilters();
      });
    }
    if (search) search.addEventListener("input", applyFilters);
    applyFilters();
  }

  /* ---------------------------------------------------------
     Contact forms — build a WhatsApp / mailto message, no backend
     --------------------------------------------------------- */
  function initContactForm(formSelector) {
    var form = $(formSelector);
    if (!form) return;
    var success = form.querySelector("[data-form-success]");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      var fd = new FormData(form);
      var nombre = (fd.get("nombre") || "").toString().trim();
      var empresa = (fd.get("empresa") || "").toString().trim();
      var telefono = (fd.get("telefono") || "").toString().trim();
      var email = (fd.get("email") || "").toString().trim();
      var producto = (fd.get("producto") || "").toString().trim();
      var mensaje = (fd.get("mensaje") || "").toString().trim();

      var lines = ["Hola! Soy " + nombre + "."];
      if (empresa) lines.push("Empresa: " + empresa);
      if (telefono) lines.push("Teléfono: " + telefono);
      if (email) lines.push("Email: " + email);
      if (producto) lines.push("Producto de interés: " + producto);
      if (mensaje) lines.push("Mensaje: " + mensaje);

      var text = lines.join("\n");
      if (success) {
        success.textContent = "Te llevamos a WhatsApp para enviar tu consulta a " + (data.name || "la marca") + ".";
        success.classList.add("is-visible");
      }
      window.open(waLink(text), "_blank", "noopener");
    });
  }

  /* ---------------------------------------------------------
     Footer year
     --------------------------------------------------------- */
  function initFooterYear() {
    $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  /* ---------------------------------------------------------
     Fill data-bind text nodes from brand data (phone, email, etc.)
     --------------------------------------------------------- */
  function initDataBindings() {
    $$("[data-bind]").forEach(function (el) {
      var key = el.getAttribute("data-bind");
      var value = key.split(".").reduce(function (obj, k) { return obj ? obj[k] : undefined; }, data);
      if (value == null) return;
      el.textContent = value;
    });
    $$("[data-bind-href]").forEach(function (el) {
      var key = el.getAttribute("data-bind-href");
      var value = key.split(".").reduce(function (obj, k) { return obj ? obj[k] : undefined; }, data);
      if (value != null) el.setAttribute("href", value);
    });
    var mapFrame = $("[data-map-embed]");
    if (mapFrame && data.mapEmbedSrc) mapFrame.setAttribute("src", data.mapEmbedSrc);
    var waFloat = $("[data-wa-float]");
    if (waFloat) waFloat.setAttribute("href", waLink("Hola! Quiero hacer una consulta."));
  }

  /* ---------------------------------------------------------
     Boot
     --------------------------------------------------------- */
  function boot() {
    safe(initDataBindings, "initDataBindings");
    safe(mountCatalogFilters, "mountCatalogFilters");
    safe(mountCatalogGrid, "mountCatalogGrid");
    safe(initCatalogInteractions, "initCatalogInteractions");

    safe(initCursor, "initCursor");
    safe(initNav, "initNav");
    safe(initSmoothAnchors, "initSmoothAnchors");
    safe(initTilt, "initTilt");
    safe(initReveals, "initReveals");
    safe(initFooterYear, "initFooterYear");
    safe(initContactForm.bind(null, "[data-quick-form]"), "initQuickForm");
    safe(initContactForm.bind(null, "[data-contact-form]"), "initContactForm");

    if (window.gsap) {
      safe(initMarquees, "initMarquees");
      if (window.ScrollTrigger) {
        try { gsap.registerPlugin(ScrollTrigger); } catch (_) {}
        safe(initSplitText, "initSplitText");
      }
    }

    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
