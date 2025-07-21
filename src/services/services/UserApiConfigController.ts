// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 创建用户API配置 POST /admin-api/system/user-api-config/create */
export async function createUserApiConfig(
  body: APITypes.UserApiConfigSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultLong>({
    url: `/admin-api/system/user-api-config/create`,
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 删除用户API配置 DELETE /admin-api/system/user-api-config/delete */
export async function deleteUserApiConfig(
  params: APITypes.deleteUserApiConfigParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/user-api-config/delete`,
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得用户API配置 GET /admin-api/system/user-api-config/get */
export async function getUserApiConfig(
  params: APITypes.getUserApiConfigParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultUserApiConfigRespVO>({
    url: `/admin-api/system/user-api-config/get`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得当前用户的API配置列表 GET /admin-api/system/user-api-config/list */
export async function getUserApiConfigList(options?: { [key: string]: any }) {
  return request<APITypes.CommonResultListUserApiConfigRespVO>({
    url: `/admin-api/system/user-api-config/list`,
    method: 'GET',
    ...(options || {}),
  });
}

/** 获得用户API配置分页 GET /admin-api/system/user-api-config/page */
export async function getUserApiConfigPage(
  params: APITypes.getUserApiConfigPageParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultUserApiConfigRespVO>({
    url: `/admin-api/system/user-api-config/page`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 重新生成API密钥 POST /admin-api/system/user-api-config/regenerate */
export async function regenerateApiKeys(
  params: APITypes.regenerateApiKeysParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultUserApiConfigRespVO>({
    url: `/admin-api/system/user-api-config/regenerate`,
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新用户API配置 PUT /admin-api/system/user-api-config/update */
export async function updateUserApiConfig(
  body: APITypes.UserApiConfigSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/user-api-config/update`,
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}
