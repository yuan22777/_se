import { fetchMealById, parseIngredients } from "./api.js";

let els = null;

function ensureEls() {
  if (!els) throw new Error("modal 尚未初始化，請先呼叫 initModal()");
  return els;
}

function resetModal() {
  const { img, title, badges, ingredients, instructions, youtube } = ensureEls();
  img.src = "";
  img.alt = "";
  title.textContent = "載入中…";
  badges.innerHTML = "";
  ingredients.innerHTML = "";
  instructions.textContent = "";
  youtube.hidden = true;
}

function fillModalBadges(meal) {
  const { badges } = ensureEls();
  const parts = [];
  if (meal.strCategory) parts.push(`分類：${meal.strCategory}`);
  if (meal.strArea) parts.push(`地區：${meal.strArea}`);
  parts.forEach((text) => {
    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = text;
    badges.appendChild(badge);
  });
}

function fillModal(meal) {
  const { img, title, ingredients, instructions, youtube } = ensureEls();
  img.src = meal.strMealThumb;
  img.alt = meal.strMeal;
  title.textContent = meal.strMeal;
  fillModalBadges(meal);
  ingredients.innerHTML = parseIngredients(meal)
    .map(
      (item) => `
      <li>
        <span>${item.name}</span>
        <span class="ingredient-amount">${item.amount}</span>
      </li>`
    )
    .join("");
  instructions.textContent = meal.strInstructions || "這道菜沒有留下步驟說明。";
  youtube.href =
    meal.strYoutube ||
    `https://www.youtube.com/results?search_query=${encodeURIComponent(meal.strMeal + " recipe")}`;
  youtube.hidden = false;
}

function openModal() {
  const { overlay } = ensureEls();
  overlay.hidden = false;
  document.body.style.overflow = "hidden";
}

export function closeModal() {
  if (!els) return;
  els.overlay.hidden = true;
  document.body.style.overflow = "";
}

export async function openRecipeModal(mealId) {
  if (!mealId) return;
  const { title } = ensureEls();
  openModal();
  resetModal();
  try {
    const meal = await fetchMealById(mealId);
    if (!meal) throw new Error("not found");
    fillModal(meal);
  } catch (err) {
    title.textContent = "載入食譜失敗，請稍後再試";
  }
}

function closeOnOverlayClick(e) {
  const { overlay } = ensureEls();
  if (e.target === overlay) {
    closeModal();
  }
}

function onKeyDown(e) {
  if (e.key === "Escape" && els && !els.overlay.hidden) {
    closeModal();
  }
}

export function initModal() {
  els = {
    overlay: document.getElementById("modal-overlay"),
    img: document.getElementById("modal-img"),
    title: document.getElementById("modal-title"),
    badges: document.getElementById("modal-badges"),
    ingredients: document.getElementById("modal-ingredients"),
    instructions: document.getElementById("modal-instructions"),
    youtube: document.getElementById("modal-youtube"),
    closeBtn: document.getElementById("modal-close"),
  };
  els.closeBtn.addEventListener("click", closeModal);
  els.overlay.addEventListener("click", closeOnOverlayClick);
  document.addEventListener("keydown", onKeyDown);
}
