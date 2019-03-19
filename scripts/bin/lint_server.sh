#! /bin/sh

npx concurrently -n "main,tests" -c "cyan,magent" "npm run lint:server:src" "npm run lint:server:test"