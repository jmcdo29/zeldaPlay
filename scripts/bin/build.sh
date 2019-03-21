#! /bin/sh

npm run clean
npx concurrently -n "client,server,docs" -c "green,cyan,magenta", "npm run build:client" "npm run build:server" "npm run document"