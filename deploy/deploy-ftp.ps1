<#
─────────────────────────────────────────────────────────────────────────────
Déploiement FTP du frontend — Excellis Invest Group

Envoie uniquement le frontend et l'admin, dans le bon ordre :
les assets d'abord, les index.html en dernier — pour qu'il n'existe jamais
un instant où la page pointe vers des fichiers pas encore présents.

N'ENVOIE PAS (volontairement) :
  api/         les chemins vers eig-laravel/ diffèrent entre prod et cPanel
  .htaccess    celui du serveur contient HTTPS, cache et en-têtes de sécurité
  uploads/     médias déjà en ligne
  eig-laravel/ backend

Usage :
  powershell -ExecutionPolicy Bypass -File .\deploy\deploy-ftp.ps1
─────────────────────────────────────────────────────────────────────────────
#>

param(
    [string]$FtpHost = "ftp.excellis-investgroup.com",
    [string]$User    = "excel2720944",
    [string]$Source  = "",
    [string]$Remote  = "/"
)

$ErrorActionPreference = "Stop"

if (-not $Source) {
    $Source = Join-Path (Resolve-Path "$PSScriptRoot\..").Path `
              "deploy\eig-cpanel-build\public_html\excellis-invest-group"
}

if (-not (Test-Path "$Source\index.html")) {
    throw "Build introuvable dans $Source — lancez d'abord build-cpanel.ps1"
}

$secure = Read-Host "Mot de passe FTP pour $User" -AsSecureString
$pass   = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
              [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure))

$cred = New-Object System.Net.NetworkCredential($User, $pass)
$sent = 0
$failed = @()

function Send-One {
    param([string]$LocalPath, [string]$RemotePath)

    # les noms de fichiers contiennent des espaces et des accents
    $encoded = ($RemotePath -split '/' | ForEach-Object {
        if ($_ -eq '') { $_ } else { [uri]::EscapeDataString($_) }
    }) -join '/'

    $uri = "ftp://$FtpHost$encoded"
    try {
        $req = [System.Net.FtpWebRequest]::Create($uri)
        $req.Credentials = $cred
        $req.Method      = [System.Net.WebRequestMethods+Ftp]::UploadFile
        $req.UseBinary   = $true
        $req.UsePassive  = $true
        $req.KeepAlive   = $false

        $bytes  = [System.IO.File]::ReadAllBytes($LocalPath)
        $stream = $req.GetRequestStream()
        $stream.Write($bytes, 0, $bytes.Length)
        $stream.Close()
        $resp = $req.GetResponse()
        $resp.Close()

        $script:sent++
        Write-Host ("  OK  {0}" -f $RemotePath)
    } catch {
        $script:failed += $RemotePath
        Write-Host ("  ECHEC {0} : {1}" -f $RemotePath, $_.Exception.Message) -ForegroundColor Red
    }
}

$base = $Remote.TrimEnd('/')

Write-Host ""
Write-Host "Deploiement vers $FtpHost$Remote"
Write-Host "Source : $Source"
Write-Host ""

# ── 1. assets du frontend ─────────────────────────────────────────────────────
Write-Host "[1/4] Assets frontend..."
Get-ChildItem "$Source\assets" -File | ForEach-Object {
    Send-One $_.FullName "$base/assets/$($_.Name)"
}

# ── 2. assets de l'admin ──────────────────────────────────────────────────────
Write-Host "[2/4] Assets admin..."
Get-ChildItem "$Source\admin\assets" -File | ForEach-Object {
    Send-One $_.FullName "$base/admin/assets/$($_.Name)"
}

# ── 3. index.html de l'admin ──────────────────────────────────────────────────
Write-Host "[3/4] admin/index.html..."
Send-One "$Source\admin\index.html" "$base/admin/index.html"

# ── 4. index.html du site — EN DERNIER ────────────────────────────────────────
Write-Host "[4/4] index.html..."
Send-One "$Source\index.html" "$base/index.html"

Write-Host ""
Write-Host "==============================================================="
if ($failed.Count -eq 0) {
    Write-Host "  DEPLOIEMENT OK — $sent fichiers envoyes"
} else {
    Write-Host "  $sent envoyes, $($failed.Count) EN ECHEC :" -ForegroundColor Red
    $failed | ForEach-Object { Write-Host "    $_" -ForegroundColor Red }
    Write-Host "  Relancez le script : les fichiers deja envoyes seront simplement reecrits."
}
Write-Host "==============================================================="
