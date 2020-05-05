#!/bin/bash
ROOT=http://dwisupriyadi20-nr-candidate-lab-app.eastus.cloudapp.azure.com:8080/shop/search/search.html

declare -a KEYWORD=('java' 'node' 'js' 'javascript' 'programming' 'net' 'network' 'php' 'python' 'essential' 'algo')
declare -a TOPKEYWORDS=('java' 'node' 'js' 'python')

# Simulate search
for r in "${KEYWORD[@]}"
do
  curl -A "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:59.0) Gecko/20100101 Firefox/59.0" -XPOST ${ROOT}?q=$r
  sleep 2
done

for r in "${TOPKEYWORDS[@]}"
do
  curl -A "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:59.0) Gecko/20100101 Firefox/59.0" -XPOST ${ROOT}?q=$r
  sleep 2
done


