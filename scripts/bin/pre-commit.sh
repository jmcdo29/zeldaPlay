#! /bin/bash

npm run lint
npm run format:check | npm run format
bash scripts/bin/gitAddMod.sh