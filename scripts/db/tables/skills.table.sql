CREATE TABLE IF NOT EXISTS skills (
  id VARCHAR(12) PRIMARY KEY DEFAULT createId('00S')
	,created_at TIMESTAMP WITHOUT TIME ZONE DEFAULt NOW()
	,item_modifier INTEGER NOT NULL DEFAULT 0
	,last_modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
	,misc_modifier INTEGER NOT NULL DEFAULT 0
	,modifier attribute
	,name TEXT NOT NULL
	,racial_modifier INTEGER NOT NULL DEFAULT 0
	,ranks INTEGER NOT NULL DEFAULT 0
	,trained BOOLEAN DEFAULT false
	,type skill_type NOT NULL
	,character_id VARCHAR(12) NOT NULL REFERENCES characters (id)
	,last_modified_by VARCHAR(12) NOT NULL REFERENCES players (id)
);
