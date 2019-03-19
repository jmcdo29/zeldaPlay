#! /bin/sh

npx concurrently -n "client,server" -c "green,cyan" "npm run lint:client" "npm run lint:server"