// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 创建 OAuth2 客户端 POST /admin-api/system/oauth2-client/create */
export async function createOAuth2Client(
  params: APITypes.createOAuth2ClientParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.OAuth2ClientSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultLong>({
    url: `/admin-api/system/oauth2-client/create`,
    method: 'POST',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 删除 OAuth2 客户端 DELETE /admin-api/system/oauth2-client/delete */
export async function deleteOAuth2Client(
  params: APITypes.deleteOAuth2ClientParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/oauth2-client/delete`,
    method: 'DELETE',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得 OAuth2 客户端 GET /admin-api/system/oauth2-client/get */
export async function getOAuth2Client(
  params: APITypes.getOAuth2ClientParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultOAuth2ClientRespVO>({
    url: `/admin-api/system/oauth2-client/get`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得 OAuth2 客户端分页 GET /admin-api/system/oauth2-client/page */
export async function getOAuth2ClientPage(
  params: APITypes.getOAuth2ClientPageParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultOAuth2ClientRespVO>({
    url: `/admin-api/system/oauth2-client/page`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新 OAuth2 客户端 PUT /admin-api/system/oauth2-client/update */
export async function updateOAuth2Client(
  params: APITypes.updateOAuth2ClientParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.OAuth2ClientSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/oauth2-client/update`,
    method: 'PUT',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}
