#! /bin/bash

file=migration.sql

cd ./scripts/sql

touch $file
echo "-- Database migration script made from all the sql files created during development, made to be run in the appropriate order." > $file
echo "" >> $file

echo "-- Databases to be used." >> $file

for i in $(ls database/); do
  cat database/$i >> $file
done;

echo . >> $file
echo "-- Extensions to be used." >> $file

for i in $(ls extensions); do
  cat extensions/$i >> $file
done;

echo . >> $file
echo "-- Tables to be used." >> $file

for i in $(ls tables); do
  cat tables/$i >> $file
done;
