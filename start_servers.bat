@echo off
echo Starting Agricultural AI System...
echo.

echo Starting Flask ML API Server...
start "Flask ML API" cmd /k "C:\Users\hp\AppData\Local\Programs\Python\Python312\python.exe app.py"

echo Waiting 3 seconds for Flask to start...
timeout /t 3 /nobreak > nul

echo Starting Node.js Web Server...
start "Node.js Server" cmd /k "node server.js"

echo.
echo Both servers are starting...
echo Flask ML API: http://localhost:5000
echo Node.js Web App: http://localhost:8080
echo.
echo Press any key to exit...
pause > nul

