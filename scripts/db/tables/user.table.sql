CREATE TABLE player (
  id VARCHAR(12) PRIMARY KEY DEFAULT createId('00U'),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role role_type NOT NULL DEFAULT 'player',
  recovery_token VARCHAR
);


INSERT INTO player
(email, password)
VALUES (test@test.com, testpassword);
