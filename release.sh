#!/bin/bash

# 自动发布脚本
# 使用方法: ./release.sh [patch|minor|major]

set -e

# 默认为 patch 版本更新
VERSION_TYPE=${1:-patch}

echo "🚀 开始发布流程..."

# 检查工作目录是否干净
if [[ -n $(git status -s) ]]; then
    echo "❌ 工作目录不干净，请先提交或暂存更改"
    exit 1
fi

# 切换到 main 分支
echo "📦 切换到 main 分支..."
git checkout main
git pull origin main

# 提交现有变更
echo "💾 提交现有变更..."
git add -A
if [[ -n $(git status --porcelain --cached) ]]; then
    git commit -m "chore: prepare for release" || echo "ℹ️  没有新的变更需要提交"
fi

# 运行测试
echo "🧪 运行测试..."
npm test

# 构建项目
echo "🔨 构建项目..."
npm run generate

# 更新版本号
echo "📈 更新版本号 ($VERSION_TYPE)..."
npm version $VERSION_TYPE --no-git-tag-version

# 同步 README.md 版本号
echo "🔄 同步 README.md 版本号..."
npm run sync-version

# 获取新版本号
NEW_VERSION=$(node -p "require('./package.json').version")
echo "🎉 新版本: v$NEW_VERSION"

# 提交更改
echo "💾 提交更改..."
git add package.json README.md
git commit -m "chore: bump version to v$NEW_VERSION"

# 推送到远程仓库
echo "🚀 推送到远程仓库..."
git push origin main

echo "✅ 发布流程完成！"
echo "📦 GitHub Actions 将自动发布到 NPM"
echo "🔗 查看发布状态: https://github.com/fujicaFE/utils/actions"