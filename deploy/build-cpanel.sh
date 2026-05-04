#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
# Build cPanel — Excellis Invest Group
# Usage : ./deploy/build-cpanel.sh https://excellis-invest-group.jofedigital.com
#
# Produit : deploy/eig-cpanel.zip
# ─────────────────────────────────────────────────────────────────────────────

set -e

DOMAIN="${1:-https://excellis-invest-group.jofedigital.com}"
SUBFOLDER="excellis-invest-group"
API_BASE="${DOMAIN}/api"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/deploy/eig-cpanel-build"
LARAVEL_OUT="$OUT/eig-laravel"
WEB_OUT="$OUT/public_html/$SUBFOLDER"

echo ""
echo "  ┌─────────────────────────────────────────────────────────┐"
echo "  │  EIG — Build cPanel                                     │"
echo "  │  Domaine : $DOMAIN                                      │"
echo "  │  API URL : $API_BASE                                    │"
echo "  └─────────────────────────────────────────────────────────┘"
echo ""

# ── Nettoyage ─────────────────────────────────────────────────────────────────
rm -rf "$OUT"
mkdir -p "$WEB_OUT/admin"
mkdir -p "$WEB_OUT/uploads"
mkdir -p "$WEB_OUT/api"
mkdir -p "$LARAVEL_OUT"

# ── 1. Build FRONTEND ─────────────────────────────────────────────────────────
echo "► [1/5] Build frontend..."
cd "$ROOT"
echo "VITE_API_URL=$API_BASE" > .env.production.local
npm install --no-audit --no-fund
npm run build
cp -r dist/. "$WEB_OUT/"

# .htaccess frontend
cat > "$WEB_OUT/.htaccess" << 'EOF'
Options -MultiViews
RewriteEngine On
RewriteBase /

RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} !^/admin/
RewriteCond %{REQUEST_URI} !^/api/
RewriteRule ^ index.html [L]
EOF
echo "  ✓ Frontend + .htaccess"

# ── 2. Build ADMIN ────────────────────────────────────────────────────────────
echo "► [2/5] Build admin..."
cd "$ROOT/admin"
echo "VITE_API_URL=$API_BASE" > .env.production.local
npm install --no-audit --no-fund
npm run build
cp -r dist/. "$WEB_OUT/admin/"

# .htaccess admin
cat > "$WEB_OUT/admin/.htaccess" << 'EOF'
Options -MultiViews
RewriteEngine On
RewriteBase /admin/

RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [L]
EOF
echo "  ✓ Admin + .htaccess"

# ── 3. Laravel public/ → api/ avec correction CRITIQUE ────────────────────────
echo "► [3/5] Configuration API Laravel..."
cp -r "$ROOT/backend-php/public/." "$WEB_OUT/api/"

# Index.php CORRIGÉ avec SCRIPT_NAME (solution au problème 404)
cat > "$WEB_OUT/api/index.php" << 'EOF'
<?php
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

if (file_exists($maintenance = __DIR__.'/../../../eig-laravel/storage/framework/maintenance.php')) {
    require $maintenance;
}

require __DIR__.'/../../../eig-laravel/vendor/autoload.php';
$app = require_once __DIR__.'/../../../eig-laravel/bootstrap/app.php';

// CORRECTION CRITIQUE : Force SCRIPT_NAME pour que Laravel voie /api/les routes
$_SERVER['SCRIPT_NAME']     = '/index.php';
$_SERVER['SCRIPT_FILENAME'] = __DIR__ . '/index.php';
$_SERVER['PHP_SELF']        = '/index.php';

$app->handleRequest(Request::capture());
EOF

# .htaccess api (SANS AddHandler - problème connu LWS)
cat > "$WEB_OUT/api/.htaccess" << 'EOF'
<IfModule mod_rewrite.c>
    Options -MultiViews -Indexes
    RewriteEngine On
    RewriteBase /api/

    RewriteCond %{HTTP:Authorization} .
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
</IfModule>
EOF

# Nettoyage des fichiers inutiles
rm -rf "$WEB_OUT/api/uploads" "$WEB_OUT/api/storage"
echo "  ✓ API Laravel (avec correction 404)"

# ── 4. Source Laravel → eig-laravel/ ─────────────────────────────────────────
echo "► [4/5] Copie source Laravel..."
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

# .env.example pour cPanel (adapté à la structure)
cat > "$LARAVEL_OUT/.env.example" << EOF
APP_NAME="EIG Backend"
APP_ENV=production
APP_KEY=
APP_DEBUG=false
APP_URL=${API_BASE}

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=c1663907c_eig-database
DB_USERNAME=c1663907c_eig_database_user
DB_PASSWORD=VOTRE_MOT_DE_PASSE

JWT_SECRET=
JWT_TTL=10080

FRONTEND_URL=${DOMAIN}
ADMIN_URL=${DOMAIN}/admin

# Dossier uploads (dans public_html/excellis-invest-group/uploads)
UPLOAD_DIR=/home/c1663907c/public_html/${SUBFOLDER}/uploads

CACHE_STORE=file
SESSION_DRIVER=file
QUEUE_CONNECTION=sync
LOG_CHANNEL=single
FILESYSTEM_DISK=local
EOF

echo "  ✓ Source Laravel + .env.example"

# ── 5. ZIP final ──────────────────────────────────────────────────────────────
echo "► [5/5] Création du zip..."
cd "$OUT"
rm -f "$ROOT/deploy/eig-cpanel.zip"
zip -rq "$ROOT/deploy/eig-cpanel.zip" .
echo "  ✓ deploy/eig-cpanel.zip"

# ── 6. Instructions de déploiement ────────────────────────────────────────────
echo ""
echo "═══════════════════════════════════════════════════════════════════════════"
echo "  ✅ BUILD TERMINÉ : deploy/eig-cpanel.zip"
echo "═══════════════════════════════════════════════════════════════════════════"
echo ""
echo "  📦 SUR CPANEL (LWS) :"
echo ""
echo "  1. Uploader eig-cpanel.zip dans le dossier /home/c1663907c/"
echo "  2. Extraire le zip (crée eig-laravel/ et public_html/excellis-invest-group/)"
echo ""
echo "  3. Configurer PHP 8.3 dans cPanel → PHP Selector"
echo ""
echo "  4. En SSH :"
echo "     cd ~/eig-laravel"
echo "     composer install --no-dev --optimize-autoloader"
echo "     cp .env.example .env"
echo "     # Éditer .env : DB_DATABASE, DB_USERNAME, DB_PASSWORD"
echo "     php artisan key:generate"
echo "     php artisan jwt:secret"
echo "     php artisan migrate --force"
echo "     php artisan db:seed --class=EigSeeder"
echo "     chmod -R 775 storage bootstrap/cache"
echo "     touch storage/logs/laravel.log"
echo "     chmod 664 storage/logs/laravel.log"
echo ""
echo "  5. Vérifications :"
echo "     curl ${API_BASE}/health"
echo "     curl ${DOMAIN}/admin/"
echo ""
echo "═══════════════════════════════════════════════════════════════════════════"