#! /bin/sh

npm run clean
npm run lint
npm run format
bash scripts/bin/gitAddMod.sh