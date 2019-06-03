CREATE TABLE IF NOT EXISTS items (
  id TEXT PRIMARY KEY DEFAULT COCNAT('ITM', gen_random_uuid())
  ,name TEXT NOT NULL
  ,description TEXT NOT NULL
  ,weight FLOAT CHECK (weight >= 0)
  ,"characterId" TEXT REFERENCES characters (id)
)
