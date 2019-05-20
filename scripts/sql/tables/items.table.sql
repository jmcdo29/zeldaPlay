CREATE TABLE IF NOT EXISTS items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid()
  ,name TEXT NOT NULL
  ,description TEXT NOT NULL
  ,weight FLOAT CHECK (weight >= 0)
  ,"characterId" UUID REFERENCES characters (id)
)
