@echo off
setlocal
cd /d "%~dp0"
set "CODEX_ASSETS_PY=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
if exist "%CODEX_ASSETS_PY%" goto bundled
where py >nul 2>&1
if not errorlevel 1 goto launcher
where python >nul 2>&1
if not errorlevel 1 goto regular
echo Python nao foi encontrado. Abra o Site no Codex para publicar as imagens.
goto done
:bundled
"%CODEX_ASSETS_PY%" "scripts\publicar_imagens.py"
goto done
:launcher
py -3 "scripts\publicar_imagens.py"
goto done
:regular
python "scripts\publicar_imagens.py"
:done
echo.
pause
endlocal
