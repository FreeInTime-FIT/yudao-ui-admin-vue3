// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 获得登录用户信息 GET /admin-api/system/user/profile/get */
export async function getUserProfile(options?: { [key: string]: any }) {
  return request<APITypes.CommonResultUserProfileRespVO>({
    url: `/admin-api/system/user/profile/get`,
    method: 'GET',
    ...(options || {}),
  });
}

/** 修改用户个人信息 PUT /admin-api/system/user/profile/update */
export async function updateUserProfile(
  body: APITypes.UserProfileUpdateReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/user/profile/update`,
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** 上传用户个人头像 PUT /admin-api/system/user/profile/update-avatar */
export async function updateUserAvatar(options?: { [key: string]: any }) {
  return request<APITypes.CommonResultString>({
    url: `/admin-api/system/user/profile/update-avatar`,
    method: 'PUT',
    ...(options || {}),
  });
}

/** 上传用户个人头像 POST /admin-api/system/user/profile/update-avatar */
export async function updateUserAvatar_2(options?: { [key: string]: any }) {
  return request<APITypes.CommonResultString>({
    url: `/admin-api/system/user/profile/update-avatar`,
    method: 'POST',
    ...(options || {}),
  });
}

/** 修改用户个人密码 PUT /admin-api/system/user/profile/update-password */
export async function updateUserProfilePassword(
  body: APITypes.UserProfileUpdatePasswordReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/user/profile/update-password`,
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}
