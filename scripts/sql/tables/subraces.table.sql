CREATE TABLE IF NOT EXISTS subraces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid()
  ,name TEXT NOT NULL
  ,race TEXT NOT NULL
);