#! /bin/sh

npx concurrently -n "client,server" -c "green,magenta" "npm run start:dev:client" "npm run start:dev:server"