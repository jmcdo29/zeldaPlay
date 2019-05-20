SELECT 'CREATE DATABASE tabletop'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'tabletop')\gexec
\c tabletop;