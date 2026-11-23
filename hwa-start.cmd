@echo off
set "PATH=%LOCALAPPDATA%\hwa-hackathon\tools\gh\bin;%LOCALAPPDATA%\hwa-hackathon\tools\npm;%LOCALAPPDATA%\hwa-hackathon\tools\git\cmd;%LOCALAPPDATA%\hwa-hackathon\tools\node;%PATH%"
set "OPENCODE_CONFIG_CONTENT="
set "OPENCODE_CONFIG="
set "OPENCODE_CONFIG_DIR="
set "OPENCODE_DISABLE_AUTOUPDATE=1"
set "OPENCODE_DISABLE_EXTERNAL_SKILLS=1"
set "OPENCODE_DISABLE_CLAUDE_CODE=1"
cd /d "%~dp0"
echo.
echo   ONLY OPEN-SOURCE MODELS ARE ALLOWED: pick one in /models (Qwen, DeepSeek, Kimi, GLM, gpt-oss, Llama, Mistral).
echo   Closed models (Claude, GPT, Gemini, Grok) are against the rules; any provider or your own API key is fine for open-source models.
echo.
start "" /b "%LOCALAPPDATA%\hwa-hackathon\tools\node\node.exe" .hwa\hwa-collect.mjs watch - >nul 2>&1
"%LOCALAPPDATA%\hwa-hackathon\tools\node\node.exe" .hwa\hwa-collect.mjs pick - --report .hwa\pick.txt
set "S="
if exist .hwa\pick.txt set /p S=<.hwa\pick.txt
if "%S%"=="stop" exit /b 1
if defined S ("%LOCALAPPDATA%\hwa-hackathon\tools\npm\opencode.cmd" -s %S%) else ("%LOCALAPPDATA%\hwa-hackathon\tools\npm\opencode.cmd")
"%LOCALAPPDATA%\hwa-hackathon\tools\node\node.exe" -e "if(process.stdout.isTTY)process.stdout.write('\x1b[0m\x1b[?25h\x1b[?1000l\x1b[?1002l\x1b[?1003l\x1b[?1006l\x1b[?2004l')"
"%LOCALAPPDATA%\hwa-hackathon\tools\node\node.exe" .hwa\hwa-collect.mjs seal - >nul 2>&1
"%LOCALAPPDATA%\hwa-hackathon\tools\node\node.exe" -e "if(process.stdout.isTTY)process.stdout.write('\n\x1b[1m OpenCode has closed. Next, send your entry:\x1b[0m\n  In this terminal, run: \x1b[1;7m py submit.py \x1b[0m\n  Your GitHub repo:  \x1b[1;36mhttps://github.com/WEBST3R99/1by22ec104-hwa-hackathon\x1b[0m\n  Your live site:    \x1b[1;36mhttps://1by22ec104-hwa-hackathon.vercel.app\x1b[0m\n  Use exactly these, on your hackathon page too.\n')"
