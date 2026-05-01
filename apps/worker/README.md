# ManufactOS AI Worker

Python 3.12 FastAPI service providing Natural Language Query (NLQ) analytics and daily briefings.

## Endpoints

| Method | Path              | Description                              |
|--------|-------------------|------------------------------------------|
| GET    | `/health`         | Health check                             |
| POST   | `/nlq`            | Submit a natural language analytics query |
| GET    | `/briefing/daily` | Retrieve today's AI operations briefing  |

Interactive docs: http://localhost:8087/docs

## Quick Start

```bash
python -m venv .venv
source .venv/bin/activate      # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env           # edit as needed
uvicorn main:app --reload --port 8087
```

## NLQ Example

```bash
curl -X POST http://localhost:8087/nlq \
  -H "Content-Type: application/json" \
  -d '{"question": "Who are my top customers this year?", "plant_id": "00000000-0000-0000-0000-000000000001"}'
```

## Production Architecture

In production the NLQ pipeline:
1. Embeds the question using `text-embedding-3-small`
2. Matches against a catalogue of pre-defined SQL templates via cosine similarity
3. Executes the matched SQL against the PostgreSQL read-replica
4. Formats the result using GPT-4o for a human-friendly structured answer
5. Returns `data_points` and `chart_type` for rendering on the AI Board page

The daily briefing runs as a **Celery beat** task at 06:30 IST and delivers summaries via WhatsApp (MSG91) and email.
