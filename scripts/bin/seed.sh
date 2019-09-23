#! /bin/bash

echo Seeding the database.
psql $DATABASE_URL -f scripts/sql/seed/seed.sql
echo Database has been seeded.
