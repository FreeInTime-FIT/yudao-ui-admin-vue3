// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 基于数据库的表结构，创建代码生成器的表和字段定义 POST /admin-api/infra/codegen/create-list */
export async function createCodegenList(
  params: APITypes.createCodegenListParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.CodegenCreateListReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultListLong>({
    url: `/admin-api/infra/codegen/create-list`,
    method: 'POST',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 获得数据库自带的表定义列表 会过滤掉已经导入 Codegen 的表 GET /admin-api/infra/codegen/db/table/list */
export async function getDatabaseTableList(
  params: APITypes.getDatabaseTableListParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultListDatabaseTableRespVO>({
    url: `/admin-api/infra/codegen/db/table/list`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 删除数据库的表和字段定义 DELETE /admin-api/infra/codegen/delete */
export async function deleteCodegen(
  params: APITypes.deleteCodegenParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/infra/codegen/delete`,
    method: 'DELETE',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得表和字段的明细 GET /admin-api/infra/codegen/detail */
export async function getCodegenDetail(
  params: APITypes.getCodegenDetailParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultCodegenDetailRespVO>({
    url: `/admin-api/infra/codegen/detail`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 下载生成代码 GET /admin-api/infra/codegen/download */
export async function downloadCodegen(
  params: APITypes.downloadCodegenParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<any>({
    url: `/admin-api/infra/codegen/download`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 预览生成代码 GET /admin-api/infra/codegen/preview */
export async function previewCodegen(
  params: APITypes.previewCodegenParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultListCodegenPreviewRespVO>({
    url: `/admin-api/infra/codegen/preview`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 基于数据库的表结构，同步数据库的表和字段定义 PUT /admin-api/infra/codegen/sync-from-db */
export async function syncCodegenFromDB(
  params: APITypes.syncCodegenFromDBParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/infra/codegen/sync-from-db`,
    method: 'PUT',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得表定义列表 GET /admin-api/infra/codegen/table/list */
export async function getCodegenTableList(
  params: APITypes.getCodegenTableListParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultListCodegenTableRespVO>({
    url: `/admin-api/infra/codegen/table/list`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得表定义分页 GET /admin-api/infra/codegen/table/page */
export async function getCodegenTablePage(
  params: APITypes.getCodegenTablePageParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultCodegenTableRespVO>({
    url: `/admin-api/infra/codegen/table/page`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新数据库的表和字段定义 PUT /admin-api/infra/codegen/update */
export async function updateCodegen(
  params: APITypes.updateCodegenParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.CodegenUpdateReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/infra/codegen/update`,
    method: 'PUT',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}
