@echo off
echo Preparing to push SentinelAI to GitHub...
echo =======================================

git add .
git commit -m "SentinelAI Initial Release"
git branch -M main

:: This will fail silently if the remote already exists, which is fine
git remote add origin https://github.com/abhitics/SentinalAI.git

echo Pushing to repository...
git push -u origin main

echo =======================================
echo Push attempted. If it failed, ensure that:
echo 1. You have created an empty repository named "SentinalAI" on GitHub.
echo 2. You are logged into Git on this machine.
pause
