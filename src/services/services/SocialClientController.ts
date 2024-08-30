// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 创建社交客户端 POST /admin-api/system/social-client/create */
export async function createSocialClient(
  body: APITypes.SocialClientSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultLong>({
    url: `/admin-api/system/social-client/create`,
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 删除社交客户端 DELETE /admin-api/system/social-client/delete */
export async function deleteSocialClient(
  params: APITypes.deleteSocialClientParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/social-client/delete`,
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得社交客户端 GET /admin-api/system/social-client/get */
export async function getSocialClient(
  params: APITypes.getSocialClientParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultSocialClientRespVO>({
    url: `/admin-api/system/social-client/get`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得社交客户端分页 GET /admin-api/system/social-client/page */
export async function getSocialClientPage(
  params: APITypes.getSocialClientPageParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultSocialClientRespVO>({
    url: `/admin-api/system/social-client/page`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新社交客户端 PUT /admin-api/system/social-client/update */
export async function updateSocialClient(
  body: APITypes.SocialClientSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/social-client/update`,
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}
