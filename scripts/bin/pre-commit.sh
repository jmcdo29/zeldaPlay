#! /bin/bash

npm run lint
npm run format:check | npm run fomrat
bash scripts/bin/gitAddMod.sh