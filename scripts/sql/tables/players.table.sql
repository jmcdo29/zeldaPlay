CREATE TABLE IF NOT EXISTS players (
  id UUID PRIMARY KEY default gen_random_uuid()
  ,email TEXT NOT NULL UNIQUE CONSTRAINT contains_at_symbol CHECK (POSITION('@' IN email) > 0)
  ,password TEXT NOT NULL
);