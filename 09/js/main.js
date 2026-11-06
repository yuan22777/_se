const tabsEl = document.getElementById("tabs");
const overlayEl = document.getElementById("modal-overlay");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalBadges = document.getElementById("modal-badges");
const modalIngredients = document.getElementById("modal-ingredients");
const modalInstructions = document.getElementById("modal-instructions");
const modalYoutube = document.getElementById("modal-youtube");
const modalCloseBtn = document.getElementById("modal-close");

function toggleTabs(target) {
  tabsEl.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.tab === target);
  });
  document.getElementById("page-wheel").classList.toggle("is-active", target === "wheel");
  document.getElementById("page-search").classList.toggle("is-active", target === "search");
}

function resetModal() {
  modalImg.src = "";
  modalImg.alt = "";
  modalTitle.textContent = "載入中…";
  modalBadges.innerHTML = "";
  modalIngredients.innerHTML = "";
  modalInstructions.textContent = "";
  modalYoutube.hidden = true;
}

function fillModalBadges(meal) {
  const parts = [];
  if (meal.strCategory) parts.push(`分類：${meal.strCategory}`);
  if (meal.strArea) parts.push(`地區：${meal.strArea}`);
  parts.forEach((text) => {
    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = text;
    modalBadges.appendChild(badge);
  });
}

function fillModal(meal) {
  modalImg.src = meal.strMealThumb;
  modalImg.alt = meal.strMeal;
  modalTitle.textContent = meal.strMeal;
  fillModalBadges(meal);
  modalIngredients.innerHTML = parseIngredients(meal)
    .map(
      (item) => `
      <li>
        <span>${item.name}</span>
        <span class="ingredient-amount">${item.amount}</span>
      </li>`
    )
    .join("");
  modalInstructions.textContent = meal.strInstructions || "這道菜沒有留下步驟說明。";
  modalYoutube.href =
    meal.strYoutube ||
    `https://www.youtube.com/results?search_query=${encodeURIComponent(meal.strMeal + " recipe")}`;
  modalYoutube.hidden = false;
}

function openModal() {
  overlayEl.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeModal() {
  overlayEl.hidden = true;
  document.body.style.overflow = "";
}

async function openRecipeModal(mealId) {
  if (!mealId) return;
  openModal();
  resetModal();
  try {
    const meal = await fetchMealById(mealId);
    if (!meal) throw new Error("not found");
    fillModal(meal);
  } catch (err) {
    modalTitle.textContent = "載入食譜失敗，請稍後再試";
  }
}

function closeOnOverlayClick(e) {
  if (e.target === overlayEl) {
    closeModal();
  }
}

function onKeyDown(e) {
  if (e.key === "Escape" && !overlayEl.hidden) {
    closeModal();
  }
}

tabsEl.addEventListener("click", (e) => {
  const tab = e.target.closest(".tab");
  if (tab) toggleTabs(tab.dataset.tab);
});

modalCloseBtn.addEventListener("click", closeModal);
overlayEl.addEventListener("click", closeOnOverlayClick);
document.addEventListener("keydown", onKeyDown);
