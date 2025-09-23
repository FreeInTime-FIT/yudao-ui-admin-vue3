## 若依管理系统 Vue3 版本 (init from readme/docs)

> 基于 Vue3、Vite4、Element-Plus、TypeScript 的前端解决方案

> 本项目是若依管理系统的前端部分，是一套完整的企业级中后台管理系统解决方案

> 项目状态：活跃开发中

> 项目团队：若依开源团队

> 框架/语言：Vue3, TypeScript, Vite4, Element-Plus, Pinia



## Dependencies (init from programming language specification like package.json, requirements.txt, etc.)

* vue (3.4.21): Vue.js 3 核心框架
* vue-router (^4.4.0): Vue 官方路由管理器
* pinia (^2.1.7): Vue 官方状态管理库
* pinia-plugin-persistedstate (^3.2.1): Pinia 持久化插件
* element-plus (2.8.3): 基于 Vue 3 的 UI 组件库
* axios (^1.7.2): 基于 Promise 的 HTTP 客户端
* echarts (^5.5.1): 数据可视化图表库
* @vueuse/core (^10.11.0): Vue Composition API 实用工具集
* dayjs (^1.11.11): 轻量级日期处理库
* lodash-es (^4.17.21): JavaScript 实用工具库
* crypto-js (^4.2.0): 加密库
* mitt (^3.0.1): 简单的事件发射器/订阅库
* monaco-editor (^0.50.0): 代码编辑器


## Development Environment

> 开发环境要求:
> - Node.js >= 16.0.0
> - PNPM >= 8.6.0

开发相关命令:
* `pnpm i`: 安装依赖
* `pnpm dev`: 启动开发服务器
* `pnpm build:prod`: 构建生产环境
* `pnpm lint:eslint`: 运行 ESLint 代码检查
* `pnpm lint:format`: 使用 Prettier 格式化代码
* `pnpm lint:style`: 使用 Stylelint 检查样式


## Structure (init from project tree)

> 项目结构说明

```
root
- .editorconfig // 编辑器配置文件，统一代码格式
- .env // 环境变量配置文件
- .env.dev // 开发环境变量配置文件
- .env.prod // 生产环境变量配置文件
- .env.stage // 预发布环境变量配置文件
- .env.test // 测试环境变量配置文件
- .eslintignore // ESLint 忽略配置
- .eslintrc-auto-import.json // ESLint 自动导入配置
- .eslintrc.js // ESLint 配置文件
- .gitignore // Git 忽略文件配置
- .image // 项目相关图片资源目录
- .prettierignore // Prettier 忽略配置
- .stylelintignore // StyleLint 忽略配置
- LICENSE // 项目许可证
- build // 构建相关脚本
    - api.js // API 构建脚本
    - vite // Vite 配置目录
        - index.ts // Vite 主配置
        - optimize.ts // Vite 优化配置
- depoly.sh // 部署脚本
- index.html // 项目入口 HTML 文件
- package.json // 项目依赖配置
- pnpm-lock.yaml // PNPM 锁定文件
- postcss.config.js // PostCSS 配置
- prettier.config.js // Prettier 配置
- public // 静态资源目录
- src // 源代码目录
    - App.vue // 应用主组件
    - api // API 接口定义目录
        - bpm // 业务流程管理接口
        - crm // 客户关系管理接口
        - erp // 企业资源计划接口
        - infra // 基础设施接口
        - iot // 物联网接口
        - login // 登录接口
        - mall // 商城接口
        - member // 会员接口
        - mp // 微信公众平台接口
        - pay // 支付接口
        - system // 系统管理接口
    - assets // 静态资源目录
        - imgs // 图片资源
        - map // 地图相关资源
        - svgs // SVG 图标
    - components // 公共组件
        - AppLinkInput // 应用链接输入组件
        - Backtop // 回到顶部组件
        - Card // 卡片组件
        - ColorInput // 颜色输入组件
        - ConfigGlobal // 全局配置组件
        - ContentDetailWrap // 内容详情包装组件
        - ContentWrap // 内容包装组件
        - CountTo // 数字动画组件
        - Crontab // Cron 表达式组件
        - Cropper // 图片裁剪组件
        - Descriptions // 描述列表组件
        // ... 其他组件
    - directives // 自定义指令
    - hooks // 组合式函数
    - layout // 布局相关组件
    - locales // 国际化资源
    - plugins // 插件
    - router // 路由配置
    - store // 状态管理
    - styles // 全局样式
    - utils // 工具函数
    - views // 页面视图组件
        - screen
          - data
            - realtime_fork.vue // 使用静态数据渲染的实时大屏数据页（已移除接口轮询）
```
