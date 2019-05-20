CREATE TABLE IF NOT EXISTS players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid()
  ,email TEXT NOT NULL UNIQUE CONSTRAINT contains_at_symbol CHECK (POSITION('@' IN email) > 0)
  ,password TEXT NOT NULL
  ,created_date timestamp without time zone DEFAULT now()
  ,"firstName" TEXT NOT NULL
  ,"lastName" TEXT NOT NULL
  ,"consentToEmail" BOOLEAN DEFAULT false
  ,"recoveryToken" TEXT
);