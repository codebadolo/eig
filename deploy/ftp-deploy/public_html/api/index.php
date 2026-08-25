<?php
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Racine FTP confirmee = document root direct (pas de public_html/ intermediaire)
// donc eig-laravel/ est un sibling direct de api/ a la racine du domaine.
if (file_exists($maintenance = __DIR__.'/../eig-laravel/storage/framework/maintenance.php')) {
    require $maintenance;
}

require __DIR__.'/../eig-laravel/vendor/autoload.php';
$app = require_once __DIR__.'/../eig-laravel/bootstrap/app.php';

$_SERVER['SCRIPT_NAME']     = '/index.php';
$_SERVER['SCRIPT_FILENAME'] = __DIR__ . '/index.php';
$_SERVER['PHP_SELF']        = '/index.php';

$app->handleRequest(Request::capture());
