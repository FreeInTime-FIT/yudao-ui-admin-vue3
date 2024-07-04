declare namespace APITypes {
  type ApiAccessLogRespVO = {
    /** 日志主键 */
    id: number;
    /** 链路追踪编号 */
    traceId: string;
    /** 用户编号 */
    userId: number;
    /** 用户类型，参见 UserTypeEnum 枚举 */
    userType: number;
    /** 应用名 */
    applicationName: string;
    /** 请求方法名 */
    requestMethod: string;
    /** 请求地址 */
    requestUrl: string;
    /** 请求参数 */
    requestParams?: string;
    /** 响应结果 */
    responseBody?: string;
    /** 用户 IP */
    userIp: string;
    /** 浏览器 UA */
    userAgent: string;
    /** 操作模块 */
    operateModule: string;
    /** 操作名 */
    operateName: string;
    /** 操作分类 */
    operateType: number;
    /** 开始请求时间 */
    beginTime: string;
    /** 结束请求时间 */
    endTime: string;
    /** 执行时长 */
    duration: number;
    /** 结果码 */
    resultCode: number;
    /** 结果提示 */
    resultMsg?: string;
    /** 创建时间 */
    createTime: string;
  };

  type ApiErrorLogRespVO = {
    /** 编号 */
    id: number;
    /** 链路追踪编号 */
    traceId: string;
    /** 用户编号 */
    userId: number;
    /** 用户类型 */
    userType: number;
    /** 应用名 */
    applicationName: string;
    /** 请求方法名 */
    requestMethod: string;
    /** 请求地址 */
    requestUrl: string;
    /** 请求参数 */
    requestParams: string;
    /** 用户 IP */
    userIp: string;
    /** 浏览器 UA */
    userAgent: string;
    /** 异常发生时间 */
    exceptionTime: string;
    /** 异常名 */
    exceptionName: string;
    /** 异常导致的消息 */
    exceptionMessage: string;
    /** 异常导致的根消息 */
    exceptionRootCauseMessage: string;
    /** 异常的栈轨迹 */
    exceptionStackTrace: string;
    /** 异常发生的类全名 */
    exceptionClassName: string;
    /** 异常发生的类文件 */
    exceptionFileName: string;
    /** 异常发生的方法名 */
    exceptionMethodName: string;
    /** 异常发生的方法所在行 */
    exceptionLineNumber: number;
    /** 处理状态 */
    processStatus: number;
    /** 处理时间 */
    processTime: string;
    /** 处理用户编号 */
    processUserId?: number;
    /** 创建时间 */
    createTime: string;
  };

  type AppAreaNodeRespVO = {
    /** 编号 */
    id: number;
    /** 名字 */
    name: string;
  };

  type AppDictDataRespVO = {
    /** 字典数据编号 */
    id: number;
    /** 字典标签 */
    label: string;
    /** 字典值 */
    value: string;
    /** 字典类型 */
    dictType: string;
  };

  type approveOrDenyParams = {
    /** 响应类型 */
    response_type: string;
    /** 客户端编号 */
    client_id: string;
    /** 授权范围 */
    scope?: string;
    /** 重定向 URI */
    redirect_uri: string;
    /** 用户是否接受 */
    auto_approve: boolean;
    state?: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type AreaNodeRespVO = {
    /** 编号 */
    id: number;
    /** 名字 */
    name: string;
  };

  type assignRoleDataScopeParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type assignRoleMenuParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type assignUserRoleParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type AuthLoginReqVO = {
    /** 账号 */
    username: string;
    /** 密码 */
    password: string;
    /** 验证码，验证码开启时，需要传递 */
    captchaVerification: string;
    /** 社交平台的类型，参见 SocialTypeEnum 枚举值 */
    socialType: number;
    /** 授权码 */
    socialCode: string;
    /** state */
    socialState: string;
    socialCodeValid?: boolean;
  };

  type AuthLoginRespVO = {
    /** 用户编号 */
    userId: number;
    /** 访问令牌 */
    accessToken: string;
    /** 刷新令牌 */
    refreshToken: string;
    /** 过期时间 */
    expiresTime: string;
  };

  type authorizeParams = {
    /** 客户端编号 */
    clientId: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type AuthPermissionInfoRespVO = {
    user: UserVO;
    /** 角色标识数组 */
    roles: string[];
    /** 操作权限数组 */
    permissions: string[];
    /** 菜单树 */
    menus: MenuVO[];
  };

  type AuthSmsLoginReqVO = {
    /** 手机号 */
    mobile: string;
    /** 短信验证码 */
    code: string;
  };

  type AuthSmsSendReqVO = {
    /** 手机号 */
    mobile: string;
    /** 短信场景 */
    scene: number;
  };

  type AuthSocialLoginReqVO = {
    /** 社交平台的类型，参见 UserSocialTypeEnum 枚举值 */
    type: number;
    /** 授权码 */
    code: string;
    /** state */
    state: string;
  };

  type bpm4042Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type bpm4043Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type bpm4044Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type bpm4045Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type bpm404Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type CaptchaVO = {
    captchaId?: string;
    projectCode?: string;
    captchaType?: string;
    captchaOriginalPath?: string;
    captchaFontType?: string;
    captchaFontSize?: number;
    secretKey?: string;
    originalImageBase64?: string;
    point?: PointVO;
    jigsawImageBase64?: string;
    wordList?: string[];
    pointList?: { x?: number; y?: number }[];
    pointJson?: string;
    token?: string;
    result?: boolean;
    captchaVerification?: string;
    clientUid?: string;
    ts?: number;
    browserInfo?: string;
  };

  type checkParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type checkTokenParams = {
    /** 访问令牌 */
    token: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type Client = {
    /** 应用名 */
    name: string;
    /** 应用图标 */
    logo: string;
  };

  type CodegenColumnRespVO = {
    /** 编号 */
    id: number;
    /** 表编号 */
    tableId: number;
    /** 字段名 */
    columnName: string;
    /** 字段类型 */
    dataType: string;
    /** 字段描述 */
    columnComment: string;
    /** 是否允许为空 */
    nullable: boolean;
    /** 是否主键 */
    primaryKey: boolean;
    /** 排序 */
    ordinalPosition: number;
    /** Java 属性类型 */
    javaType: string;
    /** Java 属性名 */
    javaField: string;
    /** 字典类型 */
    dictType?: string;
    /** 数据示例 */
    example?: string;
    /** 是否为 Create 创建操作的字段 */
    createOperation: boolean;
    /** 是否为 Update 更新操作的字段 */
    updateOperation: boolean;
    /** 是否为 List 查询操作的字段 */
    listOperation: boolean;
    /** List 查询操作的条件类型，参见 CodegenColumnListConditionEnum 枚举 */
    listOperationCondition: string;
    /** 是否为 List 查询操作的返回字段 */
    listOperationResult: boolean;
    /** 显示类型 */
    htmlType: string;
    /** 创建时间 */
    createTime: string;
  };

  type CodegenColumnSaveReqVO = {
    /** 编号 */
    id: number;
    /** 表编号 */
    tableId: number;
    /** 字段名 */
    columnName: string;
    /** 字段类型 */
    dataType: string;
    /** 字段描述 */
    columnComment: string;
    /** 是否允许为空 */
    nullable: boolean;
    /** 是否主键 */
    primaryKey: boolean;
    /** 排序 */
    ordinalPosition: number;
    /** Java 属性类型 */
    javaType: string;
    /** Java 属性名 */
    javaField: string;
    /** 字典类型 */
    dictType?: string;
    /** 数据示例 */
    example?: string;
    /** 是否为 Create 创建操作的字段 */
    createOperation: boolean;
    /** 是否为 Update 更新操作的字段 */
    updateOperation: boolean;
    /** 是否为 List 查询操作的字段 */
    listOperation: boolean;
    /** List 查询操作的条件类型，参见 CodegenColumnListConditionEnum 枚举 */
    listOperationCondition: string;
    /** 是否为 List 查询操作的返回字段 */
    listOperationResult: boolean;
    /** 显示类型 */
    htmlType: string;
  };

  type CodegenCreateListReqVO = {
    /** 数据源配置的编号 */
    dataSourceConfigId: number;
    /** 表名数组 */
    tableNames: string[];
  };

  type CodegenDetailRespVO = {
    table?: CodegenTableRespVO;
    /** 字段定义 */
    columns?: CodegenColumnRespVO[];
  };

  type CodegenPreviewRespVO = {
    /** 文件路径 */
    filePath: string;
    /** 代码 */
    code: string;
  };

  type CodegenTableRespVO = {
    /** 编号 */
    id: number;
    /** 生成场景，参见 CodegenSceneEnum 枚举 */
    scene: number;
    /** 表名称 */
    tableName: string;
    /** 表描述 */
    tableComment: string;
    /** 备注 */
    remark?: string;
    /** 模块名 */
    moduleName: string;
    /** 业务名 */
    businessName: string;
    /** 类名称 */
    className: string;
    /** 类描述 */
    classComment: string;
    /** 作者 */
    author: string;
    /** 模板类型，参见 CodegenTemplateTypeEnum 枚举 */
    templateType: number;
    /** 前端类型，参见 CodegenFrontTypeEnum 枚举 */
    frontType: number;
    /** 父菜单编号 */
    parentMenuId?: number;
    /** 主表的编号 */
    masterTableId?: number;
    /** 子表关联主表的字段编号 */
    subJoinColumnId?: number;
    /** 主表与子表是否一对多 */
    subJoinMany?: boolean;
    /** 树表的父字段编号 */
    treeParentColumnId?: number;
    /** 树表的名字字段编号 */
    treeNameColumnId?: number;
    /** 主键编号 */
    dataSourceConfigId: number;
    /** 创建时间 */
    createTime: string;
    /** 更新时间 */
    updateTime: string;
  };

  type CodegenTableSaveReqVO = {
    /** 编号 */
    id: number;
    /** 生成场景，参见 CodegenSceneEnum 枚举 */
    scene: number;
    /** 表名称 */
    tableName: string;
    /** 表描述 */
    tableComment: string;
    /** 备注 */
    remark?: string;
    /** 模块名 */
    moduleName: string;
    /** 业务名 */
    businessName: string;
    /** 类名称 */
    className: string;
    /** 类描述 */
    classComment: string;
    /** 作者 */
    author: string;
    /** 模板类型，参见 CodegenTemplateTypeEnum 枚举 */
    templateType: number;
    /** 前端类型，参见 CodegenFrontTypeEnum 枚举 */
    frontType: number;
    /** 父菜单编号 */
    parentMenuId?: number;
    /** 主表的编号 */
    masterTableId?: number;
    /** 子表关联主表的字段编号 */
    subJoinColumnId?: number;
    /** 主表与子表是否一对多 */
    subJoinMany?: boolean;
    /** 树表的父字段编号 */
    treeParentColumnId?: number;
    /** 树表的名字字段编号 */
    treeNameColumnId?: number;
  };

  type CodegenUpdateReqVO = {
    table: CodegenTableSaveReqVO;
    columns: CodegenColumnSaveReqVO[];
  };

  type CommandStat = {
    /** Redis 命令 */
    command: string;
    /** 调用次数 */
    calls: number;
    /** 消耗 CPU 秒数 */
    usec: number;
  };

  type CommonResultAuthLoginRespVO = {
    code?: number;
    data?: AuthLoginRespVO;
    msg?: string;
  };

  type CommonResultAuthPermissionInfoRespVO = {
    code?: number;
    data?: AuthPermissionInfoRespVO;
    msg?: string;
  };

  type CommonResultBoolean = {
    code?: number;
    data?: boolean;
    msg?: string;
  };

  type CommonResultCodegenDetailRespVO = {
    code?: number;
    data?: CodegenDetailRespVO;
    msg?: string;
  };

  type CommonResultConfigRespVO = {
    code?: number;
    data?: ConfigRespVO;
    msg?: string;
  };

  type CommonResultDataSourceConfigRespVO = {
    code?: number;
    data?: DataSourceConfigRespVO;
    msg?: string;
  };

  type CommonResultDemo01ContactRespVO = {
    code?: number;
    data?: Demo01ContactRespVO;
    msg?: string;
  };

  type CommonResultDemo02CategoryRespVO = {
    code?: number;
    data?: Demo02CategoryRespVO;
    msg?: string;
  };

  type CommonResultDemo03CourseDO = {
    code?: number;
    data?: Demo03CourseDO;
    msg?: string;
  };

  type CommonResultDemo03GradeDO = {
    code?: number;
    data?: Demo03GradeDO;
    msg?: string;
  };

  type CommonResultDemo03StudentRespVO = {
    code?: number;
    data?: Demo03StudentRespVO;
    msg?: string;
  };

  type CommonResultDeptRespVO = {
    code?: number;
    data?: DeptRespVO;
    msg?: string;
  };

  type CommonResultDictDataRespVO = {
    code?: number;
    data?: DictDataRespVO;
    msg?: string;
  };

  type CommonResultDictTypeRespVO = {
    code?: number;
    data?: DictTypeRespVO;
    msg?: string;
  };

  type CommonResultFileConfigRespVO = {
    code?: number;
    data?: FileConfigRespVO;
    msg?: string;
  };

  type CommonResultFilePresignedUrlRespVO = {
    code?: number;
    data?: FilePresignedUrlRespVO;
    msg?: string;
  };

  type CommonResultGoViewDataRespVO = {
    code?: number;
    data?: GoViewDataRespVO;
    msg?: string;
  };

  type CommonResultGoViewProjectRespVO = {
    code?: number;
    data?: GoViewProjectRespVO;
    msg?: string;
  };

  type CommonResultJobLogRespVO = {
    code?: number;
    data?: JobLogRespVO;
    msg?: string;
  };

  type CommonResultJobRespVO = {
    code?: number;
    data?: JobRespVO;
    msg?: string;
  };

  type CommonResultListAppAreaNodeRespVO = {
    code?: number;
    data?: AppAreaNodeRespVO[];
    msg?: string;
  };

  type CommonResultListAppDictDataRespVO = {
    code?: number;
    data?: AppDictDataRespVO[];
    msg?: string;
  };

  type CommonResultListAreaNodeRespVO = {
    code?: number;
    data?: AreaNodeRespVO[];
    msg?: string;
  };

  type CommonResultListCodegenPreviewRespVO = {
    code?: number;
    data?: CodegenPreviewRespVO[];
    msg?: string;
  };

  type CommonResultListCodegenTableRespVO = {
    code?: number;
    data?: CodegenTableRespVO[];
    msg?: string;
  };

  type CommonResultListDatabaseTableRespVO = {
    code?: number;
    data?: DatabaseTableRespVO[];
    msg?: string;
  };

  type CommonResultListDataSourceConfigRespVO = {
    code?: number;
    data?: DataSourceConfigRespVO[];
    msg?: string;
  };

  type CommonResultListDemo02CategoryRespVO = {
    code?: number;
    data?: Demo02CategoryRespVO[];
    msg?: string;
  };

  type CommonResultListDemo03CourseDO = {
    code?: number;
    data?: Demo03CourseDO[];
    msg?: string;
  };

  type CommonResultListDeptRespVO = {
    code?: number;
    data?: DeptRespVO[];
    msg?: string;
  };

  type CommonResultListDeptSimpleRespVO = {
    code?: number;
    data?: DeptSimpleRespVO[];
    msg?: string;
  };

  type CommonResultListDictDataSimpleRespVO = {
    code?: number;
    data?: DictDataSimpleRespVO[];
    msg?: string;
  };

  type CommonResultListDictTypeSimpleRespVO = {
    code?: number;
    data?: DictTypeSimpleRespVO[];
    msg?: string;
  };

  type CommonResultListLocalDateTime = {
    code?: number;
    data?: string[];
    msg?: string;
  };

  type CommonResultListLong = {
    code?: number;
    data?: number[];
    msg?: string;
  };

  type CommonResultListMailAccountSimpleRespVO = {
    code?: number;
    data?: MailAccountSimpleRespVO[];
    msg?: string;
  };

  type CommonResultListMailTemplateSimpleRespVO = {
    code?: number;
    data?: MailTemplateSimpleRespVO[];
    msg?: string;
  };

  type CommonResultListMenuRespVO = {
    code?: number;
    data?: MenuRespVO[];
    msg?: string;
  };

  type CommonResultListMenuSimpleRespVO = {
    code?: number;
    data?: MenuSimpleRespVO[];
    msg?: string;
  };

  type CommonResultListNotifyMessageRespVO = {
    code?: number;
    data?: NotifyMessageRespVO[];
    msg?: string;
  };

  type CommonResultListPostSimpleRespVO = {
    code?: number;
    data?: PostSimpleRespVO[];
    msg?: string;
  };

  type CommonResultListRoleRespVO = {
    code?: number;
    data?: RoleRespVO[];
    msg?: string;
  };

  type CommonResultListSmsChannelSimpleRespVO = {
    code?: number;
    data?: SmsChannelSimpleRespVO[];
    msg?: string;
  };

  type CommonResultListTenantPackageSimpleRespVO = {
    code?: number;
    data?: TenantPackageSimpleRespVO[];
    msg?: string;
  };

  type CommonResultListUserSimpleRespVO = {
    code?: number;
    data?: UserSimpleRespVO[];
    msg?: string;
  };

  type CommonResultLong = {
    code?: number;
    data?: number;
    msg?: string;
  };

  type CommonResultMailAccountRespVO = {
    code?: number;
    data?: MailAccountRespVO;
    msg?: string;
  };

  type CommonResultMailLogRespVO = {
    code?: number;
    data?: MailLogRespVO;
    msg?: string;
  };

  type CommonResultMailTemplateRespVO = {
    code?: number;
    data?: MailTemplateRespVO;
    msg?: string;
  };

  type CommonResultMenuRespVO = {
    code?: number;
    data?: MenuRespVO;
    msg?: string;
  };

  type CommonResultNoticeRespVO = {
    code?: number;
    data?: NoticeRespVO;
    msg?: string;
  };

  type CommonResultNotifyMessageRespVO = {
    code?: number;
    data?: NotifyMessageRespVO;
    msg?: string;
  };

  type CommonResultNotifyTemplateRespVO = {
    code?: number;
    data?: NotifyTemplateRespVO;
    msg?: string;
  };

  type CommonResultOAuth2ClientRespVO = {
    code?: number;
    data?: OAuth2ClientRespVO;
    msg?: string;
  };

  type CommonResultOAuth2OpenAccessTokenRespVO = {
    code?: number;
    data?: OAuth2OpenAccessTokenRespVO;
    msg?: string;
  };

  type CommonResultOAuth2OpenAuthorizeInfoRespVO = {
    code?: number;
    data?: OAuth2OpenAuthorizeInfoRespVO;
    msg?: string;
  };

  type CommonResultOAuth2OpenCheckTokenRespVO = {
    code?: number;
    data?: OAuth2OpenCheckTokenRespVO;
    msg?: string;
  };

  type CommonResultOAuth2UserInfoRespVO = {
    code?: number;
    data?: OAuth2UserInfoRespVO;
    msg?: string;
  };

  type CommonResultObject = {
    code?: number;
    data?: Record<string, any>;
    msg?: string;
  };

  type CommonResultPageResultApiAccessLogRespVO = {
    code?: number;
    data?: PageResultApiAccessLogRespVO;
    msg?: string;
  };

  type CommonResultPageResultApiErrorLogRespVO = {
    code?: number;
    data?: PageResultApiErrorLogRespVO;
    msg?: string;
  };

  type CommonResultPageResultCodegenTableRespVO = {
    code?: number;
    data?: PageResultCodegenTableRespVO;
    msg?: string;
  };

  type CommonResultPageResultConfigRespVO = {
    code?: number;
    data?: PageResultConfigRespVO;
    msg?: string;
  };

  type CommonResultPageResultDemo01ContactRespVO = {
    code?: number;
    data?: PageResultDemo01ContactRespVO;
    msg?: string;
  };

  type CommonResultPageResultDemo03CourseDO = {
    code?: number;
    data?: PageResultDemo03CourseDO;
    msg?: string;
  };

  type CommonResultPageResultDemo03GradeDO = {
    code?: number;
    data?: PageResultDemo03GradeDO;
    msg?: string;
  };

  type CommonResultPageResultDemo03StudentRespVO = {
    code?: number;
    data?: PageResultDemo03StudentRespVO;
    msg?: string;
  };

  type CommonResultPageResultDictDataRespVO = {
    code?: number;
    data?: PageResultDictDataRespVO;
    msg?: string;
  };

  type CommonResultPageResultDictTypeRespVO = {
    code?: number;
    data?: PageResultDictTypeRespVO;
    msg?: string;
  };

  type CommonResultPageResultFileConfigRespVO = {
    code?: number;
    data?: PageResultFileConfigRespVO;
    msg?: string;
  };

  type CommonResultPageResultFileRespVO = {
    code?: number;
    data?: PageResultFileRespVO;
    msg?: string;
  };

  type CommonResultPageResultGoViewProjectRespVO = {
    code?: number;
    data?: PageResultGoViewProjectRespVO;
    msg?: string;
  };

  type CommonResultPageResultJobLogRespVO = {
    code?: number;
    data?: PageResultJobLogRespVO;
    msg?: string;
  };

  type CommonResultPageResultJobRespVO = {
    code?: number;
    data?: PageResultJobRespVO;
    msg?: string;
  };

  type CommonResultPageResultLoginLogRespVO = {
    code?: number;
    data?: PageResultLoginLogRespVO;
    msg?: string;
  };

  type CommonResultPageResultMailAccountRespVO = {
    code?: number;
    data?: PageResultMailAccountRespVO;
    msg?: string;
  };

  type CommonResultPageResultMailLogRespVO = {
    code?: number;
    data?: PageResultMailLogRespVO;
    msg?: string;
  };

  type CommonResultPageResultMailTemplateRespVO = {
    code?: number;
    data?: PageResultMailTemplateRespVO;
    msg?: string;
  };

  type CommonResultPageResultNoticeRespVO = {
    code?: number;
    data?: PageResultNoticeRespVO;
    msg?: string;
  };

  type CommonResultPageResultNotifyMessageRespVO = {
    code?: number;
    data?: PageResultNotifyMessageRespVO;
    msg?: string;
  };

  type CommonResultPageResultNotifyTemplateRespVO = {
    code?: number;
    data?: PageResultNotifyTemplateRespVO;
    msg?: string;
  };

  type CommonResultPageResultOAuth2AccessTokenRespVO = {
    code?: number;
    data?: PageResultOAuth2AccessTokenRespVO;
    msg?: string;
  };

  type CommonResultPageResultOAuth2ClientRespVO = {
    code?: number;
    data?: PageResultOAuth2ClientRespVO;
    msg?: string;
  };

  type CommonResultPageResultOperateLogRespVO = {
    code?: number;
    data?: PageResultOperateLogRespVO;
    msg?: string;
  };

  type CommonResultPageResultPostRespVO = {
    code?: number;
    data?: PageResultPostRespVO;
    msg?: string;
  };

  type CommonResultPageResultProjectInfoRespVO = {
    code?: number;
    data?: PageResultProjectInfoRespVO;
    msg?: string;
  };

  type CommonResultPageResultRoleRespVO = {
    code?: number;
    data?: PageResultRoleRespVO;
    msg?: string;
  };

  type CommonResultPageResultSmsChannelRespVO = {
    code?: number;
    data?: PageResultSmsChannelRespVO;
    msg?: string;
  };

  type CommonResultPageResultSmsLogRespVO = {
    code?: number;
    data?: PageResultSmsLogRespVO;
    msg?: string;
  };

  type CommonResultPageResultSmsTemplateRespVO = {
    code?: number;
    data?: PageResultSmsTemplateRespVO;
    msg?: string;
  };

  type CommonResultPageResultSocialClientRespVO = {
    code?: number;
    data?: PageResultSocialClientRespVO;
    msg?: string;
  };

  type CommonResultPageResultSocialUserRespVO = {
    code?: number;
    data?: PageResultSocialUserRespVO;
    msg?: string;
  };

  type CommonResultPageResultTenantPackageRespVO = {
    code?: number;
    data?: PageResultTenantPackageRespVO;
    msg?: string;
  };

  type CommonResultPageResultTenantRespVO = {
    code?: number;
    data?: PageResultTenantRespVO;
    msg?: string;
  };

  type CommonResultPageResultUserRespVO = {
    code?: number;
    data?: PageResultUserRespVO;
    msg?: string;
  };

  type CommonResultPostRespVO = {
    code?: number;
    data?: PostRespVO;
    msg?: string;
  };

  type CommonResultProjectInfoRespVO = {
    code?: number;
    data?: ProjectInfoRespVO;
    msg?: string;
  };

  type CommonResultRedisMonitorRespVO = {
    code?: number;
    data?: RedisMonitorRespVO;
    msg?: string;
  };

  type CommonResultRoleRespVO = {
    code?: number;
    data?: RoleRespVO;
    msg?: string;
  };

  type CommonResultSetLong = {
    code?: number;
    data?: number[];
    msg?: string;
  };

  type CommonResultSmsChannelRespVO = {
    code?: number;
    data?: SmsChannelRespVO;
    msg?: string;
  };

  type CommonResultSmsTemplateRespVO = {
    code?: number;
    data?: SmsTemplateRespVO;
    msg?: string;
  };

  type CommonResultSocialClientRespVO = {
    code?: number;
    data?: SocialClientRespVO;
    msg?: string;
  };

  type CommonResultSocialUserRespVO = {
    code?: number;
    data?: SocialUserRespVO;
    msg?: string;
  };

  type CommonResultString = {
    code?: number;
    data?: string;
    msg?: string;
  };

  type CommonResultTenantPackageRespVO = {
    code?: number;
    data?: TenantPackageRespVO;
    msg?: string;
  };

  type CommonResultTenantRespVO = {
    code?: number;
    data?: TenantRespVO;
    msg?: string;
  };

  type CommonResultTenantSimpleRespVO = {
    code?: number;
    data?: TenantSimpleRespVO;
    msg?: string;
  };

  type CommonResultUserImportRespVO = {
    code?: number;
    data?: UserImportRespVO;
    msg?: string;
  };

  type CommonResultUserProfileRespVO = {
    code?: number;
    data?: UserProfileRespVO;
    msg?: string;
  };

  type CommonResultUserRespVO = {
    code?: number;
    data?: UserRespVO;
    msg?: string;
  };

  type ConfigRespVO = {
    /** 参数配置序号 */
    id: number;
    /** 参数分类 */
    category: string;
    /** 参数名称 */
    name: string;
    /** 参数键名 */
    key: string;
    /** 参数键值 */
    value: string;
    /** 参数类型，参见 SysConfigTypeEnum 枚举 */
    type: number;
    /** 是否可见 */
    visible: boolean;
    /** 备注 */
    remark?: string;
    /** 创建时间 */
    createTime: string;
  };

  type ConfigSaveReqVO = {
    /** 参数配置序号 */
    id?: number;
    /** 参数分组 */
    category: string;
    /** 参数名称 */
    name: string;
    /** 参数键名 */
    key: string;
    /** 参数键值 */
    value: string;
    /** 是否可见 */
    visible: boolean;
    /** 备注 */
    remark?: string;
  };

  type createCodegenListParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type createConfigParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type createDataSourceConfigParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type createDemo01ContactParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type createDemo02CategoryParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type createDemo03CourseParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type createDemo03GradeParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type createDemo03StudentParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type createDeptParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type createDictDataParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type createDictTypeParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type createFileConfigParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type createFileParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type createJobParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type createMailAccountParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type createMailTemplateParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type createMenuParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type createNoticeParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type createNotifyTemplateParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type createOAuth2ClientParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type createPostParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type createProjectInfoParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type createProjectParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type createRoleParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type createSmsChannelParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type createSmsTemplateParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type createSocialClientParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type createTenantPackageParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type createTenantParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type createUserParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type crm4042Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type crm4043Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type crm4044Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type crm4045Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type crm404Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type DatabaseTableRespVO = {
    /** 表名称 */
    name: string;
    /** 表描述 */
    comment: string;
  };

  type DataSourceConfigRespVO = {
    /** 主键编号 */
    id: number;
    /** 数据源名称 */
    name: string;
    /** 数据源连接 */
    url: string;
    /** 用户名 */
    username: string;
    /** 创建时间 */
    createTime: string;
  };

  type DataSourceConfigSaveReqVO = {
    /** 主键编号 */
    id?: number;
    /** 数据源名称 */
    name: string;
    /** 数据源连接 */
    url: string;
    /** 用户名 */
    username: string;
    /** 密码 */
    password: string;
  };

  type deleteAccessTokenParams = {
    /** 访问令牌 */
    accessToken: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type deleteCodegenParams = {
    /** 表编号 */
    tableId: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type deleteConfigParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type deleteDataSourceConfigParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type deleteDemo01ContactParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type deleteDemo02CategoryParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type deleteDemo03CourseParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type deleteDemo03GradeParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type deleteDemo03StudentParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type deleteDeptParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type deleteDictDataParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type deleteDictTypeParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type deleteFileConfigParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type deleteFileParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type deleteJobParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type deleteMailAccountParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type deleteMailTemplateParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type deleteMenuParams = {
    /** 菜单编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type deleteNoticeParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type deleteNotifyTemplateParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type deleteOAuth2ClientParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type deletePostParams = {
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type deleteProjectInfoParams = {
    /** 编号 */
    id: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type deleteProjectParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type deleteRoleParams = {
    /** 角色编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type deleteSmsChannelParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type deleteSmsTemplateParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type deleteSocialClientParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type deleteTenantPackageParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type deleteTenantParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type deleteUserParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type Demo01ContactRespVO = {
    /** 编号 */
    id: number;
    /** 名字 */
    name: string;
    /** 性别 */
    sex: number;
    /** 出生年 */
    birthday: string;
    /** 简介 */
    description: string;
    /** 头像 */
    avatar?: string;
    /** 创建时间 */
    createTime: string;
  };

  type Demo01ContactSaveReqVO = {
    /** 编号 */
    id: number;
    /** 名字 */
    name: string;
    /** 性别 */
    sex: number;
    /** 出生年 */
    birthday: string;
    /** 简介 */
    description: string;
    /** 头像 */
    avatar?: string;
  };

  type Demo02CategoryRespVO = {
    /** 编号 */
    id: number;
    /** 名字 */
    name: string;
    /** 父级编号 */
    parentId: number;
    /** 创建时间 */
    createTime: string;
  };

  type Demo02CategorySaveReqVO = {
    /** 编号 */
    id: number;
    /** 名字 */
    name: string;
    /** 父级编号 */
    parentId: number;
  };

  type Demo03CourseDO = {
    createTime?: string;
    updateTime?: string;
    creator?: string;
    updater?: string;
    deleted?: boolean;
    id?: number;
    studentId?: number;
    name?: string;
    score?: number;
  };

  type Demo03GradeDO = {
    createTime?: string;
    updateTime?: string;
    creator?: string;
    updater?: string;
    deleted?: boolean;
    id?: number;
    studentId?: number;
    name?: string;
    teacher?: string;
  };

  type Demo03StudentRespVO = {
    /** 编号 */
    id: number;
    /** 名字 */
    name: string;
    /** 性别 */
    sex: number;
    /** 出生日期 */
    birthday: string;
    /** 简介 */
    description: string;
    /** 创建时间 */
    createTime: string;
  };

  type Demo03StudentSaveReqVO = {
    /** 编号 */
    id: number;
    /** 名字 */
    name: string;
    /** 性别 */
    sex: number;
    /** 出生日期 */
    birthday: string;
    /** 简介 */
    description: string;
    demo03Courses?: Demo03CourseDO[];
    demo03Grade?: Demo03GradeDO;
  };

  type Dept = {
    /** 部门编号 */
    id: number;
    /** 部门名称 */
    name: string;
  };

  type DeptRespVO = {
    /** 部门编号 */
    id?: number;
    /** 部门名称 */
    name: string;
    /** 父部门 ID */
    parentId?: number;
    /** 显示顺序 */
    sort: number;
    /** 负责人的用户编号 */
    leaderUserId?: number;
    /** 联系电话 */
    phone?: string;
    /** 邮箱 */
    email?: string;
    /** 状态,见 CommonStatusEnum 枚举 */
    status: number;
    /** 创建时间 */
    createTime: string;
  };

  type DeptSaveReqVO = {
    /** 部门编号 */
    id?: number;
    /** 部门名称 */
    name: string;
    /** 父部门 ID */
    parentId?: number;
    /** 显示顺序 */
    sort: number;
    /** 负责人的用户编号 */
    leaderUserId?: number;
    /** 联系电话 */
    phone?: string;
    /** 邮箱 */
    email?: string;
    /** 状态,见 CommonStatusEnum 枚举 */
    status: number;
  };

  type DeptSimpleRespVO = {
    /** 部门编号 */
    id: number;
    /** 部门名称 */
    name: string;
    /** 父部门 ID */
    parentId: number;
  };

  type DictDataRespVO = {
    /** 字典数据编号 */
    id: number;
    /** 显示顺序 */
    sort: number;
    /** 字典标签 */
    label: string;
    /** 字典值 */
    value: string;
    /** 字典类型 */
    dictType: string;
    /** 状态,见 CommonStatusEnum 枚举 */
    status: number;
    /** 颜色类型,default、primary、success、info、warning、danger */
    colorType?: string;
    /** css 样式 */
    cssClass?: string;
    /** 备注 */
    remark?: string;
    /** 创建时间 */
    createTime: string;
  };

  type DictDataSaveReqVO = {
    /** 字典数据编号 */
    id?: number;
    /** 显示顺序 */
    sort: number;
    /** 字典标签 */
    label: string;
    /** 字典值 */
    value: string;
    /** 字典类型 */
    dictType: string;
    /** 状态,见 CommonStatusEnum 枚举 */
    status: number;
    /** 颜色类型,default、primary、success、info、warning、danger */
    colorType?: string;
    /** css 样式 */
    cssClass?: string;
    /** 备注 */
    remark?: string;
  };

  type DictDataSimpleRespVO = {
    /** 字典类型 */
    dictType: string;
    /** 字典键值 */
    value: string;
    /** 字典标签 */
    label: string;
    /** 颜色类型，default、primary、success、info、warning、danger */
    colorType?: string;
    /** css 样式 */
    cssClass?: string;
  };

  type DictTypeRespVO = {
    /** 字典类型编号 */
    id: number;
    /** 字典名称 */
    name: string;
    /** 字典类型 */
    type: string;
    /** 状态，参见 CommonStatusEnum 枚举类 */
    status: number;
    /** 备注 */
    remark?: string;
    /** 创建时间 */
    createTime: string;
  };

  type DictTypeSaveReqVO = {
    /** 字典类型编号 */
    id?: number;
    /** 字典名称 */
    name: string;
    /** 字典类型 */
    type: string;
    /** 状态，参见 CommonStatusEnum 枚举类 */
    status: number;
    /** 备注 */
    remark?: string;
  };

  type DictTypeSimpleRespVO = {
    /** 字典类型编号 */
    id: number;
    /** 字典类型名称 */
    name: string;
    /** 字典类型 */
    type: string;
  };

  type downloadCodegenParams = {
    /** 表编号 */
    tableId: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type erp4042Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type erp4043Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type erp4044Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type erp4045Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type erp404Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type export1Params = {
    /** 岗位编码，模糊匹配 */
    code?: string;
    /** 岗位名称，模糊匹配 */
    name?: string;
    /** 展示状态，参见 CommonStatusEnum 枚举类 */
    status?: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type export2Params = {
    /** 字典类型名称，模糊匹配 */
    name?: string;
    /** 字典类型，模糊匹配 */
    type?: string;
    /** 展示状态，参见 CommonStatusEnum 枚举类 */
    status?: string;
    /** 创建时间 */
    createTime?: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type export3Params = {
    /** 字典标签 */
    label?: string;
    /** 字典类型，模糊匹配 */
    dictType?: string;
    /** 展示状态，参见 CommonStatusEnum 枚举类 */
    status?: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type exportApiAccessLogExcelParams = {
    /** 用户编号 */
    userId?: string;
    /** 用户类型 */
    userType?: string;
    /** 应用名 */
    applicationName?: string;
    /** 请求地址，模糊匹配 */
    requestUrl?: string;
    /** 开始时间 */
    beginTime?: string;
    /** 执行时长,大于等于，单位：毫秒 */
    duration?: string;
    /** 结果码 */
    resultCode?: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type exportApiErrorLogExcelParams = {
    /** 用户编号 */
    userId?: string;
    /** 用户类型 */
    userType?: string;
    /** 应用名 */
    applicationName?: string;
    /** 请求地址 */
    requestUrl?: string;
    /** 异常发生时间 */
    exceptionTime?: string;
    /** 处理状态 */
    processStatus?: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type exportConfigParams = {
    /** 数据源名称，模糊匹配 */
    name?: string;
    /** 参数键名，模糊匹配 */
    key?: string;
    /** 参数类型，参见 SysConfigTypeEnum 枚举 */
    type?: string;
    /** 创建时间 */
    createTime?: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type exportDemo01ContactExcelParams = {
    /** 名字 */
    name?: string;
    /** 性别 */
    sex?: string;
    /** 创建时间 */
    createTime?: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type exportDemo02CategoryExcelParams = {
    /** 名字 */
    name?: string;
    /** 父级编号 */
    parentId?: string;
    /** 创建时间 */
    createTime?: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type exportDemo03StudentExcelParams = {
    /** 名字 */
    name?: string;
    /** 性别 */
    sex?: string;
    /** 简介 */
    description?: string;
    /** 创建时间 */
    createTime?: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type exportJobExcelParams = {
    /** 任务名称，模糊匹配 */
    name?: string;
    /** 任务状态，参见 JobStatusEnum 枚举 */
    status?: string;
    /** 处理器的名字，模糊匹配 */
    handlerName?: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type exportJobLogExcelParams = {
    /** 任务编号 */
    jobId?: string;
    /** 处理器的名字，模糊匹配 */
    handlerName?: string;
    /** 开始执行时间 */
    beginTime?: string;
    /** 结束执行时间 */
    endTime?: string;
    /** 任务状态，参见 JobLogStatusEnum 枚举 */
    status?: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type exportLoginLogParams = {
    /** 用户 IP，模拟匹配 */
    userIp?: string;
    /** 用户账号，模拟匹配 */
    username?: string;
    /** 操作状态 */
    status?: string;
    /** 登录时间 */
    createTime?: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type exportOperateLogParams = {
    /** 用户编号 */
    userId?: string;
    /** 操作模块业务编号 */
    bizId?: string;
    /** 操作模块，模拟匹配 */
    type?: string;
    /** 操作名，模拟匹配 */
    subType?: string;
    /** 操作明细，模拟匹配 */
    action?: string;
    /** 开始时间 */
    createTime?: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type exportProjectInfoExcelParams = {
    /** name */
    name?: string;
    /** 描述 */
    description?: string;
    /** 创建时间 */
    createTime?: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type exportSmsLogExcelParams = {
    /** 短信渠道编号 */
    channelId?: string;
    /** 模板编号 */
    templateId?: string;
    /** 手机号 */
    mobile?: string;
    /** 发送状态，参见 SmsSendStatusEnum 枚举类 */
    sendStatus?: string;
    /** 发送时间 */
    sendTime?: string;
    /** 接收状态，参见 SmsReceiveStatusEnum 枚举类 */
    receiveStatus?: string;
    /** 接收时间 */
    receiveTime?: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type exportSmsTemplateExcelParams = {
    /** 短信签名 */
    type?: string;
    /** 开启状态 */
    status?: string;
    /** 模板编码，模糊匹配 */
    code?: string;
    /** 模板内容，模糊匹配 */
    content?: string;
    /** 短信 API 的模板编号，模糊匹配 */
    apiTemplateId?: string;
    /** 短信渠道编号 */
    channelId?: string;
    /** 创建时间 */
    createTime?: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type exportTenantExcelParams = {
    /** 租户名 */
    name?: string;
    /** 联系人 */
    contactName?: string;
    /** 联系手机 */
    contactMobile?: string;
    /** 租户状态（0正常 1停用） */
    status?: string;
    /** 创建时间 */
    createTime?: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type exportUserListParams = {
    /** 用户账号，模糊匹配 */
    username?: string;
    /** 手机号码，模糊匹配 */
    mobile?: string;
    /** 展示状态，参见 CommonStatusEnum 枚举类 */
    status?: string;
    /** 创建时间 */
    createTime?: string;
    /** 部门编号，同时筛选子部门 */
    deptId?: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type exportUsingGETParams = {
    /** 角色名称，模糊匹配 */
    name?: string;
    /** 角色标识，模糊匹配 */
    code?: string;
    /** 展示状态，参见 CommonStatusEnum 枚举类 */
    status?: string;
    /** 创建时间 */
    createTime?: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type FileClientConfig = true;

  type FileConfigRespVO = {
    /** 编号 */
    id: number;
    /** 配置名 */
    name: string;
    /** 存储器，参见 FileStorageEnum 枚举类 */
    storage: number;
    /** 是否为主配置 */
    master: boolean;
    config: FileClientConfig;
    /** 备注 */
    remark?: string;
    /** 创建时间 */
    createTime: string;
  };

  type FileConfigSaveReqVO = {
    /** 编号 */
    id?: number;
    /** 配置名 */
    name: string;
    /** 存储器，参见 FileStorageEnum 枚举类 */
    storage: number;
    /** 存储配置,配置是动态参数，所以使用 Map 接收 */
    config: Record<string, any>;
    /** 备注 */
    remark?: string;
  };

  type FileCreateReqVO = {
    /** 文件配置编号 */
    configId: number;
    /** 文件路径 */
    path: string;
    /** 原文件名 */
    name: string;
    /** 文件 URL */
    url: string;
    /** 文件 MIME 类型 */
    type?: string;
    /** 文件大小 */
    size: number;
  };

  type FilePresignedUrlRespVO = {
    /** 配置编号 */
    configId: number;
    /** 文件上传 URL */
    uploadUrl: string;
    /** 文件访问 URL */
    url: string;
  };

  type FileRespVO = {
    /** 文件编号 */
    id: number;
    /** 配置编号 */
    configId: number;
    /** 文件路径 */
    path: string;
    /** 原文件名 */
    name: string;
    /** 文件 URL */
    url: string;
    /** 文件MIME类型 */
    type?: string;
    /** 文件大小 */
    size: number;
    /** 创建时间 */
    createTime: string;
  };

  type getAccessTokenPageParams = {
    /** 用户编号 */
    userId: string;
    /** 用户类型，参见 UserTypeEnum 枚举 */
    userType: string;
    /** 客户端编号 */
    clientId: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getApiAccessLogPageParams = {
    /** 用户编号 */
    userId?: string;
    /** 用户类型 */
    userType?: string;
    /** 应用名 */
    applicationName?: string;
    /** 请求地址，模糊匹配 */
    requestUrl?: string;
    /** 开始时间 */
    beginTime?: string;
    /** 执行时长,大于等于，单位：毫秒 */
    duration?: string;
    /** 结果码 */
    resultCode?: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getApiErrorLogPageParams = {
    /** 用户编号 */
    userId?: string;
    /** 用户类型 */
    userType?: string;
    /** 应用名 */
    applicationName?: string;
    /** 请求地址 */
    requestUrl?: string;
    /** 异常发生时间 */
    exceptionTime?: string;
    /** 处理状态 */
    processStatus?: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getAreaByIpParams = {
    /** IP */
    ip: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getAreaTree1Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getAreaTreeParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getCodegenDetailParams = {
    /** 表编号 */
    tableId: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getCodegenTableListParams = {
    /** 数据源配置的编号 */
    dataSourceConfigId: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getCodegenTablePageParams = {
    /** 表名称，模糊匹配 */
    tableName?: string;
    /** 表描述，模糊匹配 */
    tableComment?: string;
    /** 实体，模糊匹配 */
    className?: string;
    /** 创建时间 */
    createTime?: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getConfigKeyParams = {
    /** 参数键 */
    key: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getConfigPageParams = {
    /** 数据源名称，模糊匹配 */
    name?: string;
    /** 参数键名，模糊匹配 */
    key?: string;
    /** 参数类型，参见 SysConfigTypeEnum 枚举 */
    type?: string;
    /** 创建时间 */
    createTime?: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getConfigParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getDatabaseTableListParams = {
    /** 数据源配置的编号 */
    dataSourceConfigId: number;
    /** 表名，模糊匹配 */
    name?: string;
    /** 描述，模糊匹配 */
    comment?: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getDataByHttp2Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getDataByHttp3Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getDataByHttp4Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getDataByHttp5Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getDataByHttpParams = {
    body: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getDataBySQL2Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getDataBySQL3Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getDataBySQL4Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getDataBySQL5Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getDataBySQLParams = {
    reqVO: GoViewDataGetBySqlReqVO;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getDataSourceConfigListParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getDataSourceConfigParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getDemo01ContactPageParams = {
    /** 名字 */
    name?: string;
    /** 性别 */
    sex?: string;
    /** 创建时间 */
    createTime?: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getDemo01ContactParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getDemo02CategoryListParams = {
    /** 名字 */
    name?: string;
    /** 父级编号 */
    parentId?: string;
    /** 创建时间 */
    createTime?: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getDemo02CategoryParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getDemo03CourseListByStudentIdParams = {
    /** 学生编号 */
    studentId: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getDemo03CoursePageParams = {
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 学生编号 */
    studentId: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getDemo03CourseParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getDemo03GradeByStudentIdParams = {
    /** 学生编号 */
    studentId: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getDemo03GradePageParams = {
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 学生编号 */
    studentId: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getDemo03GradeParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getDemo03StudentPageParams = {
    /** 名字 */
    name?: string;
    /** 性别 */
    sex?: string;
    /** 简介 */
    description?: string;
    /** 创建时间 */
    createTime?: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getDemo03StudentParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getDeptListParams = {
    /** 部门名称，模糊匹配 */
    name?: string;
    /** 展示状态，参见 CommonStatusEnum 枚举类 */
    status?: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getDeptParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getDictDataListByTypeParams = {
    /** 字典类型 */
    type: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getDictDataParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getDictTypePageParams = {
    /** 字典标签 */
    label?: string;
    /** 字典类型，模糊匹配 */
    dictType?: string;
    /** 展示状态，参见 CommonStatusEnum 枚举类 */
    status?: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getDictTypeParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getFileConfigPageParams = {
    /** 配置名 */
    name?: string;
    /** 存储器 */
    storage?: string;
    /** 创建时间 */
    createTime?: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getFileConfigParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getFileContentParams = {
    /** 配置编号 */
    configId: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getFilePageParams = {
    /** 文件路径，模糊匹配 */
    path?: string;
    /** 文件类型，模糊匹配 */
    type?: string;
    /** 创建时间 */
    createTime?: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getFilePresignedUrlParams = {
    path: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getJobLogPageParams = {
    /** 任务编号 */
    jobId?: string;
    /** 处理器的名字，模糊匹配 */
    handlerName?: string;
    /** 开始执行时间 */
    beginTime?: string;
    /** 结束执行时间 */
    endTime?: string;
    /** 任务状态，参见 JobLogStatusEnum 枚举 */
    status?: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getJobLogParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getJobNextTimesParams = {
    /** 编号 */
    id: number;
    /** 数量 */
    count?: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getJobPageParams = {
    /** 任务名称，模糊匹配 */
    name?: string;
    /** 任务状态，参见 JobStatusEnum 枚举 */
    status?: string;
    /** 处理器的名字，模糊匹配 */
    handlerName?: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getJobParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getLatest1Params = {
    c: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getLatestParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getLoginLogPageParams = {
    /** 用户 IP，模拟匹配 */
    userIp?: string;
    /** 用户账号，模拟匹配 */
    username?: string;
    /** 操作状态 */
    status?: string;
    /** 登录时间 */
    createTime?: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getMailAccountPageParams = {
    /** 邮箱 */
    mail: string;
    /** 用户名 */
    username: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getMailAccountParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getMailLogPageParams = {
    /** 用户编号 */
    userId?: string;
    /** 用户类型，参见 UserTypeEnum 枚举 */
    userType?: string;
    /** 接收邮箱地址，模糊匹配 */
    toMail?: string;
    /** 邮箱账号编号 */
    accountId?: string;
    /** 模板编号 */
    templateId?: string;
    /** 发送状态，参见 MailSendStatusEnum 枚举 */
    sendStatus?: string;
    /** 发送时间 */
    sendTime?: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getMailTemplate1Params = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getMailTemplatePageParams = {
    /** 状态，参见 CommonStatusEnum 枚举 */
    status?: string;
    /** 标识，模糊匹配 */
    code?: string;
    /** 名称，模糊匹配 */
    name?: string;
    /** 账号编号 */
    accountId?: string;
    /** 创建时间 */
    createTime?: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getMailTemplateParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getMenuListParams = {
    /** 菜单名称，模糊匹配 */
    name?: string;
    /** 展示状态，参见 CommonStatusEnum 枚举类 */
    status?: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getMenuParams = {
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getMyMyNotifyMessagePageParams = {
    /** 是否已读 */
    readStatus?: string;
    /** 创建时间 */
    createTime?: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getMyProjectPageParams = {
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getNoticePageParams = {
    /** 通知公告名称，模糊匹配 */
    title?: string;
    /** 展示状态，参见 CommonStatusEnum 枚举类 */
    status?: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getNoticeParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getNotifyMessagePageParams = {
    /** 用户编号 */
    userId?: string;
    /** 用户类型 */
    userType?: string;
    /** 模板编码 */
    templateCode?: string;
    /** 模版类型 */
    templateType?: string;
    /** 创建时间 */
    createTime?: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getNotifyMessageParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getNotifyTemplatePageParams = {
    /** 模版编码 */
    code?: string;
    /** 模版名称 */
    name?: string;
    /** 状态，参见 CommonStatusEnum 枚举类 */
    status?: string;
    /** 创建时间 */
    createTime?: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getNotifyTemplateParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getOAuth2ClientPageParams = {
    /** 应用名，模糊匹配 */
    name?: string;
    /** 状态，参见 CommonStatusEnum 枚举 */
    status?: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getOAuth2ClientParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getPermissionInfoParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getPostPageParams = {
    /** 岗位编码，模糊匹配 */
    code?: string;
    /** 岗位名称，模糊匹配 */
    name?: string;
    /** 展示状态，参见 CommonStatusEnum 枚举类 */
    status?: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getPostParams = {
    /** 岗位编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getProjectInfoPageParams = {
    /** name */
    name?: string;
    /** 描述 */
    description?: string;
    /** 创建时间 */
    createTime?: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getProjectInfoParams = {
    /** 编号 */
    id: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getProjectParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getRedisMonitorInfoParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getRoleMenuListParams = {
    /** 角色编号 */
    roleId: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getRolePageParams = {
    /** 角色名称，模糊匹配 */
    name?: string;
    /** 角色标识，模糊匹配 */
    code?: string;
    /** 展示状态，参见 CommonStatusEnum 枚举类 */
    status?: string;
    /** 创建时间 */
    createTime?: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getRoleParams = {
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getSimpleDeptList1Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getSimpleDeptListParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getSimpleDictDataList1Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getSimpleDictDataListParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getSimpleDictTypeList1Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getSimpleDictTypeListParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getSimpleMailAccountList1Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getSimpleMailAccountListParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getSimpleMenuList1Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getSimpleMenuListParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getSimplePostList1Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getSimplePostListParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getSimpleRoleList1Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getSimpleRoleListParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getSimpleSmsChannelList1Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getSimpleSmsChannelListParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getSimpleTemplateList1Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getSimpleTemplateListParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getSimpleUserList1Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getSimpleUserListParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getSmsChannelPageParams = {
    /** 任务状态 */
    status?: string;
    /** 短信签名，模糊匹配 */
    signature?: string;
    /** 创建时间 */
    createTime?: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getSmsChannelParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getSmsLogPageParams = {
    /** 短信渠道编号 */
    channelId?: string;
    /** 模板编号 */
    templateId?: string;
    /** 手机号 */
    mobile?: string;
    /** 发送状态，参见 SmsSendStatusEnum 枚举类 */
    sendStatus?: string;
    /** 发送时间 */
    sendTime?: string;
    /** 接收状态，参见 SmsReceiveStatusEnum 枚举类 */
    receiveStatus?: string;
    /** 接收时间 */
    receiveTime?: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getSmsTemplatePageParams = {
    /** 短信签名 */
    type?: string;
    /** 开启状态 */
    status?: string;
    /** 模板编码，模糊匹配 */
    code?: string;
    /** 模板内容，模糊匹配 */
    content?: string;
    /** 短信 API 的模板编号，模糊匹配 */
    apiTemplateId?: string;
    /** 短信渠道编号 */
    channelId?: string;
    /** 创建时间 */
    createTime?: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getSmsTemplateParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getSocialClientPageParams = {
    /** 应用名 */
    name?: string;
    /** 社交平台的类型 */
    socialType?: string;
    /** 用户类型 */
    userType?: string;
    /** 客户端编号 */
    clientId?: string;
    /** 状态 */
    status?: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getSocialClientParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getSocialUserPageParams = {
    /** 社交平台的类型 */
    type?: string;
    /** 用户昵称 */
    nickname?: string;
    /** 社交 openid */
    openid?: string;
    /** 创建时间 */
    createTime?: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getSocialUserParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getTenantByWebsiteParams = {
    /** 域名 */
    website: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getTenantIdByNameParams = {
    /** 租户名 */
    name: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getTenantPackageList1Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getTenantPackageListParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getTenantPackagePageParams = {
    /** 套餐名 */
    name?: string;
    /** 状态 */
    status?: string;
    /** 备注 */
    remark?: string;
    /** 创建时间 */
    createTime?: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getTenantPackageParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getTenantPageParams = {
    /** 租户名 */
    name?: string;
    /** 联系人 */
    contactName?: string;
    /** 联系手机 */
    contactMobile?: string;
    /** 租户状态（0正常 1停用） */
    status?: string;
    /** 创建时间 */
    createTime?: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getTenantParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getUnreadNotifyMessageCountParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getUnreadNotifyMessageListParams = {
    /** 10 */
    size?: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getUserInfoParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getUserPageParams = {
    /** 用户账号，模糊匹配 */
    username?: string;
    /** 手机号码，模糊匹配 */
    mobile?: string;
    /** 展示状态，参见 CommonStatusEnum 枚举类 */
    status?: string;
    /** 创建时间 */
    createTime?: string;
    /** 部门编号，同时筛选子部门 */
    deptId?: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getUserParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type getUserProfileParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type GoViewDataGetBySqlReqVO = {
    /** SQL 语句 */
    sql: string;
  };

  type GoViewDataRespVO = {
    /** 数据维度 */
    dimensions: string[];
    /** 数据明细列表 */
    source: Record<string, any>[];
  };

  type GoViewProjectCreateReqVO = {
    /** 项目名称 */
    name: string;
  };

  type GoViewProjectRespVO = {
    /** 编号 */
    id: number;
    /** 项目名称 */
    name: string;
    /** 发布状态 */
    status: number;
    /** 报表内容 */
    content?: string;
    /** 预览图片 URL */
    picUrl?: string;
    /** 项目备注 */
    remark?: string;
    /** 创建人编号 */
    creator: string;
    /** 创建时间 */
    createTime: string;
  };

  type GoViewProjectUpdateReqVO = {
    /** 编号 */
    id: number;
    /** 项目名称 */
    name: string;
    /** 发布状态 */
    status: number;
    /** 报表内容 */
    content?: string;
    /** 预览图片 URL */
    picUrl?: string;
    /** 项目备注 */
    remark?: string;
  };

  type importExcelParams = {
    /** 是否支持更新，默认为 false */
    updateSupport?: boolean;
    /** Excel 文件 */
    file: any;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type importTemplateParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type IotReportSqlQuery = {
    sql?: string;
  };

  type JobLogRespVO = {
    /** 日志编号 */
    id: number;
    /** 任务编号 */
    jobId: number;
    /** 处理器的名字 */
    handlerName: string;
    /** 处理器的参数 */
    handlerParam?: string;
    /** 第几次执行 */
    executeIndex: number;
    /** 开始执行时间 */
    beginTime: string;
    /** 结束执行时间 */
    endTime?: string;
    /** 执行时长 */
    duration?: number;
    /** 任务状态，参见 JobLogStatusEnum 枚举 */
    status: number;
    /** 结果数据 */
    result?: string;
    /** 创建时间 */
    createTime: string;
  };

  type JobRespVO = {
    /** 任务编号 */
    id: number;
    /** 任务名称 */
    name: string;
    /** 任务状态 */
    status: number;
    /** 处理器的名字 */
    handlerName: string;
    /** 处理器的参数 */
    handlerParam?: string;
    /** CRON 表达式 */
    cronExpression: string;
    /** 重试次数 */
    retryCount: number;
    /** 重试间隔 */
    retryInterval: number;
    /** 监控超时时间 */
    monitorTimeout?: number;
    /** 创建时间 */
    createTime: string;
  };

  type JobSaveReqVO = {
    /** 任务编号 */
    id?: number;
    /** 任务名称 */
    name: string;
    /** 处理器的名字 */
    handlerName: string;
    /** 处理器的参数 */
    handlerParam?: string;
    /** CRON 表达式 */
    cronExpression: string;
    /** 重试次数 */
    retryCount: number;
    /** 重试间隔 */
    retryInterval: number;
    /** 监控超时时间 */
    monitorTimeout?: number;
  };

  type KeyValueStringBoolean = {
    key?: string;
    value?: boolean;
  };

  type listAdminRolesParams = {
    /** 用户编号 */
    userId: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type LoginLogRespVO = {
    /** 日志编号 */
    id: number;
    /** 日志类型，参见 LoginLogTypeEnum 枚举类 */
    logType: number;
    /** 用户编号 */
    userId?: number;
    /** 用户类型，参见 UserTypeEnum 枚举 */
    userType: number;
    /** 链路追踪编号 */
    traceId?: string;
    /** 用户账号 */
    username: string;
    /** 登录结果，参见 LoginResultEnum 枚举类 */
    result: number;
    /** 用户 IP */
    userIp: string;
    /** 浏览器 UserAgent */
    userAgent?: string;
    /** 登录时间 */
    createTime: string;
  };

  type loginParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type logoutParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type MailAccountRespVO = {
    /** 编号 */
    id: number;
    /** 邮箱 */
    mail: string;
    /** 用户名 */
    username: string;
    /** 密码 */
    password: string;
    /** SMTP 服务器域名 */
    host: string;
    /** SMTP 服务器端口 */
    port: number;
    /** 是否开启 ssl */
    sslEnable: boolean;
    /** 是否开启 starttls */
    starttlsEnable: boolean;
    /** 创建时间 */
    createTime: string;
  };

  type MailAccountSaveReqVO = {
    /** 编号 */
    id?: number;
    /** 邮箱 */
    mail: string;
    /** 用户名 */
    username: string;
    /** 密码 */
    password: string;
    /** SMTP 服务器域名 */
    host: string;
    /** SMTP 服务器端口 */
    port: number;
    /** 是否开启 ssl */
    sslEnable: boolean;
    /** 是否开启 starttls */
    starttlsEnable: boolean;
  };

  type MailAccountSimpleRespVO = {
    /** 邮箱编号 */
    id: number;
    /** 邮箱 */
    mail: string;
  };

  type MailLogRespVO = {
    /** 编号 */
    id: number;
    /** 用户编号 */
    userId?: number;
    /** 用户类型，参见 UserTypeEnum 枚举 */
    userType?: string;
    /** 接收邮箱地址 */
    toMail: string;
    /** 邮箱账号编号 */
    accountId: number;
    /** 发送邮箱地址 */
    fromMail: string;
    /** 模板编号 */
    templateId: number;
    /** 模板编码 */
    templateCode: string;
    /** 模版发送人名称 */
    templateNickname?: string;
    /** 邮件标题 */
    templateTitle: string;
    /** 邮件内容 */
    templateContent: string;
    /** 邮件参数 */
    templateParams: Record<string, any>;
    /** 发送状态，参见 MailSendStatusEnum 枚举 */
    sendStatus: string;
    /** 发送时间 */
    sendTime?: string;
    /** 发送返回的消息 ID */
    sendMessageId?: string;
    /** 发送异常 */
    sendException?: string;
    /** 创建时间 */
    createTime: string;
  };

  type MailTemplateRespVO = {
    /** 编号 */
    id: number;
    /** 模版名称 */
    name: string;
    /** 模版编号 */
    code: string;
    /** 发送的邮箱账号编号 */
    accountId: number;
    /** 发送人名称 */
    nickname?: string;
    /** 标题 */
    title: string;
    /** 内容 */
    content: string;
    /** 参数数组 */
    params?: string[];
    /** 状态，参见 CommonStatusEnum 枚举 */
    status: number;
    /** 备注 */
    remark?: string;
    /** 创建时间 */
    createTime: string;
  };

  type MailTemplateSaveReqVO = {
    /** 编号 */
    id?: number;
    /** 模版名称 */
    name: string;
    /** 模版编号 */
    code: string;
    /** 发送的邮箱账号编号 */
    accountId: number;
    /** 发送人名称 */
    nickname?: string;
    /** 标题 */
    title: string;
    /** 内容 */
    content: string;
    /** 状态，参见 CommonStatusEnum 枚举 */
    status: number;
    /** 备注 */
    remark?: string;
  };

  type MailTemplateSendReqVO = {
    /** 接收邮箱 */
    mail: string;
    /** 模板编码 */
    templateCode: string;
    /** 模板参数 */
    templateParams?: Record<string, any>;
  };

  type MailTemplateSimpleRespVO = {
    /** 模版编号 */
    id: number;
    /** 模版名字 */
    name: string;
  };

  type mall40410Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type mall40411Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type mall40412Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type mall40414Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type mall40416Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type mall40417Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type mall40418Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type mall40419Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type mall4042Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type mall4043Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type mall4044Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type mall4045Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type mall4047Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type mall4049Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type mall404Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type MenuRespVO = {
    /** 菜单编号 */
    id: number;
    /** 菜单名称 */
    name: string;
    /** 权限标识,仅菜单类型为按钮时，才需要传递 */
    permission?: string;
    /** 类型，参见 MenuTypeEnum 枚举类 */
    type: number;
    /** 显示顺序 */
    sort: number;
    /** 父菜单 ID */
    parentId: number;
    /** 路由地址,仅菜单类型为菜单或者目录时，才需要传 */
    path?: string;
    /** 菜单图标,仅菜单类型为菜单或者目录时，才需要传 */
    icon?: string;
    /** 组件路径,仅菜单类型为菜单时，才需要传 */
    component?: string;
    /** 组件名 */
    componentName?: string;
    /** 状态,见 CommonStatusEnum 枚举 */
    status: number;
    /** 是否可见 */
    visible?: boolean;
    /** 是否缓存 */
    keepAlive?: boolean;
    /** 是否总是显示 */
    alwaysShow?: boolean;
    /** 创建时间 */
    createTime: string;
  };

  type MenuSaveVO = {
    /** 菜单编号 */
    id?: number;
    /** 菜单名称 */
    name: string;
    /** 权限标识,仅菜单类型为按钮时，才需要传递 */
    permission?: string;
    /** 类型，参见 MenuTypeEnum 枚举类 */
    type: number;
    /** 显示顺序 */
    sort: number;
    /** 父菜单 ID */
    parentId: number;
    /** 路由地址,仅菜单类型为菜单或者目录时，才需要传 */
    path?: string;
    /** 菜单图标,仅菜单类型为菜单或者目录时，才需要传 */
    icon?: string;
    /** 组件路径,仅菜单类型为菜单时，才需要传 */
    component?: string;
    /** 组件名 */
    componentName?: string;
    /** 状态,见 CommonStatusEnum 枚举 */
    status: number;
    /** 是否可见 */
    visible?: boolean;
    /** 是否缓存 */
    keepAlive?: boolean;
    /** 是否总是显示 */
    alwaysShow?: boolean;
  };

  type MenuSimpleRespVO = {
    /** 菜单编号 */
    id: number;
    /** 菜单名称 */
    name: string;
    /** 父菜单 ID */
    parentId: number;
    /** 类型，参见 MenuTypeEnum 枚举类 */
    type: number;
  };

  type MenuVO = {
    /** 菜单名称 */
    id: number;
    /** 父菜单 ID */
    parentId: number;
    /** 菜单名称 */
    name: string;
    /** 路由地址,仅菜单类型为菜单或者目录时，才需要传 */
    path?: string;
    /** 组件路径,仅菜单类型为菜单时，才需要传 */
    component?: string;
    /** 组件名 */
    componentName?: string;
    /** 菜单图标,仅菜单类型为菜单或者目录时，才需要传 */
    icon?: string;
    /** 是否可见 */
    visible: boolean;
    /** 是否缓存 */
    keepAlive: boolean;
    /** 是否总是显示 */
    alwaysShow?: boolean;
    children?: MenuVO[];
  };

  type mp4042Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type mp4043Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type mp4044Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type mp4045Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type mp404Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type NoticeRespVO = {
    /** 通知公告序号 */
    id: number;
    /** 公告标题 */
    title: string;
    /** 公告类型 */
    type: number;
    /** 公告内容 */
    content: string;
    /** 状态，参见 CommonStatusEnum 枚举类 */
    status: number;
    /** 创建时间 */
    createTime: string;
  };

  type NoticeSaveReqVO = {
    /** 岗位公告编号 */
    id?: number;
    /** 公告标题 */
    title: string;
    /** 公告类型 */
    type: number;
    /** 公告内容 */
    content: string;
    /** 状态，参见 CommonStatusEnum 枚举类 */
    status: number;
  };

  type NotifyMessageRespVO = {
    /** ID */
    id: number;
    /** 用户编号 */
    userId: number;
    /** 用户类型，参见 UserTypeEnum 枚举 */
    userType: string;
    /** 模版编号 */
    templateId: number;
    /** 模板编码 */
    templateCode: string;
    /** 模版发送人名称 */
    templateNickname: string;
    /** 模版内容 */
    templateContent: string;
    /** 模版类型 */
    templateType: number;
    /** 模版参数 */
    templateParams: Record<string, any>;
    /** 是否已读 */
    readStatus: boolean;
    /** 阅读时间 */
    readTime?: string;
    /** 创建时间 */
    createTime: string;
  };

  type NotifyTemplateRespVO = {
    /** ID */
    id: number;
    /** 模版名称 */
    name: string;
    /** 模版编码 */
    code: string;
    /** 模版类型，对应 system_notify_template_type 字典 */
    type: number;
    /** 发送人名称 */
    nickname: string;
    /** 模版内容 */
    content: string;
    /** 参数数组 */
    params?: string[];
    /** 状态，参见 CommonStatusEnum 枚举 */
    status: number;
    /** 备注 */
    remark?: string;
    /** 创建时间 */
    createTime: string;
  };

  type NotifyTemplateSaveReqVO = {
    /** ID */
    id?: number;
    /** 模版名称 */
    name: string;
    /** 模版编码 */
    code: string;
    /** 模版类型，对应 system_notify_template_type 字典 */
    type: number;
    /** 发送人名称 */
    nickname: string;
    /** 模版内容 */
    content: string;
    /** 状态，参见 CommonStatusEnum 枚举 */
    status: number;
    /** 备注 */
    remark?: string;
  };

  type NotifyTemplateSendReqVO = {
    /** 用户id */
    userId: number;
    /** 用户类型 */
    userType: number;
    /** 模板编码 */
    templateCode: string;
    /** 模板参数 */
    templateParams?: Record<string, any>;
  };

  type OAuth2AccessTokenRespVO = {
    /** 编号 */
    id: number;
    /** 访问令牌 */
    accessToken: string;
    /** 刷新令牌 */
    refreshToken: string;
    /** 用户编号 */
    userId: number;
    /** 用户类型，参见 UserTypeEnum 枚举 */
    userType: number;
    /** 客户端编号 */
    clientId: string;
    /** 创建时间 */
    createTime: string;
    /** 过期时间 */
    expiresTime: string;
  };

  type OAuth2ClientRespVO = {
    /** 编号 */
    id: number;
    /** 客户端编号 */
    clientId: string;
    /** 客户端密钥 */
    secret: string;
    /** 应用名 */
    name: string;
    /** 应用图标 */
    logo: string;
    /** 应用描述 */
    description?: string;
    /** 状态，参见 CommonStatusEnum 枚举 */
    status: number;
    /** 访问令牌的有效期 */
    accessTokenValiditySeconds: number;
    /** 刷新令牌的有效期 */
    refreshTokenValiditySeconds: number;
    /** 可重定向的 URI 地址 */
    redirectUris: string[];
    /** 授权类型，参见 OAuth2GrantTypeEnum 枚举 */
    authorizedGrantTypes: string[];
    /** 授权范围 */
    scopes?: string[];
    /** 自动通过的授权范围 */
    autoApproveScopes?: string[];
    /** 权限 */
    authorities?: string[];
    /** 资源 */
    resourceIds?: string[];
    /** 附加信息 */
    additionalInformation?: string;
    /** 创建时间 */
    createTime: string;
  };

  type OAuth2ClientSaveReqVO = {
    /** 编号 */
    id?: number;
    /** 客户端编号 */
    clientId: string;
    /** 客户端密钥 */
    secret: string;
    /** 应用名 */
    name: string;
    /** 应用图标 */
    logo: string;
    /** 应用描述 */
    description?: string;
    /** 状态，参见 CommonStatusEnum 枚举 */
    status: number;
    /** 访问令牌的有效期 */
    accessTokenValiditySeconds: number;
    /** 刷新令牌的有效期 */
    refreshTokenValiditySeconds: number;
    /** 可重定向的 URI 地址 */
    redirectUris: string[];
    /** 授权类型，参见 OAuth2GrantTypeEnum 枚举 */
    authorizedGrantTypes: string[];
    /** 授权范围 */
    scopes?: string[];
    /** 自动通过的授权范围 */
    autoApproveScopes?: string[];
    /** 权限 */
    authorities?: string[];
    /** 资源 */
    resourceIds?: string[];
    /** 附加信息 */
    additionalInformation?: string;
    additionalInformationJson?: boolean;
  };

  type OAuth2OpenAccessTokenRespVO = {
    /** 授权范围,如果多个授权范围，使用空格分隔 */
    scope?: string;
    /** 访问令牌 */
    access_token: string;
    /** 刷新令牌 */
    refresh_token: string;
    /** 令牌类型 */
    token_type: string;
    /** 过期时间,单位：秒 */
    expires_in: number;
  };

  type OAuth2OpenAuthorizeInfoRespVO = {
    client?: Client;
    /** scope 的选中信息,使用 List 保证有序性，Key 是 scope，Value 为是否选中 */
    scopes: KeyValueStringBoolean[];
  };

  type OAuth2OpenCheckTokenRespVO = {
    /** 授权范围 */
    scopes: string[];
    /** 过期时间，时间戳 / 1000，即单位：秒 */
    exp: number;
    /** 用户编号 */
    user_id: number;
    /** 用户类型，参见 UserTypeEnum 枚举 */
    user_type: number;
    /** 租户编号 */
    tenant_id: number;
    /** 客户端编号 */
    client_id: string;
    /** 访问令牌 */
    access_token: string;
  };

  type OAuth2UserInfoRespVO = {
    /** 用户编号 */
    id: number;
    /** 用户账号 */
    username: string;
    /** 用户昵称 */
    nickname: string;
    /** 用户邮箱 */
    email?: string;
    /** 手机号码 */
    mobile?: string;
    /** 用户性别，参见 SexEnum 枚举类 */
    sex?: number;
    /** 用户头像 */
    avatar?: string;
    dept?: Dept;
    posts?: Post[];
  };

  type OAuth2UserUpdateReqVO = {
    /** 用户昵称 */
    nickname: string;
    /** 用户邮箱 */
    email?: string;
    /** 手机号码 */
    mobile?: string;
    /** 用户性别，参见 SexEnum 枚举类 */
    sex?: number;
  };

  type OperateLogRespVO = {
    /** 日志编号 */
    id: number;
    /** 链路追踪编号 */
    traceId: string;
    /** 用户编号 */
    userId: number;
    /** 用户昵称 */
    userName: string;
    /** 操作模块类型 */
    type: string;
    /** 操作名 */
    subType: string;
    /** 操作模块业务编号 */
    bizId: number;
    /** 操作明细 */
    action?: string;
    /** 拓展字段 */
    extra?: string;
    /** 请求方法名 */
    requestMethod: string;
    /** 请求地址 */
    requestUrl: string;
    /** 用户 IP */
    userIp: string;
    /** 浏览器 UserAgent */
    userAgent: string;
    /** 创建时间 */
    createTime: string;
    transMap?: Record<string, any>;
  };

  type pageDictTypesParams = {
    /** 字典类型名称，模糊匹配 */
    name?: string;
    /** 字典类型，模糊匹配 */
    type?: string;
    /** 展示状态，参见 CommonStatusEnum 枚举类 */
    status?: string;
    /** 创建时间 */
    createTime?: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type pageOperateLogParams = {
    /** 用户编号 */
    userId?: string;
    /** 操作模块业务编号 */
    bizId?: string;
    /** 操作模块，模拟匹配 */
    type?: string;
    /** 操作名，模拟匹配 */
    subType?: string;
    /** 操作明细，模拟匹配 */
    action?: string;
    /** 开始时间 */
    createTime?: string;
    /** 页码，从 1 开始 */
    pageNo: string;
    /** 每页条数，最大值为 100 */
    pageSize: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type PageResultApiAccessLogRespVO = {
    /** 数据 */
    list: ApiAccessLogRespVO[];
    /** 总量 */
    total: number;
  };

  type PageResultApiErrorLogRespVO = {
    /** 数据 */
    list: ApiErrorLogRespVO[];
    /** 总量 */
    total: number;
  };

  type PageResultCodegenTableRespVO = {
    /** 数据 */
    list: CodegenTableRespVO[];
    /** 总量 */
    total: number;
  };

  type PageResultConfigRespVO = {
    /** 数据 */
    list: ConfigRespVO[];
    /** 总量 */
    total: number;
  };

  type PageResultDemo01ContactRespVO = {
    /** 数据 */
    list: Demo01ContactRespVO[];
    /** 总量 */
    total: number;
  };

  type PageResultDemo03CourseDO = {
    /** 数据 */
    list: Demo03CourseDO[];
    /** 总量 */
    total: number;
  };

  type PageResultDemo03GradeDO = {
    /** 数据 */
    list: Demo03GradeDO[];
    /** 总量 */
    total: number;
  };

  type PageResultDemo03StudentRespVO = {
    /** 数据 */
    list: Demo03StudentRespVO[];
    /** 总量 */
    total: number;
  };

  type PageResultDictDataRespVO = {
    /** 数据 */
    list: DictDataRespVO[];
    /** 总量 */
    total: number;
  };

  type PageResultDictTypeRespVO = {
    /** 数据 */
    list: DictTypeRespVO[];
    /** 总量 */
    total: number;
  };

  type PageResultFileConfigRespVO = {
    /** 数据 */
    list: FileConfigRespVO[];
    /** 总量 */
    total: number;
  };

  type PageResultFileRespVO = {
    /** 数据 */
    list: FileRespVO[];
    /** 总量 */
    total: number;
  };

  type PageResultGoViewProjectRespVO = {
    /** 数据 */
    list: GoViewProjectRespVO[];
    /** 总量 */
    total: number;
  };

  type PageResultJobLogRespVO = {
    /** 数据 */
    list: JobLogRespVO[];
    /** 总量 */
    total: number;
  };

  type PageResultJobRespVO = {
    /** 数据 */
    list: JobRespVO[];
    /** 总量 */
    total: number;
  };

  type PageResultLoginLogRespVO = {
    /** 数据 */
    list: LoginLogRespVO[];
    /** 总量 */
    total: number;
  };

  type PageResultMailAccountRespVO = {
    /** 数据 */
    list: MailAccountRespVO[];
    /** 总量 */
    total: number;
  };

  type PageResultMailLogRespVO = {
    /** 数据 */
    list: MailLogRespVO[];
    /** 总量 */
    total: number;
  };

  type PageResultMailTemplateRespVO = {
    /** 数据 */
    list: MailTemplateRespVO[];
    /** 总量 */
    total: number;
  };

  type PageResultNoticeRespVO = {
    /** 数据 */
    list: NoticeRespVO[];
    /** 总量 */
    total: number;
  };

  type PageResultNotifyMessageRespVO = {
    /** 数据 */
    list: NotifyMessageRespVO[];
    /** 总量 */
    total: number;
  };

  type PageResultNotifyTemplateRespVO = {
    /** 数据 */
    list: NotifyTemplateRespVO[];
    /** 总量 */
    total: number;
  };

  type PageResultOAuth2AccessTokenRespVO = {
    /** 数据 */
    list: OAuth2AccessTokenRespVO[];
    /** 总量 */
    total: number;
  };

  type PageResultOAuth2ClientRespVO = {
    /** 数据 */
    list: OAuth2ClientRespVO[];
    /** 总量 */
    total: number;
  };

  type PageResultOperateLogRespVO = {
    /** 数据 */
    list: OperateLogRespVO[];
    /** 总量 */
    total: number;
  };

  type PageResultPostRespVO = {
    /** 数据 */
    list: PostRespVO[];
    /** 总量 */
    total: number;
  };

  type PageResultProjectInfoRespVO = {
    /** 数据 */
    list: ProjectInfoRespVO[];
    /** 总量 */
    total: number;
  };

  type PageResultRoleRespVO = {
    /** 数据 */
    list: RoleRespVO[];
    /** 总量 */
    total: number;
  };

  type PageResultSmsChannelRespVO = {
    /** 数据 */
    list: SmsChannelRespVO[];
    /** 总量 */
    total: number;
  };

  type PageResultSmsLogRespVO = {
    /** 数据 */
    list: SmsLogRespVO[];
    /** 总量 */
    total: number;
  };

  type PageResultSmsTemplateRespVO = {
    /** 数据 */
    list: SmsTemplateRespVO[];
    /** 总量 */
    total: number;
  };

  type PageResultSocialClientRespVO = {
    /** 数据 */
    list: SocialClientRespVO[];
    /** 总量 */
    total: number;
  };

  type PageResultSocialUserRespVO = {
    /** 数据 */
    list: SocialUserRespVO[];
    /** 总量 */
    total: number;
  };

  type PageResultTenantPackageRespVO = {
    /** 数据 */
    list: TenantPackageRespVO[];
    /** 总量 */
    total: number;
  };

  type PageResultTenantRespVO = {
    /** 数据 */
    list: TenantRespVO[];
    /** 总量 */
    total: number;
  };

  type PageResultUserRespVO = {
    /** 数据 */
    list: UserRespVO[];
    /** 总量 */
    total: number;
  };

  type pay4042Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type pay4043Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type pay4044Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type pay4045Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type pay404Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type PermissionAssignRoleDataScopeReqVO = {
    /** 角色编号 */
    roleId: number;
    /** 数据范围，参见 DataScopeEnum 枚举类 */
    dataScope: number;
    /** 部门编号列表，只有范围类型为 DEPT_CUSTOM 时，该字段才需要 */
    dataScopeDeptIds?: number[];
  };

  type PermissionAssignRoleMenuReqVO = {
    /** 角色编号 */
    roleId: number;
    /** 菜单编号列表 */
    menuIds?: number[];
  };

  type PermissionAssignUserRoleReqVO = {
    /** 用户编号 */
    userId: number;
    /** 角色编号列表 */
    roleIds?: number[];
  };

  type PointVO = {
    secretKey?: string;
    x?: number;
    y?: number;
  };

  type Post = {
    /** 岗位编号 */
    id: number;
    /** 岗位名称 */
    name: string;
  };

  type postAccessTokenParams = {
    /** 授权类型 */
    grant_type: string;
    /** 授权范围 */
    code?: string;
    /** 重定向 URI */
    redirect_uri?: string;
    /** 状态 */
    state?: string;
    username?: string;
    password?: string;
    scope?: string;
    refresh_token?: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type PostRespVO = {
    /** 岗位序号 */
    id: number;
    /** 岗位名称 */
    name: string;
    /** 岗位编码 */
    code: string;
    /** 显示顺序 */
    sort: number;
    /** 状态，参见 CommonStatusEnum 枚举类 */
    status: number;
    /** 备注 */
    remark?: string;
    /** 创建时间 */
    createTime: string;
  };

  type PostSaveReqVO = {
    /** 岗位编号 */
    id?: number;
    /** 岗位名称 */
    name: string;
    /** 岗位编码 */
    code: string;
    /** 显示顺序 */
    sort: number;
    /** 状态 */
    status: number;
    /** 备注 */
    remark?: string;
  };

  type PostSimpleRespVO = {
    /** 岗位序号 */
    id: number;
    /** 岗位名称 */
    name: string;
  };

  type previewCodegenParams = {
    /** 表编号 */
    tableId: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type ProjectInfoRespVO = {
    /** ID */
    id: string;
    /** name */
    name?: string;
    /** 描述 */
    description?: string;
    /** 创建时间 */
    createTime: string;
  };

  type ProjectInfoSaveReqVO = {
    /** ID */
    id: string;
    /** name */
    name?: string;
    /** 描述 */
    description?: string;
  };

  type pushParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type receiveAliyunSmsStatusParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type receiveTencentSmsStatusParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type RedisMonitorRespVO = {
    /** Redis info 指令结果,具体字段，查看 Redis 文档 */
    info: Record<string, any>;
    /** Redis key 数量 */
    dbSize: number;
    /** CommandStat 数组 */
    commandStats: CommandStat[];
  };

  type refreshTokenParams = {
    /** 刷新令牌 */
    refreshToken: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type report4042Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type report4043Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type report4044Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type report4045Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type report404Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type ResponseModel = {
    repCode?: string;
    repMsg?: string;
    repData?: Record<string, any>;
    success?: boolean;
    repCodeEnum?:
      | 'SUCCESS'
      | 'ERROR'
      | 'EXCEPTION'
      | 'BLANK_ERROR'
      | 'NULL_ERROR'
      | 'NOT_NULL_ERROR'
      | 'NOT_EXIST_ERROR'
      | 'EXIST_ERROR'
      | 'PARAM_TYPE_ERROR'
      | 'PARAM_FORMAT_ERROR'
      | 'API_CAPTCHA_INVALID'
      | 'API_CAPTCHA_COORDINATE_ERROR'
      | 'API_CAPTCHA_ERROR'
      | 'API_CAPTCHA_BASEMAP_NULL'
      | 'API_REQ_LIMIT_GET_ERROR'
      | 'API_REQ_INVALID'
      | 'API_REQ_LOCK_GET_ERROR'
      | 'API_REQ_LIMIT_CHECK_ERROR'
      | 'API_REQ_LIMIT_VERIFY_ERROR';
  };

  type revokeTokenParams = {
    /** 访问令牌 */
    token: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type RoleRespVO = {
    /** 角色编号 */
    id: number;
    /** 角色名称 */
    name: string;
    /** 角色标志 */
    code: string;
    /** 显示顺序 */
    sort: number;
    /** 状态，参见 CommonStatusEnum 枚举类 */
    status: number;
    /** 角色类型，参见 RoleTypeEnum 枚举类 */
    type: number;
    /** 备注 */
    remark?: string;
    /** 数据范围，参见 DataScopeEnum 枚举类 */
    dataScope: number;
    /** 数据范围(指定部门数组) */
    dataScopeDeptIds?: number[];
    /** 创建时间 */
    createTime: string;
  };

  type RoleSaveReqVO = {
    /** 角色编号 */
    id?: number;
    /** 角色名称 */
    name: string;
    /** 角色编码 */
    code: string;
    /** 显示顺序 */
    sort: number;
    /** 备注 */
    remark?: string;
  };

  type RoleSimpleRespVO = {
    /** 角色编号 */
    id: number;
    /** 角色名称 */
    name: string;
  };

  type sendLoginSmsCodeParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type sendMailParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type sendNotifyParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type sendSmsParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type SmsChannelRespVO = {
    /** 编号 */
    id: number;
    /** 短信签名 */
    signature: string;
    /** 渠道编码，参见 SmsChannelEnum 枚举类 */
    code: string;
    /** 启用状态 */
    status: number;
    /** 备注 */
    remark?: string;
    /** 短信 API 的账号 */
    apiKey: string;
    /** 短信 API 的密钥 */
    apiSecret?: string;
    /** 短信发送回调 URL */
    callbackUrl?: string;
    /** 创建时间 */
    createTime: string;
  };

  type SmsChannelSaveReqVO = {
    /** 编号 */
    id?: number;
    /** 短信签名 */
    signature: string;
    /** 渠道编码，参见 SmsChannelEnum 枚举类 */
    code: string;
    /** 启用状态 */
    status: number;
    /** 备注 */
    remark?: string;
    /** 短信 API 的账号 */
    apiKey: string;
    /** 短信 API 的密钥 */
    apiSecret?: string;
    /** 短信发送回调 URL */
    callbackUrl?: string;
  };

  type SmsChannelSimpleRespVO = {
    /** 编号 */
    id: number;
    /** 短信签名 */
    signature: string;
    /** 渠道编码，参见 SmsChannelEnum 枚举类 */
    code: string;
  };

  type smsLoginParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type SmsLogRespVO = {
    /** 编号 */
    id: number;
    /** 短信渠道编号 */
    channelId: number;
    /** 短信渠道编码 */
    channelCode: string;
    /** 模板编号 */
    templateId: number;
    /** 模板编码 */
    templateCode: string;
    /** 短信类型 */
    templateType: number;
    /** 短信内容 */
    templateContent: string;
    /** 短信参数 */
    templateParams: Record<string, any>;
    /** 短信 API 的模板编号 */
    apiTemplateId: string;
    /** 手机号 */
    mobile: string;
    /** 用户编号 */
    userId?: number;
    /** 用户类型 */
    userType?: number;
    /** 发送状态 */
    sendStatus: number;
    /** 发送时间 */
    sendTime?: string;
    /** 短信 API 发送结果的编码 */
    apiSendCode?: string;
    /** 短信 API 发送失败的提示 */
    apiSendMsg?: string;
    /** 短信 API 发送返回的唯一请求 ID */
    apiRequestId?: string;
    /** 短信 API 发送返回的序号 */
    apiSerialNo?: string;
    /** 接收状态 */
    receiveStatus: number;
    /** 接收时间 */
    receiveTime?: string;
    /** API 接收结果的编码 */
    apiReceiveCode?: string;
    /** API 接收结果的说明 */
    apiReceiveMsg?: string;
    /** 创建时间 */
    createTime: string;
  };

  type SmsTemplateRespVO = {
    /** 编号 */
    id: number;
    /** 短信类型，参见 SmsTemplateTypeEnum 枚举类 */
    type: number;
    /** 开启状态，参见 CommonStatusEnum 枚举类 */
    status: number;
    /** 模板编码 */
    code: string;
    /** 模板名称 */
    name: string;
    /** 模板内容 */
    content: string;
    /** 参数数组 */
    params?: string[];
    /** 备注 */
    remark?: string;
    /** 短信 API 的模板编号 */
    apiTemplateId: string;
    /** 短信渠道编号 */
    channelId: number;
    /** 短信渠道编码 */
    channelCode: string;
    /** 创建时间 */
    createTime: string;
  };

  type SmsTemplateSaveReqVO = {
    /** 编号 */
    id?: number;
    /** 短信类型，参见 SmsTemplateTypeEnum 枚举类 */
    type: number;
    /** 开启状态，参见 CommonStatusEnum 枚举类 */
    status: number;
    /** 模板编码 */
    code: string;
    /** 模板名称 */
    name: string;
    /** 模板内容 */
    content: string;
    /** 备注 */
    remark?: string;
    /** 短信 API 的模板编号 */
    apiTemplateId: string;
    /** 短信渠道编号 */
    channelId: number;
  };

  type SmsTemplateSendReqVO = {
    /** 手机号 */
    mobile: string;
    /** 模板编码 */
    templateCode: string;
    /** 模板参数 */
    templateParams?: Record<string, any>;
  };

  type socialBindParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type SocialClientRespVO = {
    /** 编号 */
    id: number;
    /** 应用名 */
    name: string;
    /** 社交平台的类型 */
    socialType: number;
    /** 用户类型 */
    userType: number;
    /** 客户端编号 */
    clientId: string;
    /** 客户端密钥 */
    clientSecret: string;
    /** 授权方的网页应用编号 */
    agentId: string;
    /** 状态 */
    status: number;
    /** 创建时间 */
    createTime: string;
  };

  type SocialClientSaveReqVO = {
    /** 编号 */
    id?: number;
    /** 应用名 */
    name: string;
    /** 社交平台的类型 */
    socialType: number;
    /** 用户类型 */
    userType: number;
    /** 客户端编号 */
    clientId: string;
    /** 客户端密钥 */
    clientSecret: string;
    /** 授权方的网页应用编号 */
    agentId: string;
    /** 状态 */
    status: number;
  };

  type socialLoginParams = {
    /** 社交类型 */
    type: number;
    /** 回调路径 */
    redirectUri: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type socialQuickLoginParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type socialUnbindParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type SocialUser = {
    /** 社交平台的类型，参见 SocialTypeEnum 枚举类 */
    type: number;
    /** 社交用户的 openid */
    openid: string;
  };

  type SocialUserBindReqVO = {
    /** 社交平台的类型，参见 UserSocialTypeEnum 枚举值 */
    type: number;
    /** 授权码 */
    code: string;
    /** state */
    state: string;
  };

  type SocialUserRespVO = {
    /** 主键(自增策略) */
    id: number;
    /** 社交平台的类型 */
    type: number;
    /** 社交 openid */
    openid: string;
    /** 社交 token */
    token: string;
    /** 原始 Token 数据，一般是 JSON 格式 */
    rawTokenInfo: string;
    /** 用户昵称 */
    nickname: string;
    /** 用户头像 */
    avatar?: string;
    /** 原始用户数据，一般是 JSON 格式 */
    rawUserInfo: string;
    /** 最后一次的认证 code */
    code: string;
    /** 最后一次的认证 state */
    state: string;
    /** 创建时间 */
    createTime: string;
    /** 更新时间 */
    updateTime: string;
  };

  type SocialUserUnbindReqVO = {
    /** 社交平台的类型，参见 UserSocialTypeEnum 枚举值 */
    type: number;
    /** 社交用户的 openid */
    openid: string;
  };

  type syncCodegenFromDBParams = {
    /** 表编号 */
    tableId: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type syncJobParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type TenantPackageRespVO = {
    /** 套餐编号 */
    id: number;
    /** 套餐名 */
    name: string;
    /** 状态，参见 CommonStatusEnum 枚举 */
    status: number;
    /** 备注 */
    remark?: string;
    /** 关联的菜单编号 */
    menuIds: number[];
    /** 创建时间 */
    createTime: string;
  };

  type TenantPackageSaveReqVO = {
    /** 套餐编号 */
    id?: number;
    /** 套餐名 */
    name: string;
    /** 状态，参见 CommonStatusEnum 枚举 */
    status: number;
    /** 备注 */
    remark?: string;
    /** 关联的菜单编号 */
    menuIds: number[];
  };

  type TenantPackageSimpleRespVO = {
    /** 套餐编号 */
    id: number;
    /** 套餐名 */
    name: string;
  };

  type TenantRespVO = {
    /** 租户编号 */
    id: number;
    /** 租户名 */
    name: string;
    /** 联系人 */
    contactName: string;
    /** 联系手机 */
    contactMobile?: string;
    /** 租户状态 */
    status: number;
    /** 绑定域名 */
    website?: string;
    /** 租户套餐编号 */
    packageId: number;
    /** 过期时间 */
    expireTime: string;
    /** 账号数量 */
    accountCount: number;
    /** 创建时间 */
    createTime: string;
  };

  type TenantSaveReqVO = {
    /** 租户编号 */
    id?: number;
    /** 租户名 */
    name: string;
    /** 联系人 */
    contactName: string;
    /** 联系手机 */
    contactMobile?: string;
    /** 租户状态 */
    status: number;
    /** 绑定域名 */
    website?: string;
    /** 租户套餐编号 */
    packageId: number;
    /** 过期时间 */
    expireTime: string;
    /** 账号数量 */
    accountCount: number;
    /** 用户账号 */
    username: string;
    /** 密码 */
    password: string;
  };

  type TenantSimpleRespVO = {
    /** 租户编号 */
    id: number;
    /** 租户名 */
    name: string;
  };

  type testFileConfigParams = {
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type triggerJobParams = {
    /** 编号 */
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type updateAllNotifyMessageReadParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type updateApiErrorLogProcessParams = {
    /** 编号 */
    id: number;
    /** 处理状态 */
    processStatus: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type updateCodegenParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type updateConfigParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type updateDataSourceConfigParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type updateDemo01ContactParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type updateDemo02CategoryParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type updateDemo03CourseParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type updateDemo03GradeParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type updateDemo03StudentParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type updateDeptParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type updateDictDataParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type updateDictTypeParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type updateFileConfigMasterParams = {
    id: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type updateFileConfigParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type updateJobParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type updateJobStatusParams = {
    /** 编号 */
    id: number;
    /** 状态 */
    status: number;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type updateMailAccountParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type updateMailTemplateParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type updateMenuParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type updateNoticeParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type updateNotifyMessageReadParams = {
    /** 编号列表 */
    ids: number[];
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type updateNotifyTemplateParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type updateOAuth2ClientParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type updatePostParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type updateProjectInfoParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type updateProjectParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type updateRoleParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type updateSmsChannelParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type updateSmsTemplateParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type updateSocialClientParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type updateTenantPackageParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type updateTenantParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type updateUserAvatar1Params = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type updateUserAvatarParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type updateUserInfoParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type updateUserParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type updateUserPasswordParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type updateUserProfileParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type updateUserProfilePasswordParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type updateUserStatusParams = {
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type uploadFile1Params = {
    /** 文件附件 */
    path?: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type uploadFileParams = {
    /** 文件附件 */
    path?: string;
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  };

  type UserImportRespVO = {
    /** 创建成功的用户名数组 */
    createUsernames: string[];
    /** 更新成功的用户名数组 */
    updateUsernames: string[];
    /** 导入失败的用户集合，key 为用户名，value 为失败原因 */
    failureUsernames: Record<string, any>;
  };

  type UserProfileRespVO = {
    /** 用户编号 */
    id: number;
    /** 用户账号 */
    username: string;
    /** 用户昵称 */
    nickname: string;
    /** 用户邮箱 */
    email?: string;
    /** 手机号码 */
    mobile?: string;
    /** 用户性别，参见 SexEnum 枚举类 */
    sex?: number;
    /** 用户头像 */
    avatar?: string;
    /** 最后登录 IP */
    loginIp: string;
    /** 最后登录时间 */
    loginDate: string;
    /** 创建时间 */
    createTime: string;
    roles?: RoleSimpleRespVO[];
    dept?: DeptSimpleRespVO;
    posts?: PostSimpleRespVO[];
    socialUsers?: SocialUser[];
  };

  type UserProfileUpdatePasswordReqVO = {
    /** 旧密码 */
    oldPassword: string;
    /** 新密码 */
    newPassword: string;
  };

  type UserProfileUpdateReqVO = {
    /** 用户昵称 */
    nickname: string;
    /** 用户邮箱 */
    email?: string;
    /** 手机号码 */
    mobile?: string;
    /** 用户性别，参见 SexEnum 枚举类 */
    sex?: number;
  };

  type UserRespVO = {
    /** 用户编号 */
    id: number;
    /** 用户账号 */
    username: string;
    /** 用户昵称 */
    nickname: string;
    /** 备注 */
    remark?: string;
    /** 部门ID */
    deptId?: number;
    /** 部门名称 */
    deptName?: string;
    /** 岗位编号数组 */
    postIds?: number[];
    /** 用户邮箱 */
    email?: string;
    /** 手机号码 */
    mobile?: string;
    /** 用户性别，参见 SexEnum 枚举类 */
    sex?: number;
    /** 用户头像 */
    avatar?: string;
    /** 状态，参见 CommonStatusEnum 枚举类 */
    status: number;
    /** 最后登录 IP */
    loginIp: string;
    /** 最后登录时间 */
    loginDate: string;
    /** 创建时间 */
    createTime: string;
  };

  type UserSaveReqVO = {
    /** 用户编号 */
    id?: number;
    /** 用户账号 */
    username: string;
    /** 用户昵称 */
    nickname: string;
    /** 备注 */
    remark?: string;
    /** 部门编号 */
    deptId?: number;
    /** 岗位编号数组 */
    postIds?: number[];
    /** 用户邮箱 */
    email?: string;
    /** 手机号码 */
    mobile?: string;
    /** 用户性别，参见 SexEnum 枚举类 */
    sex?: number;
    /** 用户头像 */
    avatar?: string;
    /** 密码 */
    password: string;
  };

  type UserSimpleRespVO = {
    /** 用户编号 */
    id: number;
    /** 用户昵称 */
    nickname: string;
    /** 部门ID */
    deptId?: number;
    /** 部门名称 */
    deptName?: string;
  };

  type UserUpdatePasswordReqVO = {
    /** 用户编号 */
    id: number;
    /** 密码 */
    password: string;
  };

  type UserUpdateStatusReqVO = {
    /** 用户编号 */
    id: number;
    /** 状态，见 CommonStatusEnum 枚举 */
    status: number;
  };

  type UserVO = {
    /** 用户编号 */
    id: number;
    /** 用户昵称 */
    nickname: string;
    /** 用户头像 */
    avatar: string;
    /** 部门编号 */
    deptId: number;
  };
}
