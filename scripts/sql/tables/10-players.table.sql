CREATE TABLE IF NOT EXISTS players (
  id TEXT PRIMARY KEY DEFAULT CONCAT('USR', gen_random_uuid())
  ,email TEXT NOT NULL UNIQUE CONSTRAINT contains_at_symbol CHECK (POSITION('@' IN email) > 0)
  ,password TEXT NOT NULL
  ,created_date timestamp without time zone DEFAULT now()
  ,first_name TEXT NOT NULL
  ,last_name TEXT NOT NULL
  ,consent_to_email BOOLEAN DEFAULT false
  ,recovery_token TEXT
  ,is_active BOOLEAN DEFAULT true
  ,roles TEXT[] DEFAULT '{"player"}'
);
