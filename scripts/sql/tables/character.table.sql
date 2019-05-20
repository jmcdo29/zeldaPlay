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
);
