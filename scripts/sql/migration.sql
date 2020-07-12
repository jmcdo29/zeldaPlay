-- Database migration script made from all the sql files created during development, made to be run in the appropriate order.

-- Databases to be used.
SELECT 'CREATE DATABASE tabletop'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'tabletop')\gexec
\c tabletop;
-- Extensions to be used.
CREATE EXTENSION IF NOT EXISTS pgcrypto;
-- Tables to be used.
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
CREATE TABLE IF NOT EXISTS characters (
  id TEXT PRIMARY KEY DEFAULT CONCAT('CHR', gen_random_uuid())
  ,name TEXT NOT NULL
  ,race TEXT NOT NULL
  ,subrace TEXT
  ,experience INTEGER CHECK (experience >= 0)
  ,max_health INTEGER CHECK (max_health > 0)
  ,health INTEGER CHECK (health <= max_health)
  ,is_dead BOOLEAN DEFAULT false
  ,player_id TEXT REFERENCES players (id)
  ,created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
  ,level INTEGER NOT NULL DEFAULT 1 CHECK (level > 0)
  ,alignment TEXT NOT NULL
  ,background TEXT NOT NULL
  ,ideal TEXT NOT NULL
  ,bond TEXT NOT NULL
  ,flaw TEXT NOT NULL
  ,personality_traits TEXT[] NOT NULL
  ,proficiencies TEXT[] NOT NULL
  ,game TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS ability_scores (
  id TEXT PRIMARY KEY DEFAULT CONCAT('ABL', gen_random_uuid())
  ,name TEXT NOT NULL
  ,value INTEGER NOT NULL
  ,character_id TEXT REFERENCES characters (id)
  ,CONSTRAINT value_above_0 CHECK (value > 0)
  ,CONSTRAINT value_below_21 CHECK (value < 21)
);
CREATE TABLE IF NOT EXISTS backgrounds (
  id TEXT PRIMARY KEY DEFAULT CONCAT('BKG', gen_random_uuid())
  ,name TEXT NOT NULL
  ,proficiencies TEXT[]
  ,languages TEXT[]
  ,equipment TEXT
  ,personality_traits TEXT[] NOT NULL
  ,ideals TEXT[] NOT NULL
  ,bonds TEXT[] NOT NULL
  ,flaws TEXT[] NOT NULL
);
CREATE TABLE IF NOT EXISTS classes (
  id TEXT PRIMARY KEY DEFAULT CONCAT('CLS', gen_random_uuid())
  ,name TEXT NOT NULL
  ,edition TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS items (
  id TEXT PRIMARY KEY DEFAULT CONCAT('ITM', gen_random_uuid())
  ,name TEXT NOT NULL
  ,description TEXT NOT NULL
  ,weight FLOAT CHECK (weight >= 0)
  ,character_id TEXT REFERENCES characters (id)
);
CREATE TABLE IF NOT EXISTS races (
  id TEXT PRIMARY KEY DEFAULT CONCAT('RAC', gen_random_uuid())
  ,name TEXT NOT NULL
  ,edition TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS spells (
  id TEXT PRIMARY KEY DEFAULT CONCAT('SPL', gen_random_uuid())
  ,name TEXT NOT NULL
  ,effect TEXT NOT NULL
  ,focus TEXT NOT NULL
  ,level INTEGER CONSTRAINT not_below_zero CHECK (level >= 0)
  ,school TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS subraces (
  id TEXT PRIMARY KEY DEFAULT CONCAT('SBR', gen_random_uuid())
  ,name TEXT NOT NULL
  ,race TEXT NOT NULL
  ,edition TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS weapons (
  id TEXT PRIMARY KEY DEFAULT CONCAT('WEP', gen_random_uuid())
);
