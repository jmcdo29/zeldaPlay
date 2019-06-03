CREATE TABLE IF NOT EXISTS "abilityScores" (
  id TEXT PRIMARY KEY DEFAULT CONCAT('ABL', gen_random_uuid())
  ,name TEXT NOT NULL
  ,value INTEGER NOT NULL
  ,"characterId" TEXT REFERENCES characters (id)
  ,CONSTRAINT value_above_0 CHECK (value > 0)
  ,CONSTRAINT value_below_21 CHECK (value < 21)
);
