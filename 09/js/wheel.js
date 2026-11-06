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

const wheelEl = document.getElementById("wheel");
const goBtn = document.getElementById("wheel-go");
const hintEl = document.getElementById("wheel-hint");

function buildWheel() {
  wheelEl.innerHTML = "";
  SEGMENTS.forEach((seg, i) => {
    const centerAngle = i * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;
    const label = document.createElement("span");
    label.className = "wheel-label";
    label.textContent = seg.label;
    label.style.transform = `rotate(${centerAngle}deg) translateY(-36%) translateX(-50%)`;
    wheelEl.appendChild(label);
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
  isSpinning = true;
  goBtn.disabled = true;
  hintEl.textContent = "轉動中，今晚吃什麼…";

  const index = pickSegment();
  const segment = SEGMENTS[index];
  const mealPromise = fetchSegmentMeal(segment);

  currentRotation = computeTargetRotation(index);
  wheelEl.style.transform = `rotate(${currentRotation}deg)`;

  try {
    const meal = await Promise.all([
      mealPromise,
      new Promise((resolve) => setTimeout(resolve, SPIN_MS)),
    ]);
    hintEl.textContent = `抽中「${meal[0] ? meal[0].strMeal : "?"}」！開你的胃 🎉`;
    setTimeout(() => openRecipeModal(meal[0] && meal[0].idMeal), RESULT_DELAY);
  } catch (err) {
    hintEl.textContent = "哎呀，抽籤失敗了，再試一次吧！";
  } finally {
    isSpinning = false;
    goBtn.disabled = false;
  }
}

buildWheel();
goBtn.addEventListener("click", spin);
