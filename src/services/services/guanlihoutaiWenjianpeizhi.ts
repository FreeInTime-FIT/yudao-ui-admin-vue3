// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 创建文件配置 POST /admin-api/infra/file-config/create */
export async function createFileConfig(
  params: APITypes.createFileConfigParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.FileConfigSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultLong>({
    url: `/admin-api/infra/file-config/create`,
    method: 'POST',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 删除文件配置 DELETE /admin-api/infra/file-config/delete */
export async function deleteFileConfig(
  params: APITypes.deleteFileConfigParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/infra/file-config/delete`,
    method: 'DELETE',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得文件配置 GET /admin-api/infra/file-config/get */
export async function getFileConfig(
  params: APITypes.getFileConfigParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultFileConfigRespVO>({
    url: `/admin-api/infra/file-config/get`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得文件配置分页 GET /admin-api/infra/file-config/page */
export async function getFileConfigPage(
  params: APITypes.getFileConfigPageParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultFileConfigRespVO>({
    url: `/admin-api/infra/file-config/page`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 测试文件配置是否正确 GET /admin-api/infra/file-config/test */
export async function testFileConfig(
  params: APITypes.testFileConfigParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultString>({
    url: `/admin-api/infra/file-config/test`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新文件配置 PUT /admin-api/infra/file-config/update */
export async function updateFileConfig(
  params: APITypes.updateFileConfigParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.FileConfigSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/infra/file-config/update`,
    method: 'PUT',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 更新文件配置为 Master PUT /admin-api/infra/file-config/update-master */
export async function updateFileConfigMaster(
  params: APITypes.updateFileConfigMasterParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/infra/file-config/update-master`,
    method: 'PUT',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
