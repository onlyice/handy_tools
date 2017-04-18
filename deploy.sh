#!/bin/bash

mv build/.git build.git
npm run build
mv build.git build/.git
cd build
git add .
git commit -m "Deploy"
git push
cd -
