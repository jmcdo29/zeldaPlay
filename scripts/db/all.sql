CREATE SCHEMA IF NOT EXISTS zeldaplay;

SET search_path TO zeldaplay;
CREATE OR REPLACE FUNCTION createId(input text)
RETURNS VARCHAR(12)
AS $$
DECLARE
  result TEXT := '';
  chars TEXT[] := '{a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0}';
  i INTEGER := 0;
BEGIN
  FOR i IN i..8 LOOP
    result = result || chars[1 + random()*(array_length(chars, 1) -1)];
  END LOOP;
  result = input || result;
  RETURN result;
END;
$$ LANGUAGE plpgsql;
CREATE TYPE attribute AS ENUM (
  'Strength',
  'Dexterity',
  'Constitution',
  'Intelligence',
  'Wisdom',
  'Charisma'
);
CREATE TYPE diety AS ENUM (
  'Din',
  'Farore',
  'Nayru'
);
CREATE TYPE character_race AS ENUM (
  'Fairy',
  'Gerudo',
  'Goron',
  'Hylian',
  'Rito',
  'Sheikah',
  'Twili',
  'Zora'
);
CREATE TYPE role_type AS ENUM (
  'Admin',
  'DM',
  'Player'
);
CREATE TYPE skill_type as ENUM (
  'magic',
  'skill',
  'weapon'
);
CREATE TYPE weapon_type AS ENUM (
  'Ball & Chain',
  'Bombs Other',
  'Boomerang',
  'Bow',
  'Dual Sword',
  'Fire Rod',
  'Great Sword',
  'Halberd',
  'Heavy Shield',
  'Ice Rod',
  'Large bomb',
  'Lightning Rod',
  'Light Shield',
  'Long Sword',
  'Medium Bomb',
  'Naginata',
  'One-Handed Hammer',
  'Sand Rod',
  'Short Sword',
  'Sling',
  'Small Bomb',
  'Spear',
  'Tornado Rod',
  'Tower Shield',
  'Unarmed',
  'Whip'
);
CREATE TABLE IF NOT EXISTS players (
  id VARCHAR(12) PRIMARY KEY DEFAULT createId('00U'),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  recovery_token TEXT,
  role role_type NOT NULL DEFAULT 'Player'
);
CREATE TABLE IF NOT EXISTS characters (
  id VARCHAR(12) PRIMARY KEY DEFAULT createId('00C'),
  charisma INTEGER NOT NULL CHECK (charisma > 6),
  constitution INTEGER NOT NULL CHECK (constitution > 6),
  craft_one TEXT,
  craft_two TEXT,
  created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
  dexterity INTEGER NOT NULL CHECK (dexterity > 6),
  experience INTEGER NOT NULL CHECK (experience > 0),
  health INTEGER NOT NULL CHECK (health < health_max),
  health_max INTEGER NOT NULL CHECK (health_max > 0),
  intelligence INTEGER NOT NULL CHECK (intelligence > 6),
  last_modified_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
  level INTEGER NOT NULL CHECK (level > 0),
  magic INTEGER NOT NULL CHECK (magic < magic_max),
  magic_max INTEGER NOT NULL CHECK (magic_max > 0),
  name TEXT NOT NULL,
  performance TEXT,
  profession TEXT,
  race character_race NOT NULL,
  strength INTEGER NOT NULL CHECK (strength > 6),
  wisdom INTEGER NOT NULL CHECK (wisdom > 6),
  created_by VARCHAR(12) NOT NULL REFERENCES players (id),
  last_modified_by VARCHAR(12) NOT NULL REFERENCES players (id),
  player_id VARCHAR(12) NOT NULL REFERENCES players (id)
);
CREATE TABLE IF NOT EXISTS errors (
  id VARCHAR(12) PRIMARY KEY DEFAULT createId('00E'),
  message TEXT,
  code TEXT,
  error_time TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  stack TEXT
);
CREATE TABLE IF NOT EXISTS notes (
  id VARCHAR(12) PRIMARY KEY DEFAULT createId('00N'),
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  important BOOLEAN DEFAULT FALSE,
  last_modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  message TEXT,
  note_time TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  last_modified_by VARCHAR(12) REFERENCES players (id),
  character_id VARCHAR(12) NOT NULL REFERENCES characters (id)
);
CREATE TABLE IF NOT EXISTS questions (
  id VARCHAR(12) PRIMARY KEY DEFAULT createId('0rQ'),
  question TEXT
);
CREATE TABLE IF NOT EXISTS recoveries (
  id VARCHAR(12) PRIMARY KEY DEFAULT createId('00R'),
  answer TEXT,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  last_modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  last_modified_by VARCHAR(12) REFERENCES players (id),
  player_id VARCHAR(12) REFERENCES players (id),
  question VARCHAR(12) REFERENCES questions (id)
);
CREATE TABLE IF NOT EXISTS saving_throws (
  id VARCHAR(12) PRIMARY KEY DEFAULT createId('0St'),
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  last_modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  modifier attribute NOT NULL,
  name TEXT NOT NULL,
  racial_bonus INTEGER CHECK(racial_bonus >= 0),
  character_id VARCHAR(12) REFERENCES characters (id),
  last_modified_by VARCHAR(12) REFERENCES players (id)
);

CREATE TABLE IF NOT EXISTS skills (
  id VARCHAR(12) PRIMARY KEY DEFAULT createId('00S'),
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULt NOW(),
  item_modifier INTEGER NOT NULL DEFAULT 0,
  last_modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  misc_modifier INTEGER NOT NULL DEFAULT 0,
  modifier attribute,
  name TEXT NOT NULL,
  racial_modifier INTEGER NOT NULL DEFAULT 0,
  ranks INTEGER NOT NULL DEFAULT 0,
  trained BOOLEAN DEFAULT false,
  type skill_type NOT NULL,
  character_id VARCHAR(12) NOT NULL REFERENCES characters (id),
  last_modified_by VARCHAR(12) NOT NULL REFERENCES players (id)
);
CREATE TABLE IF NOT EXISTS spells (
  id VARCHAR(12) PRIMARY KEY DEFAULT createId('0Sp'),
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  damage INTEGER CHECK (damage > 0),
  diety diety,
  effect TEXT NOT NULL,
  last_modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  modifier attribute,
  mp_use INTEGER CHECK (mp_use > 0),
  name TEXT NOT NULL,
  use_diety BOOLEAN DEFAULT FALSE,
  character_id VARCHAR(12) NOT NULL REFERENCES characters (id),
  last_modified_by VARCHAR(12) NOT NULL REFERENCES players (id)
);
CREATE TABLE IF NOT EXISTS weapons (
  id VARCHAR(12) PRIMARY KEY DEFAULT createId('00W'),
  ammo INTEGER,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  crit_damage INTEGER NOT NULL CHECK (crit_damage > 0),
  crit_range INTEGER NOT NULL,
  damage INTEGER NOT NULL CHECK (damage > 0),
  last_modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  modifier attribute NOT NULL,
  name TEXT NOT NULL,
  number_of_hits INTEGER NOT NULL CHECK (number_of_hits > 0),
  range INTEGER,
  type weapon_type NOT NULL,
  character_id VARCHAR(12) NOT NULL REFERENCES characters (id),
  last_modified_by VARCHAR(12) NOT NULL REFERENCES players (id)
);
