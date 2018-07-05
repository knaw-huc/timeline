#!/usr/bin/env bash

if [ "$1" != "patch" ] && [ "$1" != "minor" ] && [ "$1" != "major" ]; then
	echo "Error. Parameter should be patch | minor | major."
	exit 1
fi

rm -rf build/*
npm run build
if [ $? -ne 0 ]; then exit 1; fi

git add .
git commit -m "New build"

npm version $1 -m "v%s tagged"
npm publish

git push && git push --tags
