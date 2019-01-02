CREATE TABLE skill (
  id VARCHAR(12) PRIMARY KEY DEFAULT createId('00S'),
  name TEXT NOT NULL,
  type skill_type NOT NULL,
  trained BOOLEAN DEFAULT false,
);
