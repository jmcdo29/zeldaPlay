#! /bin/sh

npm run clean
npx concurrently -n "client,server" -c "green,cyan", "npm run build:client" "npm run build:server" 