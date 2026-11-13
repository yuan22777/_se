import { fetchMealsByIngredient } from "./api.js";
import { openRecipeModal } from "./modal.js";

const QUICK_TAGS = ["Chicken", "Beef", "Egg", "Pork", "Tomato", "Salmon"];

let els = null;

function ensureEls() {
  if (!els) throw new Error("search 尚未初始化，請先呼叫 initSearch()");
  return els;
}

function showLoading() {
  const { status, empty, grid } = ensureEls();
  status.hidden = false;
  empty.hidden = true;
  grid.innerHTML = "";
  for (let i = 0; i < 8; i++) {
    const skeleton = document.createElement("div");
    skeleton.className = "skeleton-card";
    skeleton.innerHTML = `
      <div class="skeleton-thumb skeleton"></div>
      <div class="skeleton-line skeleton"></div>
      <div class="skeleton-line skeleton"></div>
    `;
    grid.appendChild(skeleton);
  }
}

function hideLoading() {
  ensureEls().status.hidden = true;
}

function showEmptyState() {
  const { empty, grid } = ensureEls();
  empty.hidden = false;
  grid.innerHTML = "";
}

function renderCards(meals) {
  const { empty, grid } = ensureEls();
  empty.hidden = true;
  grid.innerHTML = "";
  meals.forEach((meal) => {
    const card = document.createElement("article");
    card.className = "meal-card";
    card.innerHTML = `
      <img src="${meal.strMealThumb}/medium" alt="${meal.strMeal}" loading="lazy" />
      <div class="meal-card-body">
        <h3>${meal.strMeal}</h3>
        <button class="view-btn" type="button">查看食譜</button>
      </div>
    `;
    card.querySelector(".view-btn").addEventListener("click", () => {
      openRecipeModal(meal.idMeal);
    });
    grid.appendChild(card);
  });
}

async function runSearch(keyword) {
  const { input } = ensureEls();
  const value = (keyword || "").trim();
  if (!value) return;
  input.value = value;
  showLoading();
  try {
    const meals = await fetchMealsByIngredient(value);
    hideLoading();
    if (!meals.length) {
      showEmptyState();
    } else {
      renderCards(meals);
    }
  } catch (err) {
    hideLoading();
    showEmptyState();
  }
}

function buildQuickTags() {
  const { quickTags } = ensureEls();
  QUICK_TAGS.forEach((tag) => {
    const btn = document.createElement("button");
    btn.className = "quick-tag";
    btn.type = "button";
    btn.textContent = tag;
    btn.addEventListener("click", () => runSearch(tag));
    quickTags.appendChild(btn);
  });
}

export function initSearch() {
  els = {
    form: document.getElementById("search-form"),
    input: document.getElementById("search-input"),
    status: document.getElementById("search-status"),
    empty: document.getElementById("empty-state"),
    grid: document.getElementById("card-grid"),
    quickTags: document.getElementById("quick-tags"),
  };
  els.form.addEventListener("submit", (e) => {
    e.preventDefault();
    runSearch(els.input.value);
  });
  buildQuickTags();
}
