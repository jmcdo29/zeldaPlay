CREATE TABLE IF NOT EXISTS backgrounds (
  id TEXT PRIMARY KEY DEFAULT CONCAT('BKG', gen_random_uuid())
  ,name TEXT NOT NULL
  ,proficiencies TEXT[]
  ,languages TEXT[]
  ,equipment TEXT
  ,personality_traits TEXT[] NOT NULL
  ,ideals TEXT[] NOT NULL
  ,bonds TEXT[] NOT NULL
  ,flaws TEXT[] NOT NULL
);
