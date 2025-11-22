# Fix the messages table database issue
Write-Host "Fixing messages table..." -ForegroundColor Yellow

# Try different PostgreSQL paths
$pgPaths = @(
    "C:\Program Files\PostgreSQL\16\bin\psql.exe",
    "C:\Program Files\PostgreSQL\15\bin\psql.exe",
    "C:\Program Files\PostgreSQL\14\bin\psql.exe",
    "C:\Program Files (x86)\PostgreSQL\16\bin\psql.exe",
    "C:\Program Files (x86)\PostgreSQL\15\bin\psql.exe"
)

$psqlPath = $null
foreach ($path in $pgPaths) {
    if (Test-Path $path) {
        $psqlPath = $path
        Write-Host "Found PostgreSQL at: $path" -ForegroundColor Green
        break
    }
}

if ($null -eq $psqlPath) {
    Write-Host "PostgreSQL psql.exe not found. Please run this manually:" -ForegroundColor Red
    Write-Host "DROP TABLE IF EXISTS messages CASCADE;" -ForegroundColor Cyan
    Write-Host "Then restart the services." -ForegroundColor Cyan
    exit 1
}

# Set password environment variable
$env:PGPASSWORD = "0000"

# Execute the fix
& $psqlPath -U postgres -d university_db_zei -c "DROP TABLE IF EXISTS messages CASCADE;"

if ($LASTEXITCODE -eq 0) {
    Write-Host "Messages table dropped successfully!" -ForegroundColor Green
    Write-Host "The table will be recreated when you start the admin service" -ForegroundColor Cyan
} else {
    Write-Host "Failed to drop messages table" -ForegroundColor Red
}

# Clear password
Remove-Item Env:\PGPASSWORD
