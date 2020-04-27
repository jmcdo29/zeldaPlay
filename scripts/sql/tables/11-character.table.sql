CREATE TABLE IF NOT EXISTS characters (
  id TEXT PRIMARY KEY DEFAULT CONCAT('CHR', gen_random_uuid())
  ,name TEXT NOT NULL
  ,race TEXT NOT NULL
  ,subrace TEXT
  ,experience INTEGER CHECK (experience >= 0)
  ,max_health INTEGER CHECK (max_health > 0)
  ,health INTEGER CHECK (health <= max_health)
  ,is_dead BOOLEAN DEFAULT false
  ,player_id TEXT REFERENCES players (id)
  ,created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
  ,level INTEGER NOT NULL DEFAULT 1 CHECK (level > 0)
  ,alignment TEXT NOT NULL
  ,background TEXT NOT NULL
  ,ideal TEXT NOT NULL
  ,bond TEXT NOT NULL
  ,flaw TEXT NOT NULL
  ,personality_traits TEXT[] NOT NULL
  ,proficiencies TEXT[] NOT NULL
  ,languages TEXT[] NOT NULL
  ,game TEXT NOT NULL
);
