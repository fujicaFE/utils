### Introduction

![image](https://img.shields.io/badge/Version-1.1.3-green.svg)

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