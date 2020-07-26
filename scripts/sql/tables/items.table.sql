CREATE TABLE IF NOT EXISTS items (
  id TEXT PRIMARY KEY DEFAULT CONCAT('ITM', gen_random_uuid())
  ,name TEXT NOT NULL
  ,description TEXT NOT NULL
  ,weight FLOAT CHECK (weight >= 0)
  ,character_id TEXT REFERENCES characters (id)
);
