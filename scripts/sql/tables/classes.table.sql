CREATE TABLE IF NOT EXISTS classes (
  id TEXT PRIMARY KEY DEFAULT CONCAT('CLS', gen_random_uuid())
  ,name TEXT NOT NULL
  ,edition TEXT NOT NULL
)
