#!/usr/bin/env sh
# abort on errors

set -e

# build

npm run build
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f https://github.com/JithinAji/whatsappwebvue.git master:gh-pages
cd -
