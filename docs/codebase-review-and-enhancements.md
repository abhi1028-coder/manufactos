# Codebase Review and Enhancement Plan

## Current Architecture Snapshot

ManufactOS is structured as a monorepo with:
- `apps/web` for the React + TypeScript frontend.
- `apps/api/*-service` for Spring Boot microservices (core + domain services).
- `apps/worker` for Python AI/automation workers.
- `infra/docker` and `infra/nginx` for local orchestration and edge routing.

This is a strong foundation for scaling by domain, but there are still several stubs and cross-service integration gaps that should be prioritized before production hardening.

## Key Strengths

1. **Clear bounded contexts** in backend services.
2. **Frontend modularity** with typed domain models and reusable components.
3. **Tokenized auth flow scaffolding** already present in both API and web client.
4. **Container-first local stack** ready for team onboarding.

## High-Impact Enhancements (Recommended Order)

### 1) Complete authentication lifecycle (P0)
- Implement real refresh-token issuance/validation/revocation in `core-service` (Redis-backed with TTL, jti rotation).
- Add logout-all/session management endpoints for compromised credentials.
- Add audit logs for OTP send/verify attempts and lockout policy.

### 2) Harden frontend session state (P0)
- Persist and rotate refresh tokens correctly.
- Add startup auth hydration (`/me` or token introspection endpoint) to avoid stale authenticated UI state after reload.
- Add centralized auth error boundary and toast handling.

### 3) Observability and operability (P0)
- Add correlation IDs across Nginx and all Spring services.
- Standardize structured JSON logs.
- Add health/readiness probes and dependency checks for each service.

### 4) Data contracts and API governance (P1)
- Generate OpenAPI specs for all services and publish in CI artifacts.
- Introduce contract tests between `apps/web` and `core-service` auth/customer APIs.
- Version external APIs (`/api/v1`) to support non-breaking evolution.

### 5) Domain completion roadmap (P1)
- Prioritize Phase 1 completion end-to-end: order -> invoice -> receivables.
- Add DB constraints and idempotency keys around invoice creation.
- Add reconciliation jobs for payment status updates.

### 6) Security hardening (P1)
- Enforce secret management via env vars / secret store only.
- Add CORS allowlist per environment.
- Add rate limiting for OTP and login endpoints.

### 7) Delivery pipeline (P2)
- Add monorepo-aware CI matrix (web lint/test/build; each Java service test/package; worker test).
- Add image vulnerability scanning and dependency SBOM export.
- Add preview deployment for frontend PRs.

## Suggested 30-Day Execution Plan

- **Week 1:** Auth token lifecycle completion + frontend token persistence fixes.
- **Week 2:** Observability baseline (logs, tracing IDs, probes).
- **Week 3:** API contracts + contract tests for core flows.
- **Week 4:** Phase-1 domain completion milestones and regression suite.

## Immediate Engineering Tasks Created from This Review

1. Frontend: store refresh token on login and clear it on logout.
2. Frontend: ensure auth state is updated by token writes.
3. Backend: replace stub refresh endpoint with Redis-backed implementation.
4. Platform: add service-level health/readiness checks to compose.

