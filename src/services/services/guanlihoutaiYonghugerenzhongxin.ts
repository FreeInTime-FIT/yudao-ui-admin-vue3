// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 获得登录用户信息 GET /admin-api/system/user/profile/get */
export async function getUserProfile(
  params: APITypes.getUserProfileParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultUserProfileRespVO>({
    url: `/admin-api/system/user/profile/get`,
    method: 'GET',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 修改用户个人信息 PUT /admin-api/system/user/profile/update */
export async function updateUserProfile(
  params: APITypes.updateUserProfileParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.UserProfileUpdateReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/user/profile/update`,
    method: 'PUT',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 上传用户个人头像 PUT /admin-api/system/user/profile/update-avatar */
export async function updateUserAvatar1(
  params: APITypes.updateUserAvatar1Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultString>({
    url: `/admin-api/system/user/profile/update-avatar`,
    method: 'PUT',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 上传用户个人头像 POST /admin-api/system/user/profile/update-avatar */
export async function updateUserAvatar(
  params: APITypes.updateUserAvatarParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultString>({
    url: `/admin-api/system/user/profile/update-avatar`,
    method: 'POST',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 修改用户个人密码 PUT /admin-api/system/user/profile/update-password */
export async function updateUserProfilePassword(
  params: APITypes.updateUserProfilePasswordParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.UserProfileUpdatePasswordReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/user/profile/update-password`,
    method: 'PUT',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}
