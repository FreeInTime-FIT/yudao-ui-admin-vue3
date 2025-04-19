## Development Guidelines

### Framework and Language
> 项目基于 Vue 3、TypeScript、Element-Plus 和 Vite4，开发时需注意这些框架特性和最佳实践。

**Framework Considerations:**
- Version Compatibility: 确保所有依赖与 Vue 3.4+ 和 Element-Plus 2.8+ 版本兼容
- Feature Usage: 优先使用 Composition API 和 setup 语法糖，充分利用 Vue 3 的响应式系统
- Performance Patterns: 适当使用 `defineAsyncComponent` 进行组件懒加载，减少首屏加载时间
- Upgrade Strategy: 定期更新依赖，但需要谨慎处理重大版本更新
- Importance Notes for Framework: 
	* 使用 TypeScript 强类型系统保证代码质量
	* 项目使用 Pinia 作为状态管理方案，替代了 Vuex

**Language Best Practices:**
- Type Safety: 尽可能为所有变量、函数参数和返回值定义明确的类型
- Modern Features: 使用 ES6+ 特性如箭头函数、解构赋值等提高代码可读性
- Consistency: 使用项目约定的命名和代码风格
- Documentation: 对复杂业务逻辑和组件用法添加必要的注释

### Code Abstraction and Reusability
> 项目强调代码抽象和可复用性，开发前应先查找现有解决方案，避免重复造轮子。

**Modular Design Principles:**
- Single Responsibility: 每个组件或模块只负责单一功能
- High Cohesion, Low Coupling: 相关功能集中，减少模块间依赖
- Stable Interfaces: 对外暴露稳定接口，内部实现可以变化

**Reusable Component Library:**
```
src
- components // 公共组件
    - Form // 表单相关组件
    - Table // 表格相关组件
    - Icon // 图标组件
    - Editor // 富文本编辑器组件
- hooks // 可复用的组合式函数
    - useTable.ts // 表格相关逻辑
    - useForm.ts // 表单相关逻辑
    - useI18n.ts // 国际化相关逻辑
- utils // 工具函数
    - dateUtil.ts // 日期处理函数
    - formatter.ts // 格式化函数
    - auth.ts // 权限相关函数
```

### Coding Standards and Tools
**Code Formatting Tools:**
- ESLint (^8.57.0) // JavaScript/TypeScript 代码检查
- Prettier (^3.3.2) // 代码格式化
- StyleLint (^16.6.1) // CSS/SCSS 代码检查

**Naming and Structure Conventions:**
- 文件/目录命名: 使用 kebab-case (如 app-header.vue)
- 组件命名: 使用 PascalCase (如 AppHeader.vue)
- TypeScript 类型/接口: 使用 PascalCase (如 UserInfo)
- 变量/函数: 使用 camelCase (如 getUserInfo)
- 常量: 使用 UPPER_SNAKE_CASE (如 MAX_COUNT)
- CSS 类命名: 使用 kebab-case (如 .user-avatar)

### Frontend-Backend Collaboration Standards
**API Design and Documentation:**
- RESTful 设计原则
	* 使用 HTTP 方法 (GET, POST, PUT, DELETE) 表示操作
	* URL 使用资源名称的复数形式 (如 /users)
	* 使用查询参数进行过滤、排序和分页
- API 目录结构按模块划分
	* 所有 API 相关代码位于 src/api 目录下
	* 按业务模块划分子目录 (如 system, user 等)
	* 每个 API 文件暴露明确的接口和类型定义

**Data Flow:**
- 前端状态管理使用 Pinia
	* 按功能模块拆分 store
	* 使用 TypeScript 定义 state 类型
	* 适当使用持久化存储功能
- 数据校验同时在前端和后端实现
	* 前端使用表单验证提高用户体验
	* 后端必须实现严格的数据校验确保安全性
- 标准化异步操作处理
	* 使用 axios 拦截器统一处理请求/响应
	* 使用 Promise 或 async/await 处理异步流程

### Performance and Security
**Performance Optimization Focus:**
- 资源加载优化
	* 使用路由懒加载减少首屏加载时间
	* 使用 Vite 构建工具优化打包结果
	* 适当使用 CDN 加载第三方库
- 渲染性能优化
	* 大列表使用虚拟滚动
	* 合理使用 computed 和 watch
	* 避免不必要的组件重渲染
- 缓存策略
	* 合理使用浏览器缓存
	* API 请求结果缓存
	* Pinia 状态持久化

**Security Measures:**
- 输入验证和过滤
	* 所有用户输入进行验证和消毒
	* 使用 v-html 时注意 XSS 风险
- 敏感信息保护
	* 使用 HTTPS 传输数据
	* 敏感数据不直接存储在前端
- 访问控制机制
	* 基于角色的访问控制
	* 路由级别的权限控制
	* 按钮级别的权限控制