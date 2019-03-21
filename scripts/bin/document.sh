#! /bin/sh
npx concurrently -n "client,server" -c "green,cyan" "npm run document:client" "npm run document:server"