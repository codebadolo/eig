#!/bin/sh
set -e

# Créer .env depuis les variables d'environnement si absent
if [ ! -f /app/.env ]; then
  cat > /app/.env <<EOF
APP_NAME="${APP_NAME:-EIG Backend}"
APP_ENV=${APP_ENV:-local}
APP_KEY=${APP_KEY:-}
APP_DEBUG=${APP_DEBUG:-true}
APP_URL=${APP_URL:-http://localhost:8000}

DB_CONNECTION=${DB_CONNECTION:-mysql}
DB_HOST=${DB_HOST:-mysql}
DB_PORT=${DB_PORT:-3306}
DB_DATABASE=${DB_DATABASE:-eig_db}
DB_USERNAME=${DB_USERNAME:-eig_user}
DB_PASSWORD=${DB_PASSWORD:-eig_password}

JWT_SECRET=${JWT_SECRET:-}
JWT_TTL=${JWT_TTL:-10080}

FRONTEND_URL=${FRONTEND_URL:-http://localhost:5173}
ADMIN_URL=${ADMIN_URL:-http://localhost:5174}

FILESYSTEM_DISK=${FILESYSTEM_DISK:-public}
EOF
fi

# Générer APP_KEY si absent
if [ -z "$APP_KEY" ]; then
  php artisan key:generate --force
fi

# Attendre que MySQL soit prêt
echo "Attente de MySQL..."
until php artisan migrate:status > /dev/null 2>&1; do
  sleep 2
done

# Migrations
php artisan migrate --force

# Seed systématique (upsert — sans risque de doublons)
echo "Seeding base de données..."
php artisan db:seed --class=EigSeeder --force

# Lien storage
php artisan storage:link --force 2>/dev/null || true

# Cache config
php artisan config:cache
php artisan route:cache

echo "Laravel prêt sur le port 8000"
exec php artisan serve --host=0.0.0.0 --port=8000
