#! /bin/sh

# Move into scripts folder
cd ./scripts/db

# Get all schemas and overwrite any initial all.sql file
echo '#! /bin/sql' > all.sql
echo '# SQL file for creating entire database in one run' >> all.sql
echo . >> all.sql
echo '# Schemas' >> all.sql
for file in $(ls ./schemas)
do
    cat ./schemas/$file >> all.sql;
done
echo . >> all.sql
echo '# Functions' >> all.sql
# Add functions to file
for file in $(ls ./functions)
do
    cat ./functions/$file >> all.sql;
done
echo . >> all.sql
echo '# Types' >> all.sql
# Add types to file
for file in $(ls ./types)
do
    cat ./types/$file >> all.sql;
done
echo . >> all.sql
echo '# Tables' >> all.sql
# Add players to file before all other tables
cat ./tables/players.table.sql >> all.sql;

# Add rest of the tables to the file
for file in $(ls ./tables)
do
    if [ $file != 'players.table.sql' ]
    then
        cat ./tables/$file >> all.sql;
    fi
done
cd ../../

# Run the sql file in psql to set up the database
psql -f ./scripts/db/all.sql
