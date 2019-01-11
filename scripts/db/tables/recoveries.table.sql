CREATE TABLE recoveries (
  id VARCHAR(12) PRIMARY KEY DEFAULT createId('00R'),
  answer TEXT,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  last_modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  last_modified_by VARCHAR(12) REFERENCES players (id),
  player_id VARCHAR(12) REFERENCES players (id),
  question VARCHAR(12) REFERENCES questions (id)
);
