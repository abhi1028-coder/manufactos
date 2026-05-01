-- V1: Baseline schema — Plants & Users
-- ManufactOS core-service initial migration

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── Plants ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS plants (
    id            UUID         PRIMARY KEY DEFAULT uuid_generate_v4(),
    name          VARCHAR(200) NOT NULL,
    gstin         VARCHAR(15)  NOT NULL UNIQUE,
    contact_phone VARCHAR(15),
    address       TEXT,
    city          VARCHAR(100),
    state         VARCHAR(100),
    pincode       VARCHAR(10),
    is_active     BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at    TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- ─── Users ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
    id         UUID         PRIMARY KEY DEFAULT uuid_generate_v4(),
    phone      VARCHAR(15)  NOT NULL UNIQUE,
    name       VARCHAR(200) NOT NULL,
    role       VARCHAR(30)  NOT NULL CHECK (role IN (
                   'SUPER_ADMIN','PLANT_ADMIN','MANAGER','OPERATOR','ACCOUNTANT','VIEWER')),
    plant_id   UUID         NOT NULL REFERENCES plants (id) ON DELETE RESTRICT,
    is_active  BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_phone    ON users (phone);
CREATE INDEX IF NOT EXISTS idx_users_plant_id ON users (plant_id);

-- ─── Seed: demo plant + admin user ───────────────────────────────────────────
INSERT INTO plants (id, name, gstin, contact_phone, city, state)
VALUES (
    '00000000-0000-0000-0000-000000000001',
    'Demo Manufacturing Plant',
    '27AABCS1429B1Z5',
    '9876543210',
    'Pune',
    'Maharashtra'
) ON CONFLICT DO NOTHING;

INSERT INTO users (id, phone, name, role, plant_id)
VALUES (
    '00000000-0000-0000-0000-000000000001',
    '9876543210',
    'Rajesh Kumar',
    'PLANT_ADMIN',
    '00000000-0000-0000-0000-000000000001'
) ON CONFLICT DO NOTHING;
