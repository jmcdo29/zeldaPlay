#! /bin/bash
rev=$(git rev-parse --short HEAD)
git config user.name "Travis CI"
git config user.email "travis@travis-ci.com"
git add ./dist
git commit --no-verify -m "Auto deploy from travis $TRAVIS_BUILD_NUMBER: ${rev}"
git remote add deploy "https://jmcdo29:$GH_TOKEN@github.com/jmcdo29/zeldaplay.git" &>dev/null
git push deploy build &>dev/null