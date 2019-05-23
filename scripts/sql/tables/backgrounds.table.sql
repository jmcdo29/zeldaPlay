CREATE TABLE IF NOT EXISTS backgrounds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid()
  ,name TEXT NOT NULL
  ,proficiencies TEXT[]
  ,languages TEXT[]
  ,equipment TEXT
  ,"personalityTraits" TEXT[] NOT NULL
  ,ideals TEXT[] NOT NULL
  ,bonds TEXT[] NOT NULL
  ,flaws TEXT[] NOT NULL
);
