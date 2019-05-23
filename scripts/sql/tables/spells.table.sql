CREATE TABLE IF NOT EXISTS spells (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid()
  ,name TEXT NOT NULL
  ,effect TEXT NOT NULL
  ,focus TEXT NOT NULL
  ,level INTEGER CONSTRAINT not_below_zero CHECK (level >= 0)
  ,school TEXT NOT NULL
)
