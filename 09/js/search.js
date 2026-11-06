const QUICK_TAGS = ["Chicken", "Beef", "Egg", "Pork", "Tomato", "Salmon"];

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchStatus = document.getElementById("search-status");
const emptyState = document.getElementById("empty-state");
const cardGrid = document.getElementById("card-grid");
const quickTagsEl = document.getElementById("quick-tags");

function showLoading() {
  searchStatus.hidden = false;
  emptyState.hidden = true;
  cardGrid.innerHTML = "";
  for (let i = 0; i < 8; i++) {
    const skeleton = document.createElement("div");
    skeleton.className = "skeleton-card";
    skeleton.innerHTML = `
      <div class="skeleton-thumb skeleton"></div>
      <div class="skeleton-line skeleton"></div>
      <div class="skeleton-line skeleton"></div>
    `;
    cardGrid.appendChild(skeleton);
  }
}

function hideLoading() {
  searchStatus.hidden = true;
}

function showEmptyState() {
  emptyState.hidden = false;
  cardGrid.innerHTML = "";
}

function renderCards(meals) {
  emptyState.hidden = true;
  cardGrid.innerHTML = "";
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
    cardGrid.appendChild(card);
  });
}

async function runSearch(keyword) {
  const value = (keyword || "").trim();
  if (!value) return;
  searchInput.value = value;
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
  QUICK_TAGS.forEach((tag) => {
    const btn = document.createElement("button");
    btn.className = "quick-tag";
    btn.type = "button";
    btn.textContent = tag;
    btn.addEventListener("click", () => runSearch(tag));
    quickTagsEl.appendChild(btn);
  });
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  runSearch(searchInput.value);
});

buildQuickTags();
