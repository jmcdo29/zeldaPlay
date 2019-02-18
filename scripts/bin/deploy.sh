#! /bin/bash
rev=$(git rev-parse --short HEAD)
ls
git config user.name "Travis CI"
git config user.email "travis@travis-ci.com"
git add ./dist package* angular.json
git commit --no-verify -m "Auto deploy from travis $TRAVIS_BUILD_NUMBER: ${rev}"
git remote add deploy "https://jmcdo29:$GH_TOKEN@github.com/jmcdo29/zeldaplay.git" > /dev/null 2>&1
git checkout -B build
git push deploy build --quiet > /dev/null 2>&1