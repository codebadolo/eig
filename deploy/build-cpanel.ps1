<#
─────────────────────────────────────────────────────────────────────────────
Build cPanel — Excellis Invest Group (Windows / PowerShell)
Équivalent de deploy/build-cpanel.sh, pour machine Windows.

Usage :
  .\deploy\build-cpanel.ps1 -Domain "https://excellis-invest-group.jofedigital.com"

Produit : deploy\eig-cpanel.zip
─────────────────────────────────────────────────────────────────────────────
#>

param(
    [string]$Domain = "https://excellis-invest-group.jofedigital.com"
)

$ErrorActionPreference = "Stop"

# Windows PowerShell 5.1 : "Set-Content -Encoding utf8" ecrit un BOM.
# Un BOM en tete de index.php est emis par PHP AVANT la reponse JSON et casse
# tous les clients (le premier champ JSON devient illisible => auth cassee).
# On ecrit donc systematiquement en UTF-8 SANS BOM.
function Write-Utf8NoBom {
    param([string]$Path, [string]$Content)
    $utf8NoBom = New-Object System.Text.UTF8Encoding $false
    [System.IO.File]::WriteAllText($Path, $Content, $utf8NoBom)
}

$Subfolder = "excellis-invest-group"

# Un domaine saisi avec un / final ("https://site.com/") produirait
# VITE_API_URL=https://site.com//api -> toutes les requetes partent en 404.
$Domain    = $Domain.TrimEnd('/')
$ApiBase   = "$Domain/api"
$Root      = (Resolve-Path "$PSScriptRoot\..").Path
$Out       = Join-Path $Root "deploy\eig-cpanel-build"
$LaravelOut = Join-Path $Out "eig-laravel"
$WebOut    = Join-Path $Out "public_html\$Subfolder"

Write-Host ""
Write-Host "  +-----------------------------------------------------------+"
Write-Host "  |  EIG - Build cPanel (Windows)                              |"
Write-Host "  |  Domaine : $Domain"
Write-Host "  |  API URL : $ApiBase"
Write-Host "  +-----------------------------------------------------------+"
Write-Host ""

# ── Nettoyage ─────────────────────────────────────────────────────────────────
if (Test-Path $Out) { Remove-Item -Recurse -Force $Out }
New-Item -ItemType Directory -Force -Path "$WebOut\admin" | Out-Null
New-Item -ItemType Directory -Force -Path "$WebOut\uploads" | Out-Null
New-Item -ItemType Directory -Force -Path "$WebOut\api" | Out-Null
New-Item -ItemType Directory -Force -Path $LaravelOut | Out-Null

# ── 1. Build FRONTEND ─────────────────────────────────────────────────────────
Write-Host "[1/5] Build frontend..."
Set-Location $Root
Write-Utf8NoBom -Path (Join-Path $Root ".env.production.local") -Content "VITE_API_URL=$ApiBase"
npm install --no-audit --no-fund
if ($LASTEXITCODE -ne 0) { throw "npm install (frontend) a échoué" }
npm run build
if ($LASTEXITCODE -ne 0) { throw "npm run build (frontend) a échoué" }
Copy-Item -Path "dist\*" -Destination $WebOut -Recurse -Force

@'
Options -MultiViews
RewriteEngine On
RewriteBase /

RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} !^/admin/
RewriteCond %{REQUEST_URI} !^/api/
RewriteCond %{REQUEST_URI} !^/uploads/
RewriteRule ^ index.html [L]
'@ | Set-Content -Path "$WebOut\.htaccess" -Encoding ascii

Write-Host "  OK Frontend + .htaccess"

# ── 2. Build ADMIN ────────────────────────────────────────────────────────────
Write-Host "[2/5] Build admin..."
Set-Location "$Root\admin"
Write-Utf8NoBom -Path (Join-Path "$Root\admin" ".env.production.local") -Content "VITE_API_URL=$ApiBase"
npm install --no-audit --no-fund
if ($LASTEXITCODE -ne 0) { throw "npm install (admin) a échoué" }
npm run build
if ($LASTEXITCODE -ne 0) { throw "npm run build (admin) a échoué" }
Copy-Item -Path "dist\*" -Destination "$WebOut\admin" -Recurse -Force

@'
Options -MultiViews
RewriteEngine On
RewriteBase /admin/

RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [L]
'@ | Set-Content -Path "$WebOut\admin\.htaccess" -Encoding ascii

Write-Host "  OK Admin + .htaccess"

# ── 3. Laravel public/ -> api/ avec correction CRITIQUE ───────────────────────
Write-Host "[3/5] Configuration API Laravel..."
Copy-Item -Path "$Root\backend-php\public\*" -Destination "$WebOut\api" -Recurse -Force

@"
<?php
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

