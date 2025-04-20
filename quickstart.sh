#!/usr/bin/env bash

docker compose -f docker-compose-dev.yml up --build

sleep 15

# Open Swagger UI in the default web browser
xdg-open http://localhost:9080/swagger-ui/index.html

sleep 30
# Wait for Keycloak to be ready
echo "Waiting for Keycloak to be ready..."
until curl -s http://localhost:8080 > /dev/null; do
  echo -n "."
  sleep 2
done

echo -e "\nKeycloak is up!"

chmod +x ./init-keycloak.sh
./init-keycloak.sh

# Open the React app in the default web browser
xdg-open http://localhost:3000
