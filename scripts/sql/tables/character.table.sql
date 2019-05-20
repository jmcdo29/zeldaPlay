CREATE TABLE IF NOT EXISTS characters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid()
  ,name TEXT NOT NULL
  ,race TEXT NOT NULL
  ,subrace TEXT
  ,"playerId" UUID REFERENCES players (id)
);