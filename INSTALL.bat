@echo off
REM سكريبت تثبيت تلقائي لنظام بناء التقارير الديناميكي (Windows)
REM Dynamic Report Builder - Auto Install Script for Windows

echo.
echo 🚀 بدء تثبيت نظام بناء التقارير الديناميكي...
echo.

REM التحقق من Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js غير مثبت!
    echo 📥 يرجى تثبيت Node.js 18.x أو أحدث من https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo ✅ Node.js مثبت: %NODE_VERSION%

REM التحقق من npm
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ npm غير مثبت!
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
echo ✅ npm مثبت: %NPM_VERSION%
echo.

REM تنظيف الكاش
echo 🧹 تنظيف كاش npm...
call npm cache clean --force

REM حذف node_modules القديم إن وجد
if exist "node_modules" (
    echo 🗑️  حذف node_modules القديم...
    rmdir /s /q node_modules
)

REM حذف package-lock.json القديم إن وجد
if exist "package-lock.json" (
    echo 🗑️  حذف package-lock.json القديم...
    del /f package-lock.json
)

echo.
echo 📦 تثبيت المكتبات... (قد يستغرق بضع دقائق)
echo.

REM تثبيت المكتبات
call npm install

REM التحقق من نجاح التثبيت
if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ تم التثبيت بنجاح!
    echo.
    echo 🎉 جاهز للاستخدام!
    echo.
    echo لتشغيل المشروع، استخدم:
    echo    npm run dev
    echo.
    echo ثم افتح المتصفح على:
    echo    http://localhost:3000
    echo.
) else (
    echo.
    echo ❌ فشل التثبيت!
    echo.
    echo 💡 جرب الحلول التالية:
    echo    1. npm cache clean --force
    echo    2. تحقق من اتصال الإنترنت
    echo    3. شغّل Terminal كمسؤول
    echo.
)

pause

