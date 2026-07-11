(function () {
  "use strict";

  function escHTML(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function render() {
    var list = document.querySelector("[data-credits]");
    if (!list || list.children.length > 0) return;
    fetch("assets/credits.json")
      .then(function (r) { return r.json(); })
      .then(function (credits) {
        list.innerHTML = Object.keys(credits).map(function (id) {
          var c = credits[id];
          return (
            "<li><strong>" + escHTML(c.title) + "</strong> — " +
            (c.creator_url ? '<a href="' + c.creator_url + '" target="_blank" rel="noopener">' + escHTML(c.creator) + "</a>" : escHTML(c.creator)) +
            " (" + escHTML(c.source) + ") · " +
            '<a href="' + c.license_url + '" target="_blank" rel="noopener">' + escHTML((c.license || "").toUpperCase()) + " " + escHTML(c.license_version || "") + "</a> · " +
            '<a href="' + c.foreign_landing_url + '" target="_blank" rel="noopener">Ver original ↗</a></li>'
          );
        }).join("");
      })
      .catch(function () {
        list.innerHTML = "<li>No se pudieron cargar los créditos en este momento.</li>";
      });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", render);
  else render();
})();
