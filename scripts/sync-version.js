#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 读取 package.json 获取当前版本
const packagePath = path.join(__dirname, '..', 'package.json');
const readmePath = path.join(__dirname, '..', 'README.md');

try {
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const currentVersion = packageJson.version;
  
  console.log(`📦 当前版本: ${currentVersion}`);
  
  // 读取 README.md
  let readmeContent = fs.readFileSync(readmePath, 'utf8');
  
  // 替换版本徽章中的版本号
  const versionBadgeRegex = /(https:\/\/img\.shields\.io\/badge\/Version-)([\d\.]+)(-[^)]*\.svg)/g;
  
  const updatedContent = readmeContent.replace(versionBadgeRegex, (match, prefix, oldVersion, suffix) => {
    console.log(`🔄 发现版本徽章: ${oldVersion} -> ${currentVersion}`);
    return `${prefix}${currentVersion}${suffix}`;
  });
  
  // 检查是否有变更
  if (readmeContent !== updatedContent) {
    fs.writeFileSync(readmePath, updatedContent, 'utf8');
    console.log(`✅ README.md 版本号已更新为 ${currentVersion}`);
  } else {
    console.log(`ℹ️  README.md 版本号已经是最新的`);
  }
  
  // 生成文档
  console.log('📚 生成最新文档...');
  try {
    execSync('npm run docs', { stdio: 'inherit' });
    console.log('✅ 文档生成完成');
  } catch (error) {
    console.warn('⚠️  文档生成失败:', error.message);
  }
  
} catch (error) {
  console.error('❌ 同步版本号失败:', error.message);
  process.exit(1);
}