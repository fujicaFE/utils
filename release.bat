@echo off
REM 自动发布脚本 (Windows版本)
REM 使用方法: release.bat [patch|minor|major]

setlocal enabledelayedexpansion

REM 默认为 patch 版本更新
set VERSION_TYPE=%1
if "%VERSION_TYPE%"=="" set VERSION_TYPE=patch

echo 🚀 开始发布流程...

REM 检查工作目录是否干净
git status --porcelain > temp.txt
set /p STATUS=<temp.txt
del temp.txt

if not "%STATUS%"=="" (
    echo ❌ 工作目录不干净，请先提交或暂存更改
    exit /b 1
)

REM 切换到 main 分支
echo 📦 切换到 main 分支...
git checkout main
git pull origin main

REM 提交现有变更
echo 💾 提交现有变更...
git add -A
git status --porcelain --cached > temp_status.txt
set /p CACHED_STATUS=<temp_status.txt
del temp_status.txt
if not "%CACHED_STATUS%"=="" (
    git commit -m "chore: prepare for release"
    if errorlevel 1 (
        echo ℹ️  没有新的变更需要提交
    )
)

REM 运行测试
echo 🧪 运行测试...
call npm test
if errorlevel 1 (
    echo ❌ 测试失败
    exit /b 1
)

REM 构建项目
echo 🔨 构建项目...
call npm run generate
if errorlevel 1 (
    echo ❌ 构建失败
    exit /b 1
)

REM 更新版本号
echo 📈 更新版本号 (%VERSION_TYPE%)...
call npm version %VERSION_TYPE% --no-git-tag-version

REM 同步 README.md 版本号
echo 🔄 同步 README.md 版本号...
call npm run sync-version

REM 获取新版本号
for /f "delims=" %%i in ('node -p "require('./package.json').version"') do set NEW_VERSION=%%i
echo 🎉 新版本: v%NEW_VERSION%

REM 提交更改
echo 💾 提交更改...
git add package.json README.md
git commit -m "chore: bump version to v%NEW_VERSION%"

REM 推送到远程仓库
echo 🚀 推送到远程仓库...
git push origin main

echo ✅ 发布流程完成！
echo 📦 GitHub Actions 将自动发布到 NPM
echo 🔗 查看发布状态: https://github.com/fujicaFE/utils/actions

pause