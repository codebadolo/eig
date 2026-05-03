#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
# Build cPanel — Excellis Invest Group
# Usage : ./deploy/build-cpanel.sh https://excellis-invest-group.jofedigital.com
#
# Produit : deploy/eig-cpanel.zip
#
# Structure après extraction dans ~/ sur cPanel :
#
#   ~/
#   ├── eig-laravel/                   ← source Laravel (hors public_html)
#   │   ├── app/ bootstrap/ config/
#   │   ├── database/ routes/ storage/
#   │   └── (sans vendor/ ni .env)
#   └── public_html/
#       └── excellis-invest-group/
#           ├── index.html             ← frontend React
#           ├── assets/
#           ├── .htaccess
#           ├── uploads/               ← fichiers uploadés (images)
#           ├── admin/
#           │   ├── index.html         ← admin React
#           │   └── .htaccess
#           └── api/                   ← Laravel public/
#               ├── index.php          ← modifié → pointe vers ~/eig-laravel/
#               └── .htaccess
#
# Sur cPanel après extraction :
#   1. cd ~/eig-laravel && composer install --no-dev --optimize-autoloader
#   2. cp .env.example .env  →  remplir les valeurs MySQL
#   3. php artisan key:generate && php artisan jwt:secret
#   4. php artisan migrate && php artisan db:seed --class=EigSeeder
# ─────────────────────────────────────────────────────────────────────────────

set -e

DOMAIN="${1:-https://excellis-invest-group.jofedigital.com}"
SUBFOLDER="excellis-invest-group"
API_FULL="${DOMAIN}/${SUBFOLDER}/api"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/deploy/eig-cpanel-build"
LARAVEL_OUT="$OUT/eig-laravel"
WEB_OUT="$OUT/public_html/$SUBFOLDER"

echo ""
echo "  EIG — Build cPanel"
echo "  Domaine : $DOMAIN"
echo "  API URL : $API_FULL"
echo ""

# ── Nettoyage ─────────────────────────────────────────────────────────────────
rm -rf "$OUT"
mkdir -p "$WEB_OUT/admin"
mkdir -p "$WEB_OUT/uploads"
mkdir -p "$WEB_OUT/api"
mkdir -p "$LARAVEL_OUT"

# ── 1. Build FRONTEND ─────────────────────────────────────────────────────────
echo "► Build frontend..."
cd "$ROOT"
echo "VITE_API_URL=$API_FULL" > .env.production.local
npm install --silent
npm run build
cp -r dist/. "$WEB_OUT/"
cp "$ROOT/deploy/htaccess-frontend" "$WEB_OUT/.htaccess"
echo "  ✓ Frontend"

# ── 2. Build ADMIN ────────────────────────────────────────────────────────────
echo "► Build admin..."
cd "$ROOT/admin"
echo "VITE_API_URL=$API_FULL" > .env.production.local
npm install --silent
npm run build
cp -r dist/. "$WEB_OUT/admin/"
cp "$ROOT/deploy/htaccess-admin" "$WEB_OUT/admin/.htaccess"
echo "  ✓ Admin"

# ── 3. Laravel public/ → api/ ────────────────────────────────────────────────
echo "► Copie Laravel public/..."
cp -r "$ROOT/backend-php/public/." "$WEB_OUT/api/"

# Modifier index.php pour pointer vers ~/eig-laravel/
# __DIR__ = ~/public_html/excellis-invest-group/api
# ../../../eig-laravel = ~/eig-laravel ✓
sed -i \
  "s|require __DIR__\.'/../vendor/autoload.php';|require __DIR__.'/../../../eig-laravel/vendor/autoload.php';|g" \
  "$WEB_OUT/api/index.php"
sed -i \
  "s|require_once __DIR__\.'/../bootstrap/app.php';|require_once __DIR__.'/../../../eig-laravel/bootstrap/app.php';|g" \
  "$WEB_OUT/api/index.php"

