CREATE TABLE skill (
  id VARCHAR(12) PRIMARY KEY DEFAULT createId('00S'),
  name TEXT NOT NULL,
  type skill_type NOT NULL,
  trained BOOLEAN DEFAULT false,
  ranks INTEGER NOT NULL DEFAULT 0,
  modifier attribute,
  racial_modifier INTEGER NOT NULL DEFAULT 0,
  item_modifier INTEGER NOT NULL DEFAULT 0,
  misc_modifier INTEGER NOT NULL DEFAULT 0,
  character_id VARCHAR(12) NOT NULL REFERENCES characters (id),
  last_modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  last_modified_by VARCHAR(12) NOT NULL REFERENCES players (id),
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULt NOW()
);
