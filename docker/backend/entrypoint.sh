#!/bin/sh
set -e

cd /var/www/backend

mkdir -p storage/app/public storage/framework/cache storage/framework/sessions storage/framework/views bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
rm -f bootstrap/cache/*.php

rm -f public/storage
php artisan storage:link >/dev/null 2>&1 || true

if [ "${DB_CONNECTION:-}" = "pgsql" ]; then
  echo "Waiting for Postgres at ${DB_HOST}:${DB_PORT:-5432}..."
  until php -r 'new PDO("pgsql:host=".getenv("DB_HOST").";port=".(getenv("DB_PORT") ?: "5432").";dbname=".getenv("DB_DATABASE"), getenv("DB_USERNAME"), getenv("DB_PASSWORD"));' >/dev/null 2>&1; do
    sleep 2
  done
fi

if [ "${RUN_MIGRATIONS:-true}" = "true" ]; then
  php artisan migrate --force
fi

if [ "${RUN_SEEDERS:-true}" = "true" ] && [ ! -f storage/app/.docker_seeded ]; then
  php artisan db:seed --force
  touch storage/app/.docker_seeded
fi

if [ "${RUN_SEEDERS:-true}" = "true" ] && [ -z "$(find storage/app/public/scores -type f -name '*.pdf' -print -quit 2>/dev/null)" ]; then
  echo "No seeded PDFs found. Regenerating score files..."
  php artisan db:seed --class=DefaultScores --force
fi

php artisan optimize:clear >/dev/null 2>&1 || true
php artisan config:cache >/dev/null 2>&1 || true

exec "$@"
