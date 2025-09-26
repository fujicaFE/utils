# 版本同步说明

本项目实现了 `package.json` 和 `README.md` 之间的版本号自动同步。

## 🔧 同步机制

### 自动同步触发时机：
1. **发布新版本时** - 使用 `npm run release:patch/minor/major` 时自动同步
2. **GitHub Actions** - 在自动发布流程中同步
3. **手动同步** - 运行 `npm run sync-version`

### 同步内容：
- README.md 中的版本徽章：`https://img.shields.io/badge/Version-x.x.x-green.svg`
- 其他可能的版本引用

## 📝 使用方法

### 1. 手动同步版本号
```bash
npm run sync-version
```

### 2. 发布新版本（自动同步）
```bash
# 发布补丁版本 (1.1.6 -> 1.1.7)
npm run release:patch

# 发布次要版本 (1.1.6 -> 1.2.0)  
npm run release:minor

# 发布主要版本 (1.1.6 -> 2.0.0)
npm run release:major
```

### 3. 使用发布脚本（推荐）
```bash
# Linux/Mac
./release.sh patch

# Windows
release.bat patch
```

## 🛠️ 技术实现

### 脚本文件：
- `scripts/sync-version.js` - 基础版本同步脚本
- `scripts/sync-version-advanced.js` - 增强版本同步脚本

### 同步逻辑：
1. 读取 `package.json` 中的版本号
2. 使用正则表达式查找并替换 README.md 中的版本引用
3. 检查是否有变更并输出结果

### 集成点：
- **package.json scripts** - `postversion` 钩子自动触发
- **GitHub Actions** - 发布流程中包含版本同步步骤
- **发布脚本** - 本地发布时自动同步

## 🔍 验证同步结果

同步完成后，可以检查：
1. README.md 中的版本徽章是否更新
2. Git 状态是否包含 README.md 的变更
3. 控制台输出的同步日志

## ⚠️ 注意事项

1. **版本格式** - 确保 package.json 中的版本遵循 semver 格式 (x.y.z)
2. **文件路径** - 脚本假设在项目根目录执行
3. **权限问题** - 确保脚本有读写 README.md 的权限
4. **备份** - 重要变更前建议备份文件

## 🐛 故障排除

### 常见问题：

1. **脚本执行失败**
   - 检查 Node.js 是否安装
   - 确认在正确的目录执行

2. **版本未同步**
   - 检查 README.md 中版本徽章的格式
   - 查看控制台错误信息

3. **权限错误**
   - 确保对文件有写入权限
   - Windows 用户可能需要管理员权限

如有问题，请查看控制台输出的详细错误信息。