Write-Host "=== Démarrage Plateforme E-Learning ===" -ForegroundColor Green

# 1. Keycloak
Write-Host "`n[1/3] Keycloak..." -ForegroundColor Cyan
Set-Location -Path "../keycloak"
docker-compose up -d
Start-Sleep -Seconds 30

# 2. Spring Boot
Write-Host "`n[2/3] Spring Boot..." -ForegroundColor Cyan
Set-Location -Path "../backend-springboot"
Start-Process powershell "-NoExit -Command mvn spring-boot:run" -WindowStyle Minimized
Start-Sleep -Seconds 10

# 3. React
Write-Host "`n[3/3] React..." -ForegroundColor Cyan
Set-Location -Path "../frontend-react"
Start-Process powershell "-NoExit -Command npm run dev" -WindowStyle Minimized

Write-Host "`n=== Services démarrés ===" -ForegroundColor Green
Write-Host "React:       http://localhost:3000" -ForegroundColor Yellow
Write-Host "Spring Boot: http://localhost:8081" -ForegroundColor Yellow
Write-Host "Keycloak:    http://localhost:8080" -ForegroundColor Yellow