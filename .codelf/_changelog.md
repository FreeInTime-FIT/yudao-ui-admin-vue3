## 2025-09-23 00:00:00

### 1. 屏幕实时页改为静态数据渲染

**变更类型**: refactor

> **目的**: 取消接口依赖，使用静态数据演示渲染
> **详细描述**: 去除 `getPanelData` 与 `page` 请求、清除轮询与监听，新增静态 `keyValue` 与 `warningData` 并在 `onMounted` 初始化
> **变更原因**: 需求切换为本地静态数据渲染
> **影响范围**: 仅 `src/views/screen/data/realtime_fork.vue`
> **API变更**: 无
> **配置变更**: 无
> **性能影响**: 移除轮询后减少请求压力

   ```
   src
   - views    // refactor 页面视图
     - screen
       - data
         - realtime_fork.vue // refactor 改为静态数据，删除接口与轮询
   ```

### 2. 适配1920*1080屏幕尺寸布局

**变更类型**: improvement

> **目的**: 优化大屏显示效果，充分利用屏幕空间
> **详细描述**: 调整整体布局为全屏高度，centerBg图片和右侧数据区域均拉长适配1920*1080分辨率
> **变更原因**: 用户屏幕尺寸为1920*1080，需要充分利用屏幕空间
> **影响范围**: 仅 `src/views/screen/data/realtime_fork.vue` 布局样式
> **API变更**: 无
> **配置变更**: 无
> **性能影响**: 无

   ```
   src
   - views    // improvement 页面视图
     - screen
       - data
         - realtime_fork.vue // improvement 适配1920*1080屏幕布局
   ```

### 3. 数据看板页改为静态数据渲染

**变更类型**: refactor

> **目的**: 取消接口依赖，使用静态数据演示渲染
> **详细描述**: 去除 `getPanelData` 与 `getLatestPrice` 请求、清除轮询与监听，新增静态数据定义并在 `onMounted` 初始化
> **变更原因**: 需求切换为本地静态数据渲染
> **影响范围**: 仅 `src/views/screen/data/boardView_fork.vue`
> **API变更**: 无
> **配置变更**: 无
> **性能影响**: 移除轮询后减少请求压力

   ```
   src
   - views    // refactor 页面视图
     - screen
       - data
         - boardView_fork.vue // refactor 改为静态数据，删除接口与轮询
   ```

### 4. 适配电池区域间距（1920x1080）

**变更类型**: improvement

> **目的**: 在1920x1080下提升右侧电池模块可读性
> **详细描述**: 为电池容器新增类 `battery-list` 与条目类 `battery-item`，增加顶部内边距与条目上下间距
> **影响范围**: 仅 `src/views/screen/data/boardView_fork.vue` 样式
> **API变更**: 无
> **配置变更**: 无
> **性能影响**: 无

``` 
src
- views
  - screen
    - data
      - boardView_fork.vue // improvement 电池区域间距优化（battery-list/battery-item）
```

### 变更检查清单

- [x] 代码遵循项目编码规范
- [x] 所有 TypeScript 类型定义完整
- [x] 文档已更新（codelf）

### 变更检查清单

- [ ] 代码遵循项目编码规范
- [ ] 所有 TypeScript 类型定义完整
- [ ] 添加了适当的单元测试（如适用）
- [ ] 文档已更新（如适用）
- [ ] 代码审查已完成
- [ ] 所有依赖项版本兼容
- [ ] 权限控制已适当配置
- [ ] 国际化文本已添加（如适用）