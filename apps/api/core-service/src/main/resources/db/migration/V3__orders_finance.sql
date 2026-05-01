-- V3: Orders, Order Items, Invoices, Expenses

-- ─── Orders ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
    id                UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number      VARCHAR(30)   NOT NULL UNIQUE,
    customer_id       UUID          NOT NULL REFERENCES customers (id),
    status            VARCHAR(20)   NOT NULL DEFAULT 'DRAFT'
                          CHECK (status IN ('DRAFT','CONFIRMED','IN_PRODUCTION','READY','DISPATCHED','DELIVERED','CANCELLED')),
    subtotal          NUMERIC(15,2) NOT NULL DEFAULT 0,
    tax_amount        NUMERIC(15,2) NOT NULL DEFAULT 0,
    total_amount      NUMERIC(15,2) NOT NULL DEFAULT 0,
    plant_id          UUID          NOT NULL REFERENCES plants (id),
    created_by        UUID          NOT NULL REFERENCES users (id),
    expected_delivery DATE,
    notes             TEXT,
    created_at        TIMESTAMP     NOT NULL DEFAULT NOW(),
    updated_at        TIMESTAMP     NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_plant_id    ON orders (plant_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders (customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_status      ON orders (status);

-- ─── Order Items ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS order_items (
    id              UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id        UUID          NOT NULL REFERENCES orders (id) ON DELETE CASCADE,
    product_id      UUID          REFERENCES products (id),
    product_name    VARCHAR(300)  NOT NULL,
    quantity        NUMERIC(15,3) NOT NULL,
    unit            VARCHAR(20)   NOT NULL DEFAULT 'pcs',
    price_per_unit  NUMERIC(15,2) NOT NULL,
    tax_percent     NUMERIC(5,2)  NOT NULL DEFAULT 18,
    total_amount    NUMERIC(15,2) NOT NULL,
    created_at      TIMESTAMP     NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items (order_id);

-- ─── Invoices ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS invoices (
    id             UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_number VARCHAR(30)   NOT NULL UNIQUE,
    order_id       UUID          REFERENCES orders (id),
    customer_id    UUID          NOT NULL REFERENCES customers (id),
    status         VARCHAR(20)   NOT NULL DEFAULT 'DRAFT'
                       CHECK (status IN ('DRAFT','SENT','PAID','OVERDUE','CANCELLED')),
    subtotal       NUMERIC(15,2) NOT NULL DEFAULT 0,
    cgst           NUMERIC(15,2) NOT NULL DEFAULT 0,
    sgst           NUMERIC(15,2) NOT NULL DEFAULT 0,
    igst           NUMERIC(15,2) NOT NULL DEFAULT 0,
    total_amount   NUMERIC(15,2) NOT NULL DEFAULT 0,
    due_date       DATE          NOT NULL,
    paid_date      DATE,
    plant_id       UUID          NOT NULL REFERENCES plants (id),
    created_at     TIMESTAMP     NOT NULL DEFAULT NOW(),
    updated_at     TIMESTAMP     NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_invoices_plant_id    ON invoices (plant_id);
CREATE INDEX IF NOT EXISTS idx_invoices_customer_id ON invoices (customer_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status      ON invoices (status);

-- ─── Expenses ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS expenses (
    id          UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
    category    VARCHAR(100)  NOT NULL,
    description TEXT          NOT NULL,
    amount      NUMERIC(15,2) NOT NULL,
    date        DATE          NOT NULL,
    approved_by UUID          REFERENCES users (id),
    receipt_url TEXT,
    plant_id    UUID          NOT NULL REFERENCES plants (id),
    created_at  TIMESTAMP     NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP     NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_expenses_plant_id ON expenses (plant_id);
CREATE INDEX IF NOT EXISTS idx_expenses_date     ON expenses (date);