# .htaccess pour le dossier api/ — PHP 8.3 uniquement pour ce dossier
cat > "$WEB_OUT/api/.htaccess" << 'EOF'
# Utiliser PHP 8.3 pour ce dossier uniquement (sans affecter les autres apps)
AddHandler application/x-httpd-alt-php83 .php

<IfModule mod_rewrite.c>
    Options -MultiViews -Indexes
    RewriteEngine On
    RewriteBase /excellis-invest-group/api/

    RewriteCond %{HTTP:Authorization} .
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
</IfModule>
EOF

# Supprimer le dossier uploads/ copié depuis public/ (uploads vont dans le parent)
rm -rf "$WEB_OUT/api/uploads"
rm -f "$WEB_OUT/api/storage"

echo "  ✓ API Laravel (public/)"

# ── 4. Laravel source → eig-laravel/ ─────────────────────────────────────────
echo "► Copie source Laravel..."
rsync -a \
  --exclude='vendor/' \
  --exclude='.env' \
  --exclude='public/' \
  --exclude='node_modules/' \
  --exclude='storage/logs/*.log' \
  --exclude='storage/framework/cache/*' \
  --exclude='storage/framework/sessions/*' \
  --exclude='storage/framework/views/*' \
  --exclude='bootstrap/cache/*.php' \
  "$ROOT/backend-php/" "$LARAVEL_OUT/"

# .env.example pour cPanel
cat > "$LARAVEL_OUT/.env.example" << EOF
APP_NAME="EIG Backend"
APP_ENV=production
APP_KEY=
APP_DEBUG=false
APP_URL=${API_FULL}

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=CPANEL_USER_eig_db
DB_USERNAME=CPANEL_USER_eig
DB_PASSWORD=MOT_DE_PASSE

JWT_SECRET=
JWT_TTL=10080

FRONTEND_URL=${DOMAIN}
ADMIN_URL=${DOMAIN}

# Dossier uploads (hors api/, dans excellis-invest-group/)
# Remplacer CPANEL_USER par votre vrai nom d'utilisateur cPanel
UPLOAD_DIR=/home/CPANEL_USER/public_html/${SUBFOLDER}/uploads

CACHE_STORE=file
SESSION_DRIVER=file
QUEUE_CONNECTION=sync
LOG_CHANNEL=single
FILESYSTEM_DISK=local
EOF

echo "  ✓ Source Laravel"

# ── 5. ZIP final ──────────────────────────────────────────────────────────────
echo "► Création du zip..."
cd "$OUT"
rm -f "$ROOT/deploy/eig-cpanel.zip"
zip -r "$ROOT/deploy/eig-cpanel.zip" .
echo "  ✓ deploy/eig-cpanel.zip"

# ── 6. Résumé ─────────────────────────────────────────────────────────────────
echo ""
echo "══════════════════════════════════════════════════════════"
echo "  Build terminé : deploy/eig-cpanel.zip"
echo "══════════════════════════════════════════════════════════"
echo ""
echo "  SUR CPANEL :"
echo ""
echo "  1. Gestionnaire de fichiers → uploader eig-cpanel.zip dans ~/"
echo "  2. Extraire → crée ~/eig-laravel/ et ~/public_html/${SUBFOLDER}/"
echo ""
echo "  3. SSH Terminal :"
echo "     cd ~/eig-laravel"
echo "     composer install --no-dev --optimize-autoloader"
echo "     cp .env.example .env"
echo "     # Editer .env avec vos valeurs MySQL et CPANEL_USER"
echo "     php artisan key:generate"
echo "     php artisan jwt:secret"
echo "     php artisan migrate"
echo "     php artisan db:seed --class=EigSeeder"
echo ""
echo "  4. Site accessible : ${DOMAIN}/${SUBFOLDER}/"
echo "     API health      : ${API_FULL}/health"
echo ""
