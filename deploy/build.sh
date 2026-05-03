#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
# Build production — Excellis Invest Group
# Usage : ./deploy/build.sh https://excellis-invest-group.jofedigital.com
# Résultat : deploy/excellis-group.zip
#
# Structure après extraction dans public_html/ :
#   public_html/
#   └── excellis-invest-group/
#       ├── index.html
#       ├── assets/
#       ├── .htaccess
#       ├── admin/
#       │   ├── index.html
#       │   └── .htaccess
#       └── api/               ← Application root cPanel Node.js
#           ├── app.js
#           ├── package.json
#           ├── prisma/
#           └── src/
# ─────────────────────────────────────────────────────────────────────────────

set -e

DOMAIN="${1:-https://excellis-invest-group.jofedigital.com}"
API_FULL="${DOMAIN}/excellis-invest-group/api"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/deploy/excellis-invest-group"

echo ""
echo "  Excellis Invest Group — Build Production"
echo "  Domaine : $DOMAIN"
echo "  API     : $API_FULL"
echo ""

# ── Nettoyage ────────────────────────────────────────────────────────────────
rm -rf "$OUT"
mkdir -p "$OUT/admin"
mkdir -p "$OUT/api/src/uploads"

# ── 1. Build FRONTEND ────────────────────────────────────────────────────────
echo "► Build frontend..."
cd "$ROOT"
echo "VITE_API_URL=$API_FULL" > .env.production.local
npm install --silent
npm run build
cp -r dist/. "$OUT/"
cp "$ROOT/deploy/htaccess-frontend" "$OUT/.htaccess"
echo "  ✓ Frontend → excellis-invest-group/"

# ── 2. Build ADMIN ───────────────────────────────────────────────────────────
echo "► Build admin..."
cd "$ROOT/admin"
echo "VITE_API_URL=$API_FULL" > .env.production.local
npm install --silent
npm run build
cp -r dist/. "$OUT/admin/"
cp "$ROOT/deploy/htaccess-admin" "$OUT/admin/.htaccess"
echo "  ✓ Admin → excellis-invest-group/admin/"

# ── 3. Backend ───────────────────────────────────────────────────────────────
echo "► Préparation backend..."
cd "$ROOT/backend"
rsync -a \
  --exclude='node_modules' \
  --exclude='.env' \
  --exclude='src/uploads/*' \
  --exclude='Dockerfile' \
  --exclude='.dockerignore' \
  --exclude='.htaccess' \
  . "$OUT/api/"
cp "$ROOT/deploy/htaccess-api" "$OUT/api/.htaccess"
echo "  ✓ Backend → excellis-invest-group/api/"

# ── 4. ZIP final ─────────────────────────────────────────────────────────────
echo "► Création du zip..."
cd "$ROOT/deploy"
rm -f excellis-group.zip
zip -r excellis-group.zip excellis-invest-group/
echo "  ✓ deploy/excellis-group.zip"

# ── 5. Résumé ────────────────────────────────────────────────────────────────
echo ""
echo "══════════════════════════════════════════════════════════"
echo "  Build terminé : deploy/excellis-group.zip"
echo "══════════════════════════════════════════════════════════"
echo ""
echo "  Sur cPanel — Gestionnaire de fichiers :"
echo "  1. Uploader excellis-group.zip dans ~/public_html/"
echo "  2. Extraire → crée public_html/excellis-invest-group/"
echo "  3. Créer public_html/excellis-invest-group/api/.env"
echo ""
echo "  Contenu du .env :"
echo "  DATABASE_URL=mysql://user:pass@localhost:3306/nom_db"
echo "  JWT_SECRET=votre-cle-longue"
echo "  JWT_EXPIRES_IN=7d"
echo "  PORT=3001"
echo "  FRONTEND_URL=$DOMAIN"
echo "  ADMIN_URL=$DOMAIN"
echo ""
echo "  Setup Node.js App :"
echo "  - Application root    : public_html/excellis-invest-group/api"
echo "  - Application URL     : $DOMAIN"
echo "  - Startup file        : app.js"
echo ""
echo "  Terminal cPanel :"
echo "  cd ~/public_html/excellis-invest-group/api"
echo "  npm install --prefix ."
echo "  npx prisma db push"
echo "  node src/seed.js"
echo ""
