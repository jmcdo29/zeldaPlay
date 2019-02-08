CREATE TABLE IF NOT EXISTS spells (
  id VARCHAR(12) PRIMARY KEY DEFAULT createId('0Sp')
	,created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
	,damage INTEGER CONSTRAINT non_zero_damage CHECK (damage > 0)
	,diety diety
	,effect TEXT NOT NULL
	,last_modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
	,modifier attribute
	,mp_use INTEGER CONSTRAINT non_zero_mp_use CHECK (mp_use > 0)
	,name TEXT NOT NULL
	,use_diety BOOLEAN DEFAULT FALSE
	,character_id VARCHAR(12) NOT NULL REFERENCES characters (id)
);
