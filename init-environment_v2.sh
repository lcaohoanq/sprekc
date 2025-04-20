#!/usr/bin/env bash

POSTGRES_VERSION="17.2"
KEYCLOAK_VERSION="26.1.3"

source scripts/my-functions.sh

echo
echo "Starting environment"
echo "===================="

echo
echo "Creating network"
echo "----------------"
docker network create springboot-react-keycloak-net

echo
echo "Starting postgres for Keycloak"
echo "------------------------------"

docker run -d \
    --name postgres-keycloak \
    -p 5432:5432 \
    -e POSTGRES_DB=keycloak \
    -e POSTGRES_USER=keycloak \
    -e POSTGRES_PASSWORD=password \
    --network=springboot-react-keycloak-net \
    postgres:${POSTGRES_VERSION}

echo
echo "Starting postgres for App"
echo "--------------------------"

docker run -d \
    --name postgres-app \
    -p 5433:5432 \
    -e POSTGRES_DB=app_db \
    -e POSTGRES_USER=app_user \
    -e POSTGRES_PASSWORD=app_password \
    --network=springboot-react-keycloak-net \
    postgres:${POSTGRES_VERSION}

echo
echo "Starting keycloak"
echo "-----------------"

docker run -d \
    --name keycloak \
    -p 8080:8080 \
    -e KC_BOOTSTRAP_ADMIN_USERNAME=admin \
    -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin \
    -e KC_DB=postgres \
    -e KC_DB_URL_HOST=postgres-keycloak \
    -e KC_DB_URL_DATABASE=keycloak \
    -e KC_DB_USERNAME=keycloak \
    -e KC_DB_PASSWORD=password \
    --network=springboot-react-keycloak-net \
    quay.io/keycloak/keycloak:${KEYCLOAK_VERSION} start-dev

echo
wait_for_container_log "postgres-keycloak" "database system is ready"
echo
wait_for_container_log "postgres-app" "database system is ready"
echo
wait_for_container_log "keycloak" "started in"

echo
echo "Environment Up and Running"
echo "=========================="
echo
