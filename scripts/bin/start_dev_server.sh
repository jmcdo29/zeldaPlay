#! /bin/sh

npx tsc-watch \
  --onSuccess "node -r ./scripts/node/ts-config-bootstrap.js dist/build/server/main.js" \
  --onFailure "scripts/bin/fail.sh" -p "src/server/tsconfig.app.json"