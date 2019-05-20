CREATE TABLE IF NOT EXISTS attributes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid()
  ,name TEXT NOT NULL
  ,value INTEGER NOT NULL
  ,"characterId" UUID REFERENCES characters (id)
  ,CONSTRAINT value_above_0 CHECK (value > 0)
  ,CONSTRAINT value_below_21 CHECK (value < 21)
);
