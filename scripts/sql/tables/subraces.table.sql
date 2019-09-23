CREATE TABLE IF NOT EXISTS subraces (
  id TEXT PRIMARY KEY DEFAULT CONCAT('SBR', gen_random_uuid())
  ,name TEXT NOT NULL
  ,race TEXT NOT NULL
  ,edition TEXT NOT NULL
);
