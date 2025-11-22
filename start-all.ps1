# Script pour démarrer tous les services
Write-Host "🚀 Démarrage de tous les services..." -ForegroundColor Green

# Démarrer auth-service
Write-Host "`n📡 Démarrage auth-service..." -ForegroundColor Cyan
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend\auth-service'; npm run start:dev"

# Attendre 2 secondes
Start-Sleep -Seconds 2

# Démarrer admin-service
Write-Host "📡 Démarrage admin-service..." -ForegroundColor Cyan
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend\admin-service'; npm run start:dev"

# Attendre 2 secondes
Start-Sleep -Seconds 2

# Démarrer emploi-service
Write-Host "📡 Démarrage emploi-service..." -ForegroundColor Cyan
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend\emploi-service'; npm run start:dev"

# Attendre 2 secondes
Start-Sleep -Seconds 2

# Démarrer frontend
Write-Host "🎨 Démarrage frontend..." -ForegroundColor Cyan
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend\front'; npm start"

Write-Host "`n✅ Tous les services sont en cours de démarrage!" -ForegroundColor Green
Write-Host "Vérifiez les fenêtres de terminal qui se sont ouvertes." -ForegroundColor Yellow
