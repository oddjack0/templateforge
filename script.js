/* TemplateForge — category filter for the catalog grid.
   Pure vanilla JS, no dependencies. */
(function () {
  "use strict";

  var buttons = Array.prototype.slice.call(document.querySelectorAll(".filter-btn"));
  var cards = Array.prototype.slice.call(document.querySelectorAll(".card[data-category]"));
  var countEl = document.getElementById("result-count");
  var noResults = document.getElementById("no-results");

  if (!buttons.length || !cards.length) return;

  function applyFilter(category) {
    var shown = 0;

    cards.forEach(function (card) {
      var match = category === "all" || card.getAttribute("data-category") === category;
      card.hidden = !match;
      if (match) shown += 1;
    });

    buttons.forEach(function (btn) {
      var active = btn.getAttribute("data-filter") === category;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    if (countEl) countEl.textContent = String(shown);
    if (noResults) noResults.hidden = shown !== 0;
  }

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyFilter(btn.getAttribute("data-filter"));
    });
  });

  applyFilter("all");
})();
