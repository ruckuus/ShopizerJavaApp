#!/bin/bash
ROOT=http://dwisupriyadi20-nr-candidate-lab-app.eastus.cloudapp.azure.com:8080

declare -a PAGES=('/shop' '/shop/category/computer-books.html/ref=c:2' '/shop/category/programming.html/ref=c:3' '/shop/category/networking.html/ref=c:4' '/shop/product/node-js-programming.html' '/shop/product/java-101.html' '/shop/product/the-python-book.html' '/shop/product/networking-fundamentals.html' '/shop/product/networking-essentials.html');
declare -a POSTS=('/shop/search/search.html?q=Java' '/shop/search/search.html?q=Node' '/shop/search/search.html?q=prog')

# Simulate GET
for p in "${PAGES[@]}"
do
  curl -A "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:59.0) Gecko/20100101 Firefox/59.0" -s $ROOT$p
  sleep 5
done

# Simulate POST
for r in "${POSTS[@]}"
do
  curl -A "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:59.0) Gecko/20100101 Firefox/59.0" -XPOST $ROOT$r
  sleep 5
  # Simulate Error
  curl -A "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:59.0) Gecko/20100101 Firefox/59.0" -XGET $ROOT$r
done


