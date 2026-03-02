#!/usr/bin/env bash

BASE_URL="http://localhost:3000"

echo "=== GET: Hämta alla recept ==="
curl -s "$BASE_URL/recipes" | jq '.'

echo -e "\n=== GET: Hämta recept med id 1 ==="
curl -s "$BASE_URL/recipes/1" | jq '.'

echo -e "\n=== POST: Lägg till nytt recept ==="
curl -s -X POST "$BASE_URL/recipe" \
  -H "Content-Type: application/json" \
  -d '{"name":"Sushi","cuisine":"Japan","prepTime":"30 min"}' | jq '.'

echo -e "\n=== PUT: Uppdatera recept med id 2 ==="
curl -s -X PUT "$BASE_URL/recipe/2" \
  -H "Content-Type: application/json" \
  -d '{"name":"Chili con carne","cuisine":"Mexico","prepTime":"60 min"}' | jq '.'

echo -e "\n=== DELETE: Ta bort recept med id 4 ==="
curl -s -X DELETE "$BASE_URL/recipe/4" | jq '.'

echo -e "\n=== GET: Kontrollera efter radering ==="
curl -s "$BASE_URL/recipes" | jq '.'
