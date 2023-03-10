#!/bin/bash

for locale in ../public/locales/*
do
	localename=$(basename -- $locale)
	echo "$localename"
	mkdir -p ../glossary/$localename
	for file in ../public/locales/$localename/*.json
	do
		filename=$(basename -- $file)
		npx i18next-json-csv-converter ../public/locales/$localename/$filename ../glossary/$localename/${filename%.*}.csv
		echo "" >> ../glossary/$localename/${filename%.*}.csv
		echo "glossary/${filename%.*}.csv"
	done
done
