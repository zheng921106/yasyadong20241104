@echo off
set "path_to_files=F:\yasyadong20241104\split_files"
for %%f in ("%path_to_files%\*.sql") do (
    echo Executing %%f
    wrangler d1 execute yasyadong --file="%%f" --remote
    if %errorlevel% neq 0 (
        echo Error executing %%f
        pause
        exit /b %errorlevel%
    )
)
echo All files executed successfully!
pause
