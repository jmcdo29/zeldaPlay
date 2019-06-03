CREATE TABLE IF NOT EXISTS races (
  id TEXT PRIMARY KEY DEFAULT CONCAT('RAC', gen_random_uuid())
  ,name TEXT NOT NULL
  ,edition TEXT NOT NULL
);
