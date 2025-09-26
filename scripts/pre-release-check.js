#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class PreReleaseChecker {
  constructor() {
    this.errors = [];
    this.warnings = [];
  }

  log(emoji, message) {
    console.log(`${emoji} ${message}`);
  }

  error(message) {
    this.errors.push(message);
    console.error(`❌ ${message}`);
  }

  warning(message) {
    this.warnings.push(message);
    console.warn(`⚠️  ${message}`);
  }

  exec(command) {
    try {
      return execSync(command, { encoding: 'utf8' }).trim();
    } catch (error) {
      return null;
    }
  }

  checkNodeVersion() {
    const nodeVersion = process.version;
    const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
    
    if (majorVersion < 16) {
      this.warning(`Node.js 版本较低 (${nodeVersion})，建议使用 16+ 版本`);
    } else {
      this.log('✅', `Node.js 版本: ${nodeVersion}`);
    }
  }

  checkPackageJson() {
    try {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      
      // 检查必要字段
      const requiredFields = ['name', 'version', 'main', 'types'];
      requiredFields.forEach(field => {
        if (!packageJson[field]) {
          this.error(`package.json 缺少必要字段: ${field}`);
        }
      });

      // 检查版本格式
      const versionRegex = /^\d+\.\d+\.\d+$/;
      if (!versionRegex.test(packageJson.version)) {
        this.error(`版本号格式不正确: ${packageJson.version}`);
      }

      // 检查文件是否存在
      if (packageJson.main && !fs.existsSync(packageJson.main)) {
        this.warning(`主入口文件不存在: ${packageJson.main}`);
      }

      if (packageJson.types && !fs.existsSync(packageJson.types)) {
        this.warning(`类型定义文件不存在: ${packageJson.types}`);
      }

      this.log('✅', `package.json 检查通过`);
      
    } catch (error) {
      this.error(`无法读取 package.json: ${error.message}`);
    }
  }

  checkGitStatus() {
    const status = this.exec('git status --porcelain');
    if (status) {
      this.log('📝', '发现未提交的变更:');
      console.log(status);
      return false;
    } else {
      this.log('✅', '工作目录干净');
      return true;
    }
  }

  checkBranch() {
    const branch = this.exec('git branch --show-current');
    if (branch === 'main' || branch === 'master') {
      this.log('✅', `当前分支: ${branch}`);
    } else {
      this.warning(`当前分支不是主分支: ${branch}`);
    }
  }

  checkRemoteStatus() {
    try {
      const remotes = this.exec('git remote');
      if (!remotes) {
        this.warning('没有配置远程仓库');
        return;
      }
      const remoteList = remotes.split('\n').filter(r => r.trim());
      const remoteName = remoteList.includes('origin') ? 'origin' : (remoteList[0] || 'origin');
      this.exec(`git fetch ${remoteName}`);
      const status = this.exec('git status -uno');
      
      if (status.includes('Your branch is behind')) {
        this.warning('本地分支落后于远程分支，建议先拉取最新代码');
      } else if (status.includes('Your branch is ahead')) {
        this.warning('本地分支领先于远程分支，有未推送的提交');
      } else {
        this.log('✅', '本地分支与远程同步');
      }
    } catch (error) {
      this.warning('无法检查远程状态，请确保网络连接正常');
    }
  }

  runTests() {
    this.log('🧪', '运行测试...');
    const testResult = this.exec('npm test');
    if (testResult === null) {
      this.error('测试失败');
    } else {
      this.log('✅', '测试通过');
    }
  }

  runBuild() {
    this.log('🔨', '运行构建...');
    const buildResult = this.exec('npm run generate');
    if (buildResult === null) {
      this.error('构建失败');
    } else {
      this.log('✅', '构建成功');
    }
  }

  checkBuildOutput() {
    const distDir = './dist';
    if (!fs.existsSync(distDir)) {
      this.error('构建输出目录不存在: ./dist');
      return;
    }

    const files = fs.readdirSync(distDir);
    if (files.length === 0) {
      this.error('构建输出目录为空');
    } else {
      this.log('✅', `构建输出: ${files.join(', ')}`);
    }
  }

  generateReport() {
    console.log('\n📊 预发布检查报告:');
    console.log('='.repeat(50));
    
    if (this.errors.length === 0 && this.warnings.length === 0) {
      this.log('🎉', '所有检查通过，可以进行发布！');
    } else {
      if (this.errors.length > 0) {
        console.log('\n❌ 错误 (必须修复):');
        this.errors.forEach((error, index) => {
          console.log(`  ${index + 1}. ${error}`);
        });
      }

      if (this.warnings.length > 0) {
        console.log('\n⚠️  警告 (建议修复):');
        this.warnings.forEach((warning, index) => {
          console.log(`  ${index + 1}. ${warning}`);
        });
      }

      if (this.errors.length > 0) {
        console.log('\n🚫 由于存在错误，不建议进行发布');
        process.exit(1);
      } else {
        console.log('\n⚡ 存在警告，但可以继续发布');
      }
    }
  }

  async run() {
    this.log('🔍', '开始预发布检查...');
    
    this.checkNodeVersion();
    this.checkPackageJson();
    this.checkGitStatus();
    this.checkBranch();
    this.checkRemoteStatus();
    this.runTests();
    this.runBuild();
    this.checkBuildOutput();
    
    this.generateReport();
  }
}

// 执行检查
const checker = new PreReleaseChecker();
checker.run();