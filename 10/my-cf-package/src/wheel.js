import { fetchMealsByCategory, fetchRandomMeal, fetchMealById } from "./api.js";
import { openRecipeModal } from "./modal.js";

const SEGMENTS = [
  { label: "Chicken 雞肉", category: "Chicken" },
  { label: "Beef 牛肉", category: "Beef" },
  { label: "Seafood 海鮮", category: "Seafood" },
  { label: "Vegetarian 全素", category: "Vegetarian" },
  { label: "Pasta 義大利麵", category: "Pasta" },
  { label: "Dessert 甜點", category: "Dessert" },
  { label: "驚喜殿下 🎁", random: true },
  { label: "命運沙拉碗 🥗", random: true },
];

const SEGMENT_ANGLE = 360 / SEGMENTS.length;
const FULL_TURNS = 4;
const SPIN_MS = 3000;
const RESULT_DELAY = 300;

let currentRotation = 0;
let isSpinning = false;
let els = null;

function ensureEls() {
  if (!els) throw new Error("wheel 尚未初始化，請先呼叫 initWheel()");
  return els;
}

function buildWheel() {
  const { wheel } = ensureEls();
  wheel.innerHTML = "";
  SEGMENTS.forEach((seg, i) => {
    const centerAngle = i * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;
    const label = document.createElement("span");
    label.className = "wheel-label";
    label.textContent = seg.label;
    label.style.transform = `rotate(${centerAngle}deg) translateY(-36%) translateX(-50%)`;
    wheel.appendChild(label);
  });
}

function pickSegment() {
  return Math.floor(Math.random() * SEGMENTS.length);
}

function computeTargetRotation(index) {
  const centerAngle = index * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;
  const jitter = (Math.random() - 0.5) * (SEGMENT_ANGLE * 0.6);
  const targetMod = (360 - centerAngle + jitter + 360) % 360;
  const base = (FULL_TURNS * 360) + currentRotation;
  return base + ((targetMod - (currentRotation % 360)) + 360) % 360;
}

async function fetchSegmentMeal(segment) {
  if (segment.random) {
    return fetchRandomMeal();
  }
  const meals = await fetchMealsByCategory(segment.category);
  if (!meals.length) {
    return fetchRandomMeal();
  }
  return fetchMealById(meals[Math.floor(Math.random() * meals.length)].idMeal);
}

async function spin() {
  if (isSpinning) return;
  const { wheel, go, hint } = ensureEls();
  isSpinning = true;
  go.disabled = true;
  hint.textContent = "轉動中，今晚吃什麼…";

  const index = pickSegment();
  const segment = SEGMENTS[index];
  const mealPromise = fetchSegmentMeal(segment);

  currentRotation = computeTargetRotation(index);
  wheel.style.transform = `rotate(${currentRotation}deg)`;

  try {
    const meal = await Promise.all([
      mealPromise,
      new Promise((resolve) => setTimeout(resolve, SPIN_MS)),
    ]);
    hint.textContent = `抽中「${meal[0] ? meal[0].strMeal : "?"}」！開你的胃 🎉`;
    setTimeout(() => openRecipeModal(meal[0] && meal[0].idMeal), RESULT_DELAY);
  } catch (err) {
    hint.textContent = "哎呀，抽籤失敗了，再試一次吧！";
  } finally {
    isSpinning = false;
    go.disabled = false;
  }
}

export function initWheel() {
  els = {
    wheel: document.getElementById("wheel"),
    go: document.getElementById("wheel-go"),
    hint: document.getElementById("wheel-hint"),
  };
  buildWheel();
  els.go.addEventListener("click", spin);
}
