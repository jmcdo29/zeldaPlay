CREATE TABLE IF NOT EXISTS characters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid()
  ,name TEXT NOT NULL
  ,race TEXT NOT NULL
  ,subrace TEXT
  ,experience INTEGER CHECK (experience >= 0)
  ,"maxHealth" INTEGER CHECK ("maxHealth" > 0)
  ,health INTEGER CHECK (health <= "maxHealth")
  ,"isDead" BOOLEAN DEFAULT false
  ,"playerId" UUID REFERENCES players (id)
  ,"createdAt" TIMESTAMP WITH OUT TIME ZONE DEFAULT NOW()
  ,level INTEGER NOT NULL DEFAULT 1 CHECK (level > 0)
  ,alignment TEXT NOT NULL
  ,background TEXT NOT NULL
  ,ideal TEXT NOT NULL
  ,bond TEXT NOT NULL
  ,flaw TEXT NOT NULL
  ,"personalityTraits" TEXT[] NOT NULL
  ,proficiencies TEXT[] NOT NULL
);
