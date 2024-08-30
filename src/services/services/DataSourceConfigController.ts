// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 创建数据源配置 POST /admin-api/infra/data-source-config/create */
export async function createDataSourceConfig(
  body: APITypes.DataSourceConfigSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultLong>({
    url: `/admin-api/infra/data-source-config/create`,
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 删除数据源配置 DELETE /admin-api/infra/data-source-config/delete */
export async function deleteDataSourceConfig(
  params: APITypes.deleteDataSourceConfigParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/infra/data-source-config/delete`,
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得数据源配置 GET /admin-api/infra/data-source-config/get */
export async function getDataSourceConfig(
  params: APITypes.getDataSourceConfigParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultDataSourceConfigRespVO>({
    url: `/admin-api/infra/data-source-config/get`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得数据源配置列表 GET /admin-api/infra/data-source-config/list */
export async function getDataSourceConfigList(options?: { [key: string]: any }) {
  return request<APITypes.CommonResultListDataSourceConfigRespVO>({
    url: `/admin-api/infra/data-source-config/list`,
    method: 'GET',
    ...(options || {}),
  });
}

/** 更新数据源配置 PUT /admin-api/infra/data-source-config/update */
export async function updateDataSourceConfig(
  body: APITypes.DataSourceConfigSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/infra/data-source-config/update`,
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}
