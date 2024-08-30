// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 创建参数配置 POST /admin-api/infra/config/create */
export async function createConfig(
  body: APITypes.ConfigSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultLong>({
    url: `/admin-api/infra/config/create`,
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 删除参数配置 DELETE /admin-api/infra/config/delete */
export async function deleteConfig(
  params: APITypes.deleteConfigParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/infra/config/delete`,
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 导出参数配置 GET /admin-api/infra/config/export */
export async function exportConfig(
  params: APITypes.exportConfigParams,
  options?: { [key: string]: any },
) {
  return request<any>({
    url: `/admin-api/infra/config/export`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得参数配置 GET /admin-api/infra/config/get */
export async function getConfig(
  params: APITypes.getConfigParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultConfigRespVO>({
    url: `/admin-api/infra/config/get`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据参数键名查询参数值 不可见的配置，不允许返回给前端 GET /admin-api/infra/config/get-value-by-key */
export async function getConfigKey(
  params: APITypes.getConfigKeyParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultString>({
    url: `/admin-api/infra/config/get-value-by-key`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取参数配置分页 GET /admin-api/infra/config/page */
export async function getConfigPage(
  params: APITypes.getConfigPageParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultConfigRespVO>({
    url: `/admin-api/infra/config/page`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 修改参数配置 PUT /admin-api/infra/config/update */
export async function updateConfig(
  body: APITypes.ConfigSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/infra/config/update`,
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}
