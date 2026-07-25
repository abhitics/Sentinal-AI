@echo off
echo Starting SentinelAI Stack...
echo ============================

echo Starting Python API (Port 5001)...
start "Python API" cmd /k "cd PythonModel && .\venv\Scripts\python.exe pythonApi.py"

echo Starting Node Backend (Port 5000)...
start "Node Backend" cmd /k "cd backend && node index.js"

echo Starting Frontend (Port 3000)...
start "Next.js Frontend" cmd /k "cd frontend && npm run dev"

echo All services are starting up! 
echo Please wait a few seconds and then open http://localhost:3000 in your browser.
pause
