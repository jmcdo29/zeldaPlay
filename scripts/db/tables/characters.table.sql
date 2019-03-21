CREATE TABLE IF NOT EXISTS characters (
  id VARCHAR(12) PRIMARY KEY DEFAULT createId('00C')
	,charisma INTEGER NOT NULL CONSTRAINT charisma_gte_six CHECK (charisma >= 6)
	,constitution INTEGER NOT NULL CONSTRAINT constitution_gte_six CHECK (constitution >= 6)
	,craft_one TEXT
	,craft_two TEXT
	,created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
	,dexterity INTEGER NOT NULL CONSTRAINT dexterity_gte_six CHECK (dexterity >= 6)
	,experience INTEGER NOT NULL CONSTRAINT zero_and_up_exp CHECK (experience >= 0)
	,health INTEGER NOT NULL CONSTRAINT health_lte_max_health CHECK (health <= health_max)
	,health_max INTEGER NOT NULL CONSTRAINT intelligence_gte_six CHECK (health_max > 0)
	,intelligence INTEGER NOT NULL CHECK (intelligence > 6)
	,last_modified_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
	,level INTEGER NOT NULL CHECK (level > 0)
	,magic INTEGER NOT NULL CONSTRAINT magic_lte_max_magic CHECK (magic <= magic_max)
	,magic_max INTEGER NOT NULL CHECK (magic_max > 0)
	,name TEXT NOT NULL
	,performance TEXT
	,profession TEXT
	,race character_race NOT NULL
	,strength INTEGER NOT NULL CONSTRAINT strength_gte_six CHECK (strength >= 6)
  ,subrace TEXT
	,wisdom INTEGER NOT NULL CONSTRAINT wisdom_gte_six CHECK (wisdom >= 6)
	,created_by VARCHAR(12) REFERENCES players (id)
	,last_modified_by VARCHAR(12) REFERENCES players (id)
	,player_id VARCHAR(12) NOT NULL REFERENCES players (id)
);