if (file_exists(`$maintenance = __DIR__.'/../../../eig-laravel/storage/framework/maintenance.php')) {
    require `$maintenance;
}

require __DIR__.'/../../../eig-laravel/vendor/autoload.php';
`$app = require_once __DIR__.'/../../../eig-laravel/bootstrap/app.php';

// CORRECTION CRITIQUE : Force SCRIPT_NAME pour que Laravel voie /api/ les routes
`$_SERVER['SCRIPT_NAME']     = '/index.php';
`$_SERVER['SCRIPT_FILENAME'] = __DIR__ . '/index.php';
`$_SERVER['PHP_SELF']        = '/index.php';

`$app->handleRequest(Request::capture());
"@ | ForEach-Object { Write-Utf8NoBom -Path "$WebOut\api\index.php" -Content $_ }

@'
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
'@ | Set-Content -Path "$WebOut\api\.htaccess" -Encoding ascii

# Nettoyage des fichiers inutiles dans api/
Remove-Item -Recurse -Force "$WebOut\api\uploads" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force "$WebOut\api\storage" -ErrorAction SilentlyContinue

New-Item -ItemType Directory -Force -Path "$WebOut\uploads" | Out-Null

@'
Options -Indexes
RewriteEngine Off

<FilesMatch "\.(jpg|jpeg|png|gif|webp|svg|mp4|webm|mov)$">
    Allow from all
</FilesMatch>

<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpeg    "access plus 1 year"
    ExpiresByType image/jpg     "access plus 1 year"
    ExpiresByType image/png     "access plus 1 year"
    ExpiresByType image/gif     "access plus 1 year"
    ExpiresByType image/webp    "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType video/mp4     "access plus 1 year"
</IfModule>
'@ | Set-Content -Path "$WebOut\uploads\.htaccess" -Encoding ascii

Write-Host "  OK API Laravel (avec correction 404) + dossier uploads/"

# ── 4. Source Laravel -> eig-laravel/ (robocopy = équivalent rsync) ───────────
Write-Host "[4/5] Copie source Laravel..."
robocopy "$Root\backend-php" $LaravelOut /E `
    /XD vendor node_modules public "framework\cache" "framework\sessions" "framework\views" "bootstrap\cache" `
    /XF ".env" "*.log" | Out-Null
# robocopy renvoie des codes de sortie 0-7 qui sont des succès (pas des erreurs) :
if ($LASTEXITCODE -ge 8) { throw "robocopy (source Laravel) a échoué (code $LASTEXITCODE)" }

@"
APP_NAME="EIG Backend"
APP_ENV=production
APP_KEY=
APP_DEBUG=false
APP_URL=$ApiBase

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=c1663907c_eig-database
DB_USERNAME=c1663907c_eig_database_user
DB_PASSWORD=VOTRE_MOT_DE_PASSE

JWT_SECRET=
JWT_TTL=10080

FRONTEND_URL=$Domain
ADMIN_URL=$Domain/admin

UPLOAD_DIR=/home/c1663907c/public_html/$Subfolder/uploads

CACHE_STORE=file
SESSION_DRIVER=file
QUEUE_CONNECTION=sync
LOG_CHANNEL=single
FILESYSTEM_DISK=local
"@ | ForEach-Object { Write-Utf8NoBom -Path "$LaravelOut\.env.example" -Content $_ }

Write-Host "  OK Source Laravel + .env.example"

# ── 5. ZIP final ───────────────────────────────────────────────────────────────
Write-Host "[5/5] Création du zip..."
$ZipPath = Join-Path $Root "deploy\eig-cpanel.zip"
if (Test-Path $ZipPath) { Remove-Item -Force $ZipPath }
Compress-Archive -Path "$Out\*" -DestinationPath $ZipPath -CompressionLevel Optimal
Write-Host "  OK deploy\eig-cpanel.zip"

Write-Host ""
Write-Host "==============================================================="
Write-Host "  BUILD TERMINE : deploy\eig-cpanel.zip"
Write-Host "==============================================================="
Write-Host ""
Write-Host "  SUR CPANEL (LWS) :"
Write-Host ""
Write-Host "  1. Uploader eig-cpanel.zip dans le dossier /home/c1663907c/"
Write-Host "  2. Extraire le zip (cree eig-laravel/ et public_html/$Subfolder/)"
Write-Host ""
Write-Host "  3. Configurer PHP 8.3 dans cPanel -> PHP Selector"
Write-Host ""
Write-Host "  4. En SSH :"
Write-Host "     cd ~/eig-laravel"
Write-Host "     composer install --no-dev --optimize-autoloader"
Write-Host "     cp .env.example .env"
Write-Host "     # Editer .env : DB_DATABASE, DB_USERNAME, DB_PASSWORD"
Write-Host "     php artisan key:generate"
Write-Host "     php artisan jwt:secret"
Write-Host "     php artisan migrate --force"
Write-Host "     php artisan db:seed --class=EigSeeder"
Write-Host "     chmod -R 775 storage bootstrap/cache"
Write-Host "     touch storage/logs/laravel.log"
Write-Host "     chmod 664 storage/logs/laravel.log"
Write-Host ""
Write-Host "  5. Verifications :"
Write-Host "     curl $ApiBase/health"
Write-Host "     curl $Domain/admin/"
Write-Host ""
Write-Host "==============================================================="
