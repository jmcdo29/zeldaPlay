#! /bin/sh
postgres -D $PGDATA >database.log 2>&1 &
