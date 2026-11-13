import { initWheel } from "./wheel.js";
import { initSearch } from "./search.js";
import { initModal } from "./modal.js";

function toggleTabs(tabsEl, target) {
  tabsEl.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.tab === target);
  });
  document.getElementById("page-wheel").classList.toggle("is-active", target === "wheel");
  document.getElementById("page-search").classList.toggle("is-active", target === "search");
}

function initTabs() {
  const tabsEl = document.getElementById("tabs");
  tabsEl.addEventListener("click", (e) => {
    const tab = e.target.closest(".tab");
    if (tab) toggleTabs(tabsEl, tab.dataset.tab);
  });
}

export function initApp() {
  initTabs();
  initModal();
  initWheel();
  initSearch();
}
