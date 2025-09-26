#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class ReleaseManager {
  constructor() {
    this.versionType = process.argv[2] || 'patch';
    this.validTypes = ['patch', 'minor', 'major'];
  }

  log(emoji, message) {
    console.log(`${emoji} ${message}`);
  }

  error(message) {
    console.error(`❌ ${message}`);
    process.exit(1);
  }

  exec(command, description) {
    try {
      this.log('⚡', description || command);
      const result = execSync(command, { encoding: 'utf8', stdio: 'inherit' });
      return result;
    } catch (error) {
      this.error(`执行失败: ${command}\n${error.message}`);
    }
  }

  execSilent(command) {
    try {
      return execSync(command, { encoding: 'utf8' }).trim();
    } catch (error) {
      return '';
    }
  }

  checkGitRepo() {
    const isGitRepo = this.execSilent('git rev-parse --is-inside-work-tree');
    if (isGitRepo !== 'true') {
      this.error('当前目录不是 Git 仓库');
    }
  }

  checkGitStatus() {
    const status = this.execSilent('git status --porcelain');
    if (status) {
      this.log('📝', '发现未提交的变更:');
      console.log(status);
      return true;
    }
    return false;
  }

  getCurrentBranch() {
    return this.execSilent('git branch --show-current');
  }

  getCurrentVersion() {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    return packageJson.version;
  }

  async checkVersionPublished(version) {
    try {
      const result = this.execSilent(`npm view @fujica/utils@${version} version`);
      return result === version;
    } catch (error) {
      return false;
    }
  }

  validateVersionType() {
    if (!this.validTypes.includes(this.versionType)) {
      this.error(`无效的版本类型: ${this.versionType}. 支持的类型: ${this.validTypes.join(', ')}`);
    }
  }

  commitExistingChanges() {
    const hasChanges = this.checkGitStatus();
    if (hasChanges) {
      this.log('💾', '提交现有变更...');
      this.exec('git add -A', '暂存所有变更');
      
      try {
        this.exec('git commit -m "chore: prepare for release"', '提交变更');
      } catch (error) {
        this.log('ℹ️', '没有新的变更需要提交');
      }
    } else {
      this.log('✅', '工作目录干净，无需提交');
    }
  }

  runTests() {
    this.log('🧪', '运行测试...');
    this.exec('npm test', '执行测试套件');
  }

  buildProject() {
    this.log('🔨', '构建项目...');
    this.exec('npm run generate', '生成构建产物');
  }

  async updateVersion() {
    const currentVersion = this.getCurrentVersion();
    
    // 检查当前版本是否已发布
    const isPublished = await this.checkVersionPublished(currentVersion);
    
    if (isPublished) {
      this.log('📈', `更新版本号 (${this.versionType}): ${currentVersion} -> ?`);
      this.exec(`npm version ${this.versionType} --no-git-tag-version`, '更新版本号');
      const newVersion = this.getCurrentVersion();
      this.log('🎉', `版本更新完成: ${currentVersion} -> ${newVersion}`);
      return newVersion;
    } else {
      this.log('ℹ️', `当前版本 ${currentVersion} 尚未发布，跳过版本更新`);
      return currentVersion;
    }
  }

  syncVersionInFiles() {
    this.log('🔄', '同步版本号到其他文件...');
    this.exec('npm run sync-version', '同步版本号');
  }

  commitVersionChanges(newVersion) {
    this.log('💾', '提交版本变更...');
    this.exec('git add package.json README.md docs/', '暂存版本文件和文档');
    this.exec(`git commit -m "chore: bump version to v${newVersion} and update docs"`, '提交版本变更和文档');
  }

  pushToRemote() {
    const currentBranch = this.getCurrentBranch();
    const remotes = this.execSilent('git remote').split('\n').filter(r => r.trim());
    const remoteName = remotes.includes('origin') ? 'origin' : (remotes[0] || 'origin');
    this.log('🚀', `推送到远程仓库 (${remoteName}/${currentBranch})...`);
    this.exec(`git push ${remoteName} ${currentBranch}`, '推送变更');
  }

  showSummary(newVersion) {
    this.log('✅', '发布流程完成！');
    console.log('');
    console.log('📊 发布摘要:');
    console.log(`   🏷️  新版本: v${newVersion}`);
    console.log(`   🌿 分支: ${this.getCurrentBranch()}`);
    console.log(`   📦 GitHub Actions 将自动发布到 NPM`);
    console.log(`   🔗 查看状态: https://github.com/fujicaFE/utils/actions`);
  }

  async run() {
    try {
      this.log('🚀', `开始发布流程 (${this.versionType})...`);
      
      // 验证参数
      this.validateVersionType();
      
      // 检查环境
      this.checkGitRepo();
      
      // 提交现有变更
      this.commitExistingChanges();
      
      // 切换到主分支（可选）
      const currentBranch = this.getCurrentBranch();
      if (currentBranch !== 'main' && currentBranch !== 'master') {
        this.log('⚠️', `当前分支: ${currentBranch}，建议在 main/master 分支发布`);
      }
      
      // 拉取最新代码
      this.log('📥', '拉取最新代码...');
      const remotes = this.execSilent('git remote').split('\n').filter(r => r.trim());
      const remoteName = remotes.includes('origin') ? 'origin' : (remotes[0] || 'origin');
      this.log('🔗', `使用远程仓库: ${remoteName}`);
      this.exec(`git pull ${remoteName} ${currentBranch}`, '更新本地代码');
      
      // 运行测试
      this.runTests();
      
      // 构建项目
      this.buildProject();
      
      // 更新版本
      const newVersion = await this.updateVersion();
      
      // 同步版本号
      this.syncVersionInFiles();
      
      // 提交版本变更
      this.commitVersionChanges(newVersion);
      
      // 推送到远程
      this.pushToRemote();
      
      // 显示摘要
      this.showSummary(newVersion);
      
    } catch (error) {
      this.error(`发布失败: ${error.message}`);
    }
  }
}

// 显示帮助信息
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
🚀 智能发布脚本

用法: node scripts/release.js [版本类型]

版本类型:
  patch   补丁版本 (1.1.6 -> 1.1.7) - 默认
  minor   次要版本 (1.1.6 -> 1.2.0)
  major   主要版本 (1.1.6 -> 2.0.0)

示例:
  node scripts/release.js patch
  node scripts/release.js minor
  node scripts/release.js major

功能特性:
  ✅ 自动提交现有变更
  ✅ 运行测试和构建
  ✅ 智能版本检查（已发布版本才更新）
  ✅ 同步 README.md 版本和生成文档
  ✅ 提交并推送到远程
  ✅ 触发 GitHub Actions 自动发布
`);
  process.exit(0);
}

// 执行发布
const releaseManager = new ReleaseManager();
releaseManager.run();