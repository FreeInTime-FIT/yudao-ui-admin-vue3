// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 创建数据源配置 POST /admin-api/infra/data-source-config/create */
export async function createDataSourceConfig(
  params: APITypes.createDataSourceConfigParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.DataSourceConfigSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultLong>({
    url: `/admin-api/infra/data-source-config/create`,
    method: 'POST',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 删除数据源配置 DELETE /admin-api/infra/data-source-config/delete */
export async function deleteDataSourceConfig(
  params: APITypes.deleteDataSourceConfigParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/infra/data-source-config/delete`,
    method: 'DELETE',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得数据源配置 GET /admin-api/infra/data-source-config/get */
export async function getDataSourceConfig(
  params: APITypes.getDataSourceConfigParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultDataSourceConfigRespVO>({
    url: `/admin-api/infra/data-source-config/get`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得数据源配置列表 GET /admin-api/infra/data-source-config/list */
export async function getDataSourceConfigList(
  params: APITypes.getDataSourceConfigListParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultListDataSourceConfigRespVO>({
    url: `/admin-api/infra/data-source-config/list`,
    method: 'GET',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 更新数据源配置 PUT /admin-api/infra/data-source-config/update */
export async function updateDataSourceConfig(
  params: APITypes.updateDataSourceConfigParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.DataSourceConfigSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/infra/data-source-config/update`,
    method: 'PUT',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}
