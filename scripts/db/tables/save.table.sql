CREATE TABLE saving_throws (
  id VARCHAR(12) PRIMARY KEY DEFAULT createId('0St'),
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  last_modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  modifier attribute NOT NULL,
  name TEXT NOT NULL,
  racial_bonus INTEGER CHECK(racial_bonus >= 0),
  character_id VARCHAR(12) REFERENCES characters (id),
  last_modified_by VARCHAR(12) REFERENCES players (id)
);

