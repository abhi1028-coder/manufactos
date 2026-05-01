# ManufactOS — Manufacturing Operations Platform

ManufactOS is an all-in-one, multi-tenant SaaS platform built for Indian small-and-mid-scale manufacturers. It digitises every operational workflow — order management, GST-compliant invoicing, worker attendance & payroll, fleet trip sheets, a self-serve customer portal, and an AI-powered board-level analytics layer — into a single cohesive product accessible from any browser or mobile device.

---

## Roadmap

| Phase | Scope | Status |
|-------|-------|--------|
| **Phase 1 — Orders & Finance** | Order creation/tracking, GST invoicing, expense capture, receivables dashboard | 🚧 In Progress |
| **Phase 2 — Workforce** | Worker master, biometric attendance, salary & payroll processing | 🗓 Planned |
| **Phase 3 — Fleet** | Vehicle master, trip sheets, fuel logs, driver assignment | 🗓 Planned |
| **Phase 4 — Customer Portal** | Self-serve order placement, invoice download, payment status | 🗓 Planned |
| **Phase 5 — AI Board** | NLQ analytics ("What were last month's top customers?"), daily AI briefing, anomaly alerts | 🗓 Planned |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, Redux Toolkit, React Router v6, Recharts, Axios |
| **API Gateway** | Nginx (reverse proxy + load balancer) |
| **Core Service** | Java 21, Spring Boot 3.3, Spring Security (JWT/stateless), Spring Data JPA, Flyway, PostgreSQL |
| **Domain Services** | Java 21, Spring Boot 3.3 (order, finance, workforce, fleet, portal, ai, notification) |
| **AI Worker** | Python 3.12, FastAPI, Celery, OpenAI API, Pandas, scikit-learn |
| **Messaging** | Apache Kafka |
| **Cache / Tokens** | Redis 7 |
| **Database** | PostgreSQL 16 |
| **Container** | Docker + Docker Compose |
| **CI/CD** | GitHub Actions → AWS ECR + ECS (ap-south-1) |

---

## Monorepo Layout

```
manufactos/
├── apps/
│   ├── web/              React 18 + TS + Vite frontend
│   ├── api/
│   │   ├── core-service/         Auth, Users, Customers, Plants
│   │   ├── order-service/        Orders & order items
│   │   ├── finance-service/      Invoices & expenses
│   │   ├── workforce-service/    Workers, attendance, payroll
│   │   ├── fleet-service/        Vehicles & trip sheets
│   │   ├── portal-service/       Customer-facing portal API
│   │   ├── ai-service/           NLQ and AI analytics
│   │   └── notification-service/ SMS/email/push notifications
│   └── worker/           Python FastAPI AI worker
├── infra/
│   ├── docker/           docker-compose.yml
│   └── nginx/            nginx.conf
└── .github/workflows/    CI + staging deploy
```

---

## Quickstart

### Prerequisites
- Node 20+, Java 21 (Temurin), Python 3.12+, Docker + Docker Compose

---

### 1. Frontend (apps/web)

```bash
cd apps/web
npm install
npm run dev
# → http://localhost:5173
```

---

### 2. Core Service (apps/api/core-service)

```bash
# Start Postgres + Redis first (see Docker Compose below), then:
cd apps/api/core-service
./mvnw spring-boot:run
# → http://localhost:8081
```

Copy `src/main/resources/application.yml` and set your local DB credentials.

---

### 3. Python AI Worker (apps/worker)

```bash
cd apps/worker
python -m venv .venv
source .venv/bin/activate      # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8087
# → http://localhost:8087/docs
```

---

### 4. Full Stack with Docker Compose

```bash
cd infra/docker
cp ../../apps/worker/.env.example ../../apps/worker/.env   # adjust secrets
docker compose up --build
```

Services:
- Frontend:    http://localhost:3000
- Core API:    http://localhost:8081
- AI Worker:   http://localhost:8087
- Nginx proxy: http://localhost:80

---

### 5. Opening in IntelliJ IDEA

1. **File → Open** → select the `manufactos/` root folder.
2. IntelliJ will detect multiple Maven modules. Click **"Add as Maven Project"** for each `pom.xml` shown in the notification, or open **Maven** tool window and add them manually.
3. Set **Project SDK** to Java 21 (Temurin).
4. Run configurations for each `*ServiceApplication` are auto-detected.

---

## Environment Variables

See `apps/worker/.env.example` for the Python worker.
See `apps/api/core-service/src/main/resources/application.yml` for Spring Boot — override via env vars in production.

---

## Contributing

Branch naming: `feat/<scope>/<short-desc>` | `fix/<scope>/<short-desc>`
All PRs must pass the `ci.yml` workflow before merge.
