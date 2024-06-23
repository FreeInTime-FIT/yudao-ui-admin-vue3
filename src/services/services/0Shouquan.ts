// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 获得授权信息 适合 code 授权码模式，或者 implicit 简化模式；在 sso.vue 单点登录界面被【获取】调用 GET /admin-api/system/oauth2/authorize */
export async function authorize(
  params: APITypes.authorizeParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultOAuth2OpenAuthorizeInfoRespVO>({
    url: `/admin-api/system/oauth2/authorize`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 申请授权 适合 code 授权码模式，或者 implicit 简化模式；在 sso.vue 单点登录界面被【提交】调用 POST /admin-api/system/oauth2/authorize */
export async function approveOrDeny(
  params: APITypes.approveOrDenyParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultString>({
    url: `/admin-api/system/oauth2/authorize`,
    method: 'POST',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 校验访问令牌 POST /admin-api/system/oauth2/check-token */
export async function checkToken(
  params: APITypes.checkTokenParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultOAuth2OpenCheckTokenRespVO>({
    url: `/admin-api/system/oauth2/check-token`,
    method: 'POST',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得访问令牌 适合 code 授权码模式，或者 implicit 简化模式；在 sso.vue 单点登录界面被【获取】调用 POST /admin-api/system/oauth2/token */
export async function postAccessToken(
  params: APITypes.postAccessTokenParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultOAuth2OpenAccessTokenRespVO>({
    url: `/admin-api/system/oauth2/token`,
    method: 'POST',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 删除访问令牌 DELETE /admin-api/system/oauth2/token */
export async function revokeToken(
  params: APITypes.revokeTokenParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/oauth2/token`,
    method: 'DELETE',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
