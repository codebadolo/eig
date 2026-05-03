#!/bin/sh
set -e

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

# Seed uniquement si la table admin_users est vide
COUNT=$(php artisan tinker --execute="echo App\Models\AdminUser::count();" 2>/dev/null | tail -1)
if [ "$COUNT" = "0" ] || [ -z "$COUNT" ]; then
  echo "Seeding base de données..."
  php artisan db:seed --class=EigSeeder --force
fi

# Lien storage
php artisan storage:link --force 2>/dev/null || true

# Cache config
php artisan config:cache
php artisan route:cache

echo "Laravel prêt sur le port 8000"
exec php artisan serve --host=0.0.0.0 --port=8000
