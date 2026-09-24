"""資工專業辭典 MVP 後端 (FastAPI)
對應 plan.md §6 API 設計，資料來源為 terms.json（未來可無痛換成 PostgreSQL + pg_trgm）。
執行： pip install -r requirements.txt ; python -m uvicorn app:app --reload --port 8000
"""
import json
import difflib
from pathlib import Path
from typing import List, Optional

from fastapi import FastAPI, Query
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware

BASE = Path(__file__).parent
TERMS: List[dict] = json.loads((BASE / "terms.json").read_text(encoding="utf-8"))
BY_ID = {t["id"]: t for t in TERMS}

app = FastAPI(title="資工專業辭典 MVP", version="0.1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_methods=["*"], allow_headers=["*"],
)


# ---------- 模糊搜尋核心 (對應 plan.md §5.2，取代 pg_trgm 的 Python 版) ----------
def levenshtein(a: str, b: str) -> int:
    a, b = a.lower(), b.lower()
    if a == b:
        return 0
    la, lb = len(a), len(b)
    if la == 0:
        return lb
    if lb == 0:
        return la
    prev = list(range(lb + 1))
    for i in range(1, la + 1):
        cur = [i] + [0] * lb
        for j in range(1, lb + 1):
            cost = 0 if a[i - 1] == b[j - 1] else 1
            cur[j] = min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost)
        prev = cur
    return prev[lb]


def similarity(a: str, b: str) -> float:
    """0~1，越高越像。結合 SequenceMatcher + Levenshtein 正規化。"""
    if not a or not b:
        return 0.0
    a, b = a.lower().strip(), b.lower().strip()
    if a == b:
        return 1.0
    seq = difflib.SequenceMatcher(None, a, b).ratio()
    lev = levenshtein(a, b)
    lev_score = 1 - lev / max(len(a), len(b))
    return round(0.5 * seq + 0.5 * lev_score, 4)


def search_terms(q: str, category: Optional[str] = None, scenario: Optional[str] = None, limit: int = 20):
    q = (q or "").strip()
    ql = q.lower()
    exact, scenario_hits, prefix, fuzzy = [], [], [], []
    for t in TERMS:
        if category and category not in t.get("category", []):
            continue
        if scenario and scenario not in t.get("application_scenarios", []):
            continue
        if not q:
            exact.append({**t, "score": 1.0, "match": "all"})
            continue
        en = t["word_en"].lower()
        zh = t.get("word_zh", "")
        full = (t.get("full_name") or "").lower()
        defi = t.get("definition", "")
        cats = " ".join(t.get("category", []))
        scens = " ".join(t.get("application_scenarios", []))
        # 1. 完全比對
        if ql == en or q == zh or ql == full:
            exact.append({**t, "score": 1.0, "match": "exact"})
        # 2. 包含 / 前綴比對（中英全名定義情境全文）
        elif ql in en or q in zh or ql in full or q in defi or q in scens or q in cats:
            if en.startswith(ql):
                prefix.append({**t, "score": 0.9, "match": "prefix"})
            elif q in scens:
                scenario_hits.append({**t, "score": 0.85, "match": "scenario"})
            else:
                prefix.append({**t, "score": 0.8, "match": "contains"})
        # 3. 模糊比對（英文容錯）
        else:
            s = similarity(ql, en)
            # 短詞（如 RAG）允許 1 個字母誤差，長詞允許 2 個
            if s >= 0.55 or levenshtein(ql, en) <= (1 if len(en) <= 4 else 2):
                fuzzy.append({**t, "score": s, "match": "fuzzy"})
    fuzzy.sort(key=lambda x: (-x["score"], x["word_en"]))
    ordered = exact + prefix + scenario_hits + fuzzy
    return ordered[:limit], fuzzy[:5]


# ---------- API (plan.md §6) ----------
@app.get("/api/health")
def health():
    return {"ok": True, "count": len(TERMS)}


@app.get("/api/categories")
def categories():
    cats = sorted({c for t in TERMS for c in t.get("category", [])})
    return {"categories": cats}


@app.get("/api/scenarios")
def scenarios():
    from collections import Counter
    c = Counter(s for t in TERMS for s in t.get("application_scenarios", []))
    return {"scenarios": [{"name": k, "count": v} for k, v in c.most_common()]}


@app.get("/api/terms")
def list_terms(
    q: str = Query("", description="中/英/情境關鍵字"),
    category: Optional[str] = None,
    scenario: Optional[str] = None,
    limit: int = 20,
):
    results, _ = search_terms(q, category, scenario, limit)
    return {"query": q, "count": len(results), "results": results}


@app.get("/api/terms/{term_id}")
def get_term(term_id: str):
    t = BY_ID.get(term_id)
    if not t:
        return {"error": "not found"}
    related = [BY_ID[i] for i in t.get("related_terms", []) if i in BY_ID]
    return {**t, "related": related}


@app.get("/api/search")
def api_search(q: str = Query(..., min_length=1), limit: int = 10):
    """整合精確+模糊，給搜尋欄 dropdown 用。"""
    results, fuzzy = search_terms(q, limit=limit)
    exact = [r for r in results if r["match"] != "fuzzy"]
    suggestions = [r for r in results if r["match"] == "fuzzy"]
    # 若完全沒命中，仍回傳全庫最像的 top5（你是不是要找…）
    if not results:
        scored = sorted(
            ({**t, "score": similarity(q.lower(), t["word_en"].lower())} for t in TERMS),
            key=lambda x: -x["score"],
        )[:5]
        suggestions = [{**s, "match": "fuzzy"} for s in scored]
    return {"query": q, "exact": exact, "suggestions": suggestions}


@app.get("/api/suggest")
def api_suggest(q: str = Query(..., min_length=1), limit: int = 5):
    """純模糊推薦 top5。"""
    scored = sorted(
        ({**t, "score": similarity(q.lower(), t["word_en"].lower())} for t in TERMS),
        key=lambda x: -x["score"],
    )[:limit]
    return {"query": q, "suggestions": [{**s, "match": "fuzzy"} for s in scored]}


# ---------- 前端靜態頁 ----------
STATIC_DIR = BASE / "static"
if STATIC_DIR.exists():
    app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")


@app.get("/", include_in_schema=False)
def index():
    f = STATIC_DIR / "index.html"
    if f.exists():
        return FileResponse(str(f))
    return {"msg": "前端尚未建立，請看 /docs"}
