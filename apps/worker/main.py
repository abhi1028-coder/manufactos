"""
ManufactOS AI Worker Service
============================
FastAPI service providing NLQ (Natural Language Query) analytics and
daily briefings for the ManufactOS platform.

Endpoints:
  GET  /health          — Health check
  POST /nlq             — Natural language query on plant data
  GET  /briefing/daily  — AI-generated daily operations briefing
"""

from __future__ import annotations

import random
from datetime import date, datetime
from typing import Any

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

# ─── App Setup ────────────────────────────────────────────────────────────────

app = FastAPI(
    title="ManufactOS AI Worker",
    description="NLQ analytics and daily briefing service for ManufactOS",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Models ───────────────────────────────────────────────────────────────────


class HealthResponse(BaseModel):
    status: str
    service: str
    timestamp: str
    version: str


class NlqRequest(BaseModel):
    question: str = Field(..., min_length=3, max_length=500, description="Natural language question")
    plant_id: str = Field(..., description="Plant UUID to scope the query")
    context: dict[str, Any] | None = Field(default=None, description="Optional extra context")


class NlqDataPoint(BaseModel):
    label: str
    value: str | float | int


class NlqResponse(BaseModel):
    question: str
    answer: str
    data_points: list[NlqDataPoint] = Field(default_factory=list)
    chart_type: str | None = None  # "bar" | "line" | "pie" | "table" | None
    sql_generated: str | None = None
    confidence: float = Field(ge=0, le=1)
    plant_id: str
    generated_at: str


class DailyBriefingResponse(BaseModel):
    date: str
    plant_id: str
    summary: str
    highlights: list[str]
    alerts: list[str]
    kpis: dict[str, str]
    generated_at: str


# ─── Mock NLQ Engine ──────────────────────────────────────────────────────────

MOCK_ANSWERS: dict[str, dict[str, Any]] = {
    "receivable": {
        "answer": (
            "As of today, total outstanding receivables are ₹12,62,500 across 5 customers. "
            "₹95,000 from Kaveri Castings is overdue by 45 days. "
            "Prakash Machinery has the largest outstanding balance at ₹4,12,000 (due May 30)."
        ),
        "data_points": [
            {"label": "Bharat Steel Pvt Ltd", "value": 248000},
            {"label": "Apex Auto Components", "value": 187500},
            {"label": "Prakash Machinery", "value": 412000},
            {"label": "Kaveri Castings (overdue)", "value": 95000},
            {"label": "Sunrise Fabricators", "value": 320000},
        ],
        "chart_type": "bar",
        "sql_generated": (
            "SELECT c.name, SUM(i.total_amount - COALESCE(i.paid_amount, 0)) AS outstanding "
            "FROM invoices i JOIN customers c ON i.customer_id = c.id "
            "WHERE i.status IN ('SENT','OVERDUE') AND i.plant_id = :plant_id "
            "GROUP BY c.name ORDER BY outstanding DESC;"
        ),
        "confidence": 0.95,
    },
    "sales": {
        "answer": (
            "Revenue for the last 6 months shows a strong upward trend: "
            "Nov ₹8.2L → Dec ₹9.4L → Jan ₹7.8L → Feb ₹10.5L → Mar ₹11.8L → Apr ₹13.2L. "
            "Overall 61% growth over 6 months. January dip likely due to factory closure."
        ),
        "data_points": [
            {"label": "Nov 2023", "value": 820000},
            {"label": "Dec 2023", "value": 940000},
            {"label": "Jan 2024", "value": 780000},
            {"label": "Feb 2024", "value": 1050000},
            {"label": "Mar 2024", "value": 1180000},
            {"label": "Apr 2024", "value": 1320000},
        ],
        "chart_type": "line",
        "sql_generated": (
            "SELECT DATE_TRUNC('month', o.created_at) AS month, SUM(o.total_amount) AS revenue "
            "FROM orders o WHERE o.plant_id = :plant_id AND o.status != 'CANCELLED' "
            "GROUP BY 1 ORDER BY 1 DESC LIMIT 6;"
        ),
        "confidence": 0.92,
    },
    "customer": {
        "answer": (
            "Top 5 customers by revenue (YTD): "
            "1) Prakash Machinery ₹24.7L, 2) Sunrise Fabricators ₹19.2L, "
            "3) Apex Auto Components ₹17.8L, 4) Bharat Steel Pvt Ltd ₹15.3L, "
            "5) Kaveri Castings ₹9.5L. Top 5 account for 87% of total revenue."
        ),
        "data_points": [
            {"label": "Prakash Machinery", "value": 2470000},
            {"label": "Sunrise Fabricators", "value": 1920000},
            {"label": "Apex Auto Components", "value": 1780000},
            {"label": "Bharat Steel Pvt Ltd", "value": 1530000},
            {"label": "Kaveri Castings", "value": 950000},
        ],
        "chart_type": "pie",
        "sql_generated": (
            "SELECT c.name, SUM(o.total_amount) AS revenue "
            "FROM orders o JOIN customers c ON o.customer_id = c.id "
            "WHERE o.plant_id = :plant_id AND o.status != 'CANCELLED' "
            "AND o.created_at >= DATE_TRUNC('year', NOW()) "
            "GROUP BY c.name ORDER BY revenue DESC LIMIT 5;"
        ),
        "confidence": 0.97,
    },
    "expense": {
        "answer": (
            "May 2024 expenses total ₹2,75,500, up 5% from April (₹2,62,200). "
            "Raw material is the largest category (₹1,85,000). "
            "Utility costs increased 10.5% due to higher electricity tariffs."
        ),
        "data_points": [
            {"label": "Raw Material", "value": 185000},
            {"label": "Utilities", "value": 42000},
            {"label": "Labour", "value": 28000},
            {"label": "Logistics", "value": 8500},
            {"label": "Maintenance", "value": 12000},
        ],
        "chart_type": "pie",
        "sql_generated": (
            "SELECT category, SUM(amount) AS total "
            "FROM expenses WHERE plant_id = :plant_id "
            "AND DATE_TRUNC('month', date) = DATE_TRUNC('month', NOW()) "
            "GROUP BY category ORDER BY total DESC;"
        ),
        "confidence": 0.90,
    },
    "order": {
        "answer": (
            "Current order pipeline: 43 In Production, 27 Confirmed, 18 Ready to Dispatch. "
            "61 orders delivered this month. 9 cancelled. "
            "Capacity utilisation is estimated at 87%."
        ),
        "data_points": [
            {"label": "In Production", "value": 43},
            {"label": "Confirmed", "value": 27},
            {"label": "Ready", "value": 18},
            {"label": "Dispatched", "value": 8},
            {"label": "Delivered (MTD)", "value": 61},
        ],
        "chart_type": "bar",
        "sql_generated": (
            "SELECT status, COUNT(*) AS count FROM orders "
            "WHERE plant_id = :plant_id GROUP BY status;"
        ),
        "confidence": 0.98,
    },
}


def _classify_question(question: str) -> str:
    """Simple keyword-based classifier. Replace with embeddings in production."""
    q = question.lower()
    if any(w in q for w in ["receiv", "overdue", "outstanding", "collect", "payment"]):
        return "receivable"
    if any(w in q for w in ["sales", "revenue", "trend", "growth", "turnover"]):
        return "sales"
    if any(w in q for w in ["customer", "top", "client", "account"]):
        return "customer"
    if any(w in q for w in ["expense", "cost", "spend", "expenditure"]):
        return "expense"
    if any(w in q for w in ["order", "production", "pipeline", "dispatch"]):
        return "order"
    return "default"


# ─── Endpoints ────────────────────────────────────────────────────────────────


@app.get("/health", response_model=HealthResponse, tags=["System"])
def health_check() -> HealthResponse:
    """Health check — used by Docker Compose and load balancers."""
    return HealthResponse(
        status="ok",
        service="manufactos-ai-worker",
        timestamp=datetime.utcnow().isoformat() + "Z",
        version="0.1.0",
    )


@app.post("/nlq", response_model=NlqResponse, tags=["Analytics"])
def natural_language_query(request: NlqRequest) -> NlqResponse:
    """
    Accept a natural language question scoped to a plant and return a
    structured analytics answer with optional data points and chart type.

    In production this will:
    1. Embed the question with text-embedding-3-small
    2. Match against a catalogue of pre-defined SQL templates
    3. Execute the SQL against the read-replica
    4. Format results with GPT-4o for a human-friendly answer
    """
    category = _classify_question(request.question)

    if category == "default":
        return NlqResponse(
            question=request.question,
            answer=(
                "I can help you analyse your plant data. Try asking about receivables, "
                "sales trends, top customers, expenses, or the current order pipeline."
            ),
            data_points=[],
            chart_type=None,
            sql_generated=None,
            confidence=0.5,
            plant_id=request.plant_id,
            generated_at=datetime.utcnow().isoformat() + "Z",
        )

    mock = MOCK_ANSWERS[category]
    return NlqResponse(
        question=request.question,
        answer=mock["answer"],
        data_points=[NlqDataPoint(**dp) for dp in mock["data_points"]],
        chart_type=mock.get("chart_type"),
        sql_generated=mock.get("sql_generated"),
        confidence=mock["confidence"],
        plant_id=request.plant_id,
        generated_at=datetime.utcnow().isoformat() + "Z",
    )


@app.get("/briefing/daily", response_model=DailyBriefingResponse, tags=["Analytics"])
def daily_briefing(plant_id: str) -> DailyBriefingResponse:
    """
    Generate a daily AI briefing summarising yesterday's operations,
    today's priorities, and anomalies for a given plant.

    In production this runs as a Celery cron task at 06:30 IST and sends
    the briefing via WhatsApp/email to the plant admin.
    """
    today_str = date.today().isoformat()

    return DailyBriefingResponse(
        date=today_str,
        plant_id=plant_id,
        summary=(
            f"Good morning! Here's your ManufactOS daily briefing for {today_str}. "
            "Yesterday, 8 orders were dispatched and 3 new orders were confirmed. "
            "Kaveri Castings remains overdue at ₹95,000 — 45 days pending. "
            "No production stoppages reported. Fleet utilisation was 72%."
        ),
        highlights=[
            "8 orders dispatched yesterday — highest single-day dispatch this month",
            "New order ORD-2024-0143 confirmed from Bharat Steel (₹3.2L)",
            "Suresh Patil completed 1.5 hours overtime on the welding line",
            "TRIP-0059 completed: Pune → Nashik, 165km, ₹1,850 fuel",
        ],
        alerts=[
            "⚠ Kaveri Castings — ₹95,000 overdue for 45 days. Schedule follow-up call.",
            "⚠ Vehicle MH-12-GH-1122 due for service in 3 days (350km remaining).",
            "ℹ INV-0087 due date passed — mark as OVERDUE or record payment.",
        ],
        kpis={
            "revenue_mtd": "₹14.9L",
            "orders_active": "68",
            "attendance_today": "42 / 50 (84%)",
            "receivables_overdue": "₹95,000",
            "dispatches_yesterday": "8",
        },
        generated_at=datetime.utcnow().isoformat() + "Z",
    )
