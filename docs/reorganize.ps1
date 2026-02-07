# Create necessary directories
$directories = @(
    "backend\api",
    "backend\lib",
    "backend\scripts",
    "backend\prisma",
    "frontend\app",
    "frontend\components",
    "frontend\lib",
    "database\migrations",
    "database\scripts"
)

foreach ($dir in $directories) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Host "Created directory: $dir"
    }
}

# Move files to their respective directories
$moves = @{
    # Backend files
    "src/app/api" = "backend/api"
    "src/lib/db.ts" = "backend/lib/db.ts"
    "scripts/init-db.ts" = "backend/scripts/init-db.ts"
    "prisma" = "backend/prisma"
    
    # Frontend files
    "src/app" = "frontend/app"
    "src/components" = "frontend/components"
    "src/hooks" = "frontend/hooks"
    "public" = "frontend/public"
    "src/styles" = "frontend/styles"
    "next.config.js" = "frontend/"
    "postcss.config.js" = "frontend/"
    "tailwind.config.js" = "frontend/"
    "tsconfig.json" = "frontend/"
    
    # Database files
    "database" = "database/"
}

foreach ($src in $moves.Keys) {
    $dest = $moves[$src]
    if (Test-Path $src) {
        Move-Item -Path $src -Destination $dest -Force
        Write-Host "Moved $src to $dest"
    } else {
        Write-Host "Source not found: $src"
    }
}

# Update imports in files
$filesToUpdate = @(
    "backend/scripts/init-db.ts",
    "backend/api/contact/route.ts",
    "backend/api/newsletter/route.ts",
    "backend/api/products/route.ts"
)

foreach ($file in $filesToUpdate) {
    if (Test-Path $file) {
        (Get-Content $file) -replace "@/lib/db", "../../../lib/db" | Set-Content $file
        Write-Host "Updated imports in $file"
    }
}

Write-Host "Reorganization complete!"
