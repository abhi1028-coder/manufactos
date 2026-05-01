-- V2: Master tables — Customers, Suppliers, Products

-- ─── Customers ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS customers (
    id            UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
    name          VARCHAR(300)  NOT NULL,
    gstin         VARCHAR(15),
    phone         VARCHAR(15)   NOT NULL,
    email         VARCHAR(255),
    address       TEXT,
    city          VARCHAR(100),
    state         VARCHAR(100),
    plant_id      UUID          NOT NULL REFERENCES plants (id) ON DELETE RESTRICT,
    credit_limit  NUMERIC(15,2) NOT NULL DEFAULT 0,
    is_active     BOOLEAN       NOT NULL DEFAULT TRUE,
    created_at    TIMESTAMP     NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMP     NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_customers_plant_id ON customers (plant_id);
CREATE INDEX IF NOT EXISTS idx_customers_phone    ON customers (phone);

-- ─── Suppliers ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS suppliers (
    id         UUID         PRIMARY KEY DEFAULT uuid_generate_v4(),
    name       VARCHAR(300) NOT NULL,
    gstin      VARCHAR(15),
    phone      VARCHAR(15)  NOT NULL,
    email      VARCHAR(255),
    address    TEXT,
    plant_id   UUID         NOT NULL REFERENCES plants (id) ON DELETE RESTRICT,
    is_active  BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- ─── Products ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
    id          UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
    sku         VARCHAR(50)   NOT NULL,
    name        VARCHAR(300)  NOT NULL,
    description TEXT,
    category    VARCHAR(100),
    unit        VARCHAR(20)   NOT NULL DEFAULT 'pcs',
    base_price  NUMERIC(15,2) NOT NULL DEFAULT 0,
    tax_percent NUMERIC(5,2)  NOT NULL DEFAULT 18,
    hsn_code    VARCHAR(10),
    plant_id    UUID          NOT NULL REFERENCES plants (id) ON DELETE RESTRICT,
    is_active   BOOLEAN       NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMP     NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP     NOT NULL DEFAULT NOW(),
    UNIQUE (sku, plant_id)
);

CREATE INDEX IF NOT EXISTS idx_products_plant_id ON products (plant_id);

-- ─── Seed: sample customers ───────────────────────────────────────────────────
INSERT INTO customers (name, gstin, phone, city, state, plant_id, credit_limit) VALUES
  ('Bharat Steel Pvt Ltd',  '27AABCS1111B1Z1', '9811000001', 'Mumbai',  'Maharashtra', '00000000-0000-0000-0000-000000000001', 500000),
  ('Apex Auto Components',  '27AABCS2222B1Z2', '9811000002', 'Pune',    'Maharashtra', '00000000-0000-0000-0000-000000000001', 300000),
  ('Sunrise Fabricators',   '27AABCS3333B1Z3', '9811000003', 'Nashik',  'Maharashtra', '00000000-0000-0000-0000-000000000001', 400000),
  ('Kaveri Castings',       '27AABCS4444B1Z4', '9811000004', 'Solapur', 'Maharashtra', '00000000-0000-0000-0000-000000000001', 200000),
  ('Prakash Machinery',     NULL,              '9811000005', 'Pune',    'Maharashtra', '00000000-0000-0000-0000-000000000001', 600000)
ON CONFLICT DO NOTHING;
