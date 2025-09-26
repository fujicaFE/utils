#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class VersionSync {
  constructor() {
    this.packagePath = path.join(__dirname, '..', 'package.json');
    this.readmePath = path.join(__dirname, '..', 'README.md');
    this.currentVersion = null;
  }

  // 读取 package.json 版本
  readPackageVersion() {
    try {
      const packageJson = JSON.parse(fs.readFileSync(this.packagePath, 'utf8'));
      this.currentVersion = packageJson.version;
      return this.currentVersion;
    } catch (error) {
      throw new Error(`读取 package.json 失败: ${error.message}`);
    }
  }

  // 更新 README.md 中的版本号
  updateReadmeVersion() {
    try {
      let readmeContent = fs.readFileSync(this.readmePath, 'utf8');
      let hasChanges = false;

      // 1. 更新版本徽章
      const versionBadgeRegex = /(https:\/\/img\.shields\.io\/badge\/Version-)([\d\.]+)(-[^)]*)/g;
      const newReadmeContent = readmeContent.replace(versionBadgeRegex, (match, prefix, oldVersion, suffix) => {
        if (oldVersion !== this.currentVersion) {
          hasChanges = true;
          console.log(`🔄 版本徽章: ${oldVersion} -> ${this.currentVersion}`);
        }
        return `${prefix}${this.currentVersion}${suffix}`;
      });

      // 2. 更新其他可能的版本引用
      // 例如文档中的版本说明等
      const otherVersionRegex = /版本\s*[:：]\s*v?([\d\.]+)/gi;
      const finalContent = newReadmeContent.replace(otherVersionRegex, (match, oldVersion) => {
        if (oldVersion !== this.currentVersion) {
          hasChanges = true;
          console.log(`🔄 文档版本: ${oldVersion} -> ${this.currentVersion}`);
        }
        return match.replace(oldVersion, this.currentVersion);
      });

      if (hasChanges) {
        fs.writeFileSync(this.readmePath, finalContent, 'utf8');
        console.log(`✅ README.md 已更新到版本 ${this.currentVersion}`);
        return true;
      } else {
        console.log(`ℹ️  README.md 版本号已经是最新的 (${this.currentVersion})`);
        return false;
      }
    } catch (error) {
      throw new Error(`更新 README.md 失败: ${error.message}`);
    }
  }

  // 验证版本格式
  validateVersion() {
    const versionRegex = /^\d+\.\d+\.\d+(-[\w\.-]+)?$/;
    if (!versionRegex.test(this.currentVersion)) {
      throw new Error(`无效的版本格式: ${this.currentVersion}`);
    }
  }

  // 主执行函数
  async sync() {
    try {
      console.log('🚀 开始同步版本号...');
      
      // 读取当前版本
      this.readPackageVersion();
      console.log(`📦 当前版本: ${this.currentVersion}`);
      
      // 验证版本格式
      this.validateVersion();
      
      // 更新 README.md
      const updated = this.updateReadmeVersion();
      
      if (updated) {
        console.log('🎉 版本同步完成！');
      } else {
        console.log('📝 无需更新');
      }
      
    } catch (error) {
      console.error('❌ 同步失败:', error.message);
      process.exit(1);
    }
  }
}

// 执行同步
const sync = new VersionSync();
sync.sync();