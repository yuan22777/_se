const API_BASE = "https://www.themealdb.com/api/json/v1/1";

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  return res.json();
}

export async function fetchMealsByCategory(category) {
  const data = await fetchJSON(`${API_BASE}/filter.php?c=${encodeURIComponent(category)}`);
  return data.meals || [];
}

export async function fetchMealsByIngredient(ingredient) {
  const data = await fetchJSON(`${API_BASE}/filter.php?i=${encodeURIComponent(ingredient)}`);
  return data.meals || [];
}

export async function fetchRandomMeal() {
  const data = await fetchJSON(`${API_BASE}/random.php`);
  return (data.meals && data.meals[0]) || null;
}

export async function fetchMealById(id) {
  const data = await fetchJSON(`${API_BASE}/lookup.php?i=${encodeURIComponent(id)}`);
  return (data.meals && data.meals[0]) || null;
}

export function parseIngredients(meal) {
  const list = [];
  for (let i = 1; i <= 20; i++) {
    const name = (meal[`strIngredient${i}`] || "").trim();
    const amount = (meal[`strMeasure${i}`] || "").trim();
    if (name) {
      list.push({ name, amount: amount || "-" });
    }
  }
  return list;
}
