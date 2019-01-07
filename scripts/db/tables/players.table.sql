CREATE TABLE players (
  id VARCHAR(12) PRIMARY KEY DEFAULT createId('00U'),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  recovery_token TEXT,
  role role_type NOT NULL DEFAULT 'player'
);


INSERT INTO player
(email, password)
VALUES (test@test.com, testpassword);
