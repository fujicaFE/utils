### Introduction

![image](https://img.shields.io/badge/Version-1.1.8-green.svg)
[![CI](https://github.com/fujicaFE/utils/actions/workflows/ci.yml/badge.svg)](https://github.com/fujicaFE/utils/actions/workflows/ci.yml)
[![NPM Publish](https://github.com/fujicaFE/utils/actions/workflows/publish-npm.yml/badge.svg)](https://github.com/fujicaFE/utils/actions/workflows/publish-npm.yml)
[![npm version](https://img.shields.io/npm/v/@fujica/utils.svg)](https://www.npmjs.com/package/@fujica/utils)

A modern JavaScript/Typescript utility library

## Utils

### 基础部分
|  name    |  description                    |   test    |
|:---------|:--------------------------------|:---------:|
|  Calc  | 📌 高精度四则运算 |  &nbsp;✅  |
|  typeOf  | 📌 js类型判定  |  &nbsp;✅  |
|  PadZero  | 📌 小于十的数字补0  |  &nbsp;✅  |

### 业务部分
|  name    |  description                    |   test    |
|:---------|:--------------------------------|:---------:|
|  Reg  | 📌 常用正则校验（手机，姓名，身份证等...） |  &nbsp;✅  |
|  Format  | 📌 常用格式化（金额，时间等...） |  &nbsp;✅  |
|  DICT_CODE  | 📌 常用字典编号 |  &nbsp;✅  |
|  WebSocket  | 📌 支持心跳包的Websocket类 |  &nbsp;✅  |

### Docs 📖

详细用法见文档 https://fujicafe.github.io/utils/modules.html

GIT https://github.com/fujicaFE/utils

本地调试 - 软链
工具库目录下执行 `npm run build & npm link`
项目目录下执行`npm link @fujica/utils`

### How to use

```bash
npm install @fujica/utils
```

```ts
import { typeOf } from "@fujica/utils"
console.log(typeOf("123")) // String
```

## 自动化发布

本项目使用 GitHub Actions 进行自动化构建和发布：

### CI 构建
- 每次推送到 `main` 或 `develop` 分支时自动运行测试和构建
- 支持 Node.js 16、18、20 多版本测试
- 自动生成文档和构建产物

### NPM 自动发布
- 当 `package.json` 中的版本号发生变化并推送到 `main` 分支时，自动发布到 NPM
- 自动创建 GitHub Release
- 需要配置 `NPM_TOKEN` secrets

### 版本同步
项目实现了 `package.json` 和 `README.md` 版本号的自动同步：
- 使用 `npm run sync-version` 手动同步版本号
- 发布流程中自动同步版本号  
- 支持版本徽章和文档中版本引用的同步
- 详细说明请查看 [VERSION_SYNC.md](./docs/VERSION_SYNC.md)

### 快速发布
```bash
# 使用发布脚本（推荐）
./release.sh patch    # 补丁版本 1.1.6 -> 1.1.7
./release.sh minor    # 次要版本 1.1.6 -> 1.2.0
./release.sh major    # 主要版本 1.1.6 -> 2.0.0

# 或使用 npm 命令
npm run release:patch
npm run release:minor
npm run release:major
```
