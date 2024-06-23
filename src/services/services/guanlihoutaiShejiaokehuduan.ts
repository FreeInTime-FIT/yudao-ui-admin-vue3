// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 创建社交客户端 POST /admin-api/system/social-client/create */
export async function createSocialClient(
  params: APITypes.createSocialClientParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.SocialClientSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultLong>({
    url: `/admin-api/system/social-client/create`,
    method: 'POST',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 删除社交客户端 DELETE /admin-api/system/social-client/delete */
export async function deleteSocialClient(
  params: APITypes.deleteSocialClientParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/social-client/delete`,
    method: 'DELETE',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得社交客户端 GET /admin-api/system/social-client/get */
export async function getSocialClient(
  params: APITypes.getSocialClientParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultSocialClientRespVO>({
    url: `/admin-api/system/social-client/get`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得社交客户端分页 GET /admin-api/system/social-client/page */
export async function getSocialClientPage(
  params: APITypes.getSocialClientPageParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultSocialClientRespVO>({
    url: `/admin-api/system/social-client/page`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新社交客户端 PUT /admin-api/system/social-client/update */
export async function updateSocialClient(
  params: APITypes.updateSocialClientParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.SocialClientSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/social-client/update`,
    method: 'PUT',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}
