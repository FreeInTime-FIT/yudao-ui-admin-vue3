// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 社交绑定，使用 code 授权码 POST /admin-api/system/social-user/bind */
export async function socialBind(
  params: APITypes.socialBindParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.SocialUserBindReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/social-user/bind`,
    method: 'POST',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 获得社交用户 GET /admin-api/system/social-user/get */
export async function getSocialUser(
  params: APITypes.getSocialUserParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultSocialUserRespVO>({
    url: `/admin-api/system/social-user/get`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得社交用户分页 GET /admin-api/system/social-user/page */
export async function getSocialUserPage(
  params: APITypes.getSocialUserPageParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultSocialUserRespVO>({
    url: `/admin-api/system/social-user/page`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 取消社交绑定 DELETE /admin-api/system/social-user/unbind */
export async function socialUnbind(
  params: APITypes.socialUnbindParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.SocialUserUnbindReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/social-user/unbind`,
    method: 'DELETE',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}
