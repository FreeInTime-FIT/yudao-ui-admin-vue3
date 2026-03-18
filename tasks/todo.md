# 任务清单

- [x] 梳理 villa-power 中间大图替换范围，确认 3D 模型文件与目标交互
- [x] 先写 3D 场景切换/可点击节点匹配的失败测试
- [x] 引入 3D Viewer 组件并接入 `zhengti.glb` / `biandian.glb`
- [x] 将 `villaPower.vue` 中间静态图替换为 3D 视图，补返回按钮与加载/错误态
- [x] 运行测试、类型检查、构建验证

## Review
- 已新增 `VillaModelViewer`，默认加载 `/models/villa-power/zhengti.glb`，点击命中 `变电房.glb` 节点后切到 `/models/villa-power/biandian.glb`，并在右上角显示“返回整体”按钮。
- 已新增 `VillaModelViewer.config.ts`，把场景配置与可点击节点匹配逻辑独立出来，便于后续按模型节点名扩展。
- 已补 `tests/villa-model-viewer.test.ts`；执行 `node --experimental-strip-types --test tests/villa-model-viewer.test.ts` 通过（4/4）。
- 已执行 `npx eslint src/views/screen/components/VillaModelViewer.vue src/views/screen/components/VillaModelViewer.config.ts src/views/screen/data/villaPower.vue tests/villa-model-viewer.test.ts`，通过。
- 全量 `pnpm ts:check` 未通过，阻塞点是仓库既有 `src/types/auto-components.d.ts` 大量语法错误，并非本次新增文件首次引入。
- 全量 `pnpm build:local` 未通过，阻塞点是仓库既有 `src/components/Table/src/Table.vue:59` 的 `vue/no-ref-as-operand` lint 错误，并非本次 3D 改动导致。

## 2026-03-18 启动故障排查
- [x] 确认 `pnpm dev` 的真实故障症状（进程、端口、页面响应、浏览器侧错误）
- [x] 定位根因并评估是否存在设计层诱因
- [x] 进行最小修复并补充必要验证
- [x] 回填 Review，记录证据与后续建议

## Review（2026-03-18 启动故障排查）
- `pnpm dev` 本身已成功启动 Vite；`curl http://127.0.0.1:80/` 返回 `200 OK`，终端里的 Sass / `:deep` 输出均为弃用警告，不是启动失败根因。
- 真正阻断页面的是浏览器运行时错误：Chrome 控制台报 `A route named "Redirect" has been added as a child of a route with the same name`，导致应用停在初始加载态。
- 根因位于 `src/router/modules/remaining.ts`：`/redirect` 父路由和其子路由同时使用了 `name: 'Redirect'`。当前锁文件升级后实际安装的是 `vue-router 4.6.4`，该版本对重复嵌套路由名校验更严格，把这个历史配置问题暴露为运行时错误。
- 已按最少修改原则删除 `/redirect` 父路由的 `name`，保留真正跳转页子路由的 `name: 'Redirect'`，避免重复名称。
- 已新增 `tests/router-remaining-route-name.test.mjs`，先验证失败（命中 `Redirect -> Redirect`），再在修复后执行 `node --test tests/router-remaining-route-name.test.mjs` 通过。
- 浏览器复验：`http://127.0.0.1:80/` 与 `http://127.0.0.1:81/` 均可进入登录页，重复路由名错误已消失。
- 当前仍存在独立问题：登录页会请求 `http://120.26.61.213:84/admin-api/system/captcha/get` 并触发 CORS 报错，这是后端跨域/环境配置问题，不属于本次“页面起不来”的直接根因。

## 2026-03-18 3D 点击命中修正
- [x] 复现并确认“右下角变电房点击无效”的真实症状
- [x] 核对 `zhengti.glb` 节点层级，定位实际可点击根节点
- [x] 先补失败测试，再修正点击命中配置
- [x] 重新执行定向测试与 lint 验证

## Review（2026-03-18 3D 点击命中修正）
- 直接原因：`VillaModelViewer.config.ts` 把整体模型的可点击节点只配置成了 `变电房.glb`，而用户实际点击的右下角完整小房子根节点是 `biandian.glb`。
- 证据：静态解析 `zhengti.glb` 后发现 `变电房.glb` 仅包含 2 个 mesh，而 `biandian.glb` 包含 9 个 mesh，更符合右下角完整对象；因此之前点击右下角对象时，祖先链里没有命中配置节点名。
- 设计层诱因：未发现明显系统设计缺陷，但接入时只依据单个节点名做了假设，没有对“多个相近外部引用节点”做层级核对。
- 当前修复：将默认可点击节点改为 `['biandian.glb', '变电房.glb']`，优先命中右下角真实对象，同时保留别名兼容。
- 验证：`node --experimental-strip-types --test tests/villa-model-viewer.test.ts` 通过（6/6）；`npx eslint src/views/screen/components/VillaModelViewer.vue src/views/screen/components/VillaModelViewer.config.ts src/views/screen/data/villaPower.vue tests/villa-model-viewer.test.ts` 通过。
- 长期建议：以后接 3D drill-down 时，先导出目标节点树与 mesh 数量/包围盒，再确定热点命名，不要只凭名称直觉绑定。

## 2026-03-18 3D 点击无反应（二次修正）
- [x] 复现“点右下角变电房无反应”的实际浏览器行为
- [x] 记录射线命中结果，确认是否已打到右下角对象
- [x] 先写失败测试，再修正节点名归一化逻辑
- [x] 用浏览器再次验证点击进入与返回整体

## Review（2026-03-18 3D 点击无反应（二次修正））
- 直接原因：Three 运行时对象名会把 `.glb` 里的点号去掉，例如射线命中祖先链里实际出现的是 `biandianglb`，不是配置里写的 `biandian.glb`；因此之前虽然射线已经命中了右下角对象，但节点名比对失败，表现为“点击无反应”。
- 证据：浏览器内对挂载后的真实 Viewer 做网格采样，右下角区域可稳定打到 `Box385 / Box398 / Box399 / Box476 / Shape164 -> Group001_2 -> biandianglb` 这条祖先链；修复前点击该区域不会出现“返回整体”按钮，修复后点击坐标约 `(720, 510)` 可稳定进入局部模型。
- 设计层诱因：未发现明显系统设计缺陷，但第一次接入时把“离线 glTF JSON 中的节点名”直接等同于“Three 运行时命中的对象名”，缺少对运行时名称规范化差异的验证。
- 当前修复：`normalizeNodeName` 改为在小写化后移除非字母/数字/中文/下划线/短横线字符，使 `biandian.glb -> biandianglb`、`变电房.glb -> 变电房glb`，从而兼容运行时名称。
- 验证：
  - `node --experimental-strip-types --test tests/villa-model-viewer.test.ts` 通过（8/8）
  - `npx eslint src/views/screen/components/VillaModelViewer.vue src/views/screen/components/VillaModelViewer.config.ts src/views/screen/data/villaPower.vue tests/villa-model-viewer.test.ts` 通过
  - 浏览器实测：挂载 Viewer 后点击右下角区域，出现“返回整体”；再点击“返回整体”，按钮消失并回到整体模型。
- 长期建议：以后接 3D 点击热点时，除了看原始 glTF 节点名，还要核对 Three 运行时祖先链里的实际对象名，避免被 loader 命名规范化坑到。

## 2026-03-18 提交整理
- [x] 收敛 `pnpm-lock.yaml` 为最小差异，仅保留 `three` 依赖变更
- [x] 重新执行路由修复测试与 3D 功能测试/lint
- [x] 整理提交范围，排除仓库根目录未跟踪原始 glb 文件
