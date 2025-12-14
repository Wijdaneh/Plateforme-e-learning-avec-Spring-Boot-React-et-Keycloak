Write-Host "=== Arrêt des Services ===" -ForegroundColor Green

# Keycloak
Write-Host "Arrêt Keycloak..." -ForegroundColor Yellow
Set-Location -Path "../keycloak"
docker-compose down

# Processus Spring Boot
Write-Host "Arrêt Spring Boot..." -ForegroundColor Yellow
$springProcesses = Get-Process -Name "java" -ErrorAction SilentlyContinue | 
                   Where-Object { $_.CommandLine -like "*elearning*" }
foreach ($process in $springProcesses) {
    Stop-Process -Id $process.Id -Force
}

# Processus React
Write-Host "Arrêt React..." -ForegroundColor Yellow
$reactProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue
foreach ($process in $reactProcesses) {
    if ($process.CommandLine -like "*vite*") {
        Stop-Process -Id $process.Id -Force
    }
}

Write-Host "`n=== Services arrêtés ===" -ForegroundColor Green