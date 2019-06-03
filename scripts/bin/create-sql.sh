#! /bin/bash

cd ./scripts/sql

touch migration.sql
echo "-- Database migration script made from all the sql files created during development, made to be run in the appropriate order." > migration.sql
echo . >> migration.sql

echo "-- Databases to be used." >> migration.sql

for i in $(ls database/); do
  cat $i >> migration.sql
done;

echo . >> migration.sql
echo "-- Extensions to be used." >> migration.sql

for i in $(ls extenstions); do
  cat $i >> migration.sql
done;

echo . >> migration.sql
echo "-- Tables to be used." >> migration.sql

for i in $(ls tables); do
  cat $i >> migration.sql
done;
