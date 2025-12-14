Write-Host "=== Configuration de la Plateforme E-Learning ===" -ForegroundColor Green

# Vérifier Docker
try {
    docker --version | Out-Null
    Write-Host "✓ Docker installé" -ForegroundColor Green
} catch {
    Write-Host "✗ Docker requis" -ForegroundColor Red
    exit 1
}

Write-Host "✓ Configuration terminée" -ForegroundColor Green