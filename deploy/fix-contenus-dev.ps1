<#
─────────────────────────────────────────────────────────────────────────────
Corrections de contenu via API — environnement DEV (jofedigital)

Applique :
  1. BAGREAH  -> secteur "Agro-industrie" (filtre par secteur)
  2. Coris Assurances IARD Côte d'Ivoire SA -> ajout du "IARD" dans la description
  3. Coris Assurances Vie Côte d'Ivoire     -> description en minuscules + "Assurances" avec un s

Usage :
  powershell -ExecutionPolicy Bypass -File .\deploy\fix-contenus-dev.ps1

Pour l'appliquer en PRODUCTION plus tard :
  powershell -ExecutionPolicy Bypass -File .\deploy\fix-contenus-dev.ps1 -BaseUrl "https://excellis-investgroup.com"
─────────────────────────────────────────────────────────────────────────────
#>

param(
    [string]$BaseUrl = "https://excellis-invest-group.jofedigital.com",
    [string]$Email   = "admin@excellis-invest-group.com"
)

$ErrorActionPreference = "Stop"

# ── Connexion ────────────────────────────────────────────────────────────────
$secure = Read-Host "Mot de passe admin pour $Email" -AsSecureString
$plain  = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
              [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure))

function Invoke-Api {
    param([string]$Path, [string]$Method, $Payload, [string]$Token)

    $json  = $Payload | ConvertTo-Json -Depth 10 -Compress
    # UTF-8 explicite : sinon PowerShell 5.1 mange les accents (é, ô, « »)
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($json)

    $headers = @{}
    if ($Token) { $headers["Authorization"] = "Bearer $Token" }

    return Invoke-RestMethod -Uri "$BaseUrl$Path" -Method $Method `
        -Body $bytes -ContentType "application/json; charset=utf-8" -Headers $headers
}

Write-Host "Connexion a $BaseUrl ..."
$auth = Invoke-Api -Path "/api/auth/login" -Method Post -Payload @{ email = $Email; password = $plain }
$token = $auth.token

if ([string]::IsNullOrWhiteSpace($token)) {
    throw "Aucun token recu. Si l'API renvoie un BOM (voir index.php), l'authentification restera cassee."
}
Write-Host "  OK token recu"

# ── 1. BAGREAH : secteur Agro-industrie ──────────────────────────────────────
Write-Host "[1/3] BAGREAH -> Agro-industrie..."
Invoke-Api -Path "/api/filiales/bagreah" -Method Put -Token $token -Payload @{
    secteur     = "Agro-industrie"
    secteur_en  = "Agribusiness"
    secteurSlug = "agribusiness"
} | Out-Null
Write-Host "  OK"

# ── 2. Coris Assurances IARD Côte d'Ivoire SA ────────────────────────────────
Write-Host "[2/3] Coris Assurances IARD Cote d'Ivoire SA -> ajout du IARD..."
Invoke-Api -Path "/api/filiales/coris-assurance-iard-ci" -Method Put -Token $token -Payload @{
    description = "Coris Assurances IARD Côte d'Ivoire SA est une société anonyme de droit ivoirien au capital de cinq milliards de FCFA libérés intégralement. Elle s'est imposée comme un assureur de référence proche de ses clients, mettant l'accent sur l'accessibilité des produits, la rapidité des prestations et l'innovation continue. Slogan : « L'Assureur qui rassure »."
    description_en = "Coris Assurances IARD Côte d'Ivoire SA is a joint-stock company under Ivorian law with a share capital of five billion FCFA fully paid up. It has established itself as a reference insurer close to its clients, focusing on product accessibility, speed of service and continuous innovation. Tagline: 'The Insurer that Reassures'."
} | Out-Null
Write-Host "  OK"

# ── 3. Coris Assurances Vie Côte d'Ivoire ────────────────────────────────────
Write-Host "[3/3] Coris Assurances Vie Cote d'Ivoire -> minuscules + Assurances..."
Invoke-Api -Path "/api/filiales/coris-assurance-vie-ci" -Method Put -Token $token -Payload @{
    description = "Coris Assurances Vie Côte d'Ivoire est une société anonyme de droit ivoirien avec Conseil d'Administration, régie par le Code des assurances de la CIMA. Elle a été créée à l'initiative du Groupe Coris afin de compléter l'offre de services financiers déjà déployée sur le marché ivoirien à travers sa filiale bancaire, Coris Bank International Côte d'Ivoire, et de proposer une gamme complète de solutions d'assurance vie répondant aux besoins des particuliers, des professionnels et des entreprises. Dotée d'un capital social de 5 000 000 000 FCFA, la société a obtenu son agrément le 26 décembre 2024 pour exercer les opérations d'assurance vie conformément à la réglementation de la CIMA."
    description_en = "Coris Assurances Vie Côte d'Ivoire is a joint-stock company under Ivorian law with a Board of Directors, governed by the CIMA Insurance Code. It was created on the initiative of the Coris Group to complement the financial services offering already deployed on the Ivorian market through its banking subsidiary, Coris Bank International Côte d'Ivoire, and to offer a complete range of life insurance solutions meeting the needs of individuals, professionals and businesses. With a share capital of 5,000,000,000 FCFA, the company obtained its approval on 26 December 2024 to conduct life insurance operations in accordance with CIMA regulations."
} | Out-Null
Write-Host "  OK"

Write-Host ""
Write-Host "==============================================================="
Write-Host "  3 corrections appliquees sur $BaseUrl"
Write-Host "==============================================================="
