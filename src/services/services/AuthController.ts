// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 获取登录用户的权限信息 GET /admin-api/system/auth/get-permission-info */
export async function getPermissionInfo(options?: { [key: string]: any }) {
  return request<APITypes.CommonResultAuthPermissionInfoRespVO>({
    url: `/admin-api/system/auth/get-permission-info`,
    method: 'GET',
    ...(options || {}),
  });
}

/** 使用账号密码登录 POST /admin-api/system/auth/login */
export async function login(body: APITypes.AuthLoginReqVO, options?: { [key: string]: any }) {
  return request<APITypes.CommonResultAuthLoginRespVO>({
    url: `/admin-api/system/auth/login`,
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 登出系统 POST /admin-api/system/auth/logout */
export async function logout(options?: { [key: string]: any }) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/auth/logout`,
    method: 'POST',
    ...(options || {}),
  });
}

/** 刷新令牌 POST /admin-api/system/auth/refresh-token */
export async function refreshToken(
  params: APITypes.refreshTokenParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultAuthLoginRespVO>({
    url: `/admin-api/system/auth/refresh-token`,
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 发送手机验证码 POST /admin-api/system/auth/send-sms-code */
export async function sendLoginSmsCode(
  body: APITypes.AuthSmsSendReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/auth/send-sms-code`,
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 使用短信验证码登录 POST /admin-api/system/auth/sms-login */
export async function smsLogin(body: APITypes.AuthSmsLoginReqVO, options?: { [key: string]: any }) {
  return request<APITypes.CommonResultAuthLoginRespVO>({
    url: `/admin-api/system/auth/sms-login`,
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 社交授权的跳转 GET /admin-api/system/auth/social-auth-redirect */
export async function socialLogin(
  params: APITypes.socialLoginParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultString>({
    url: `/admin-api/system/auth/social-auth-redirect`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 社交快捷登录，使用 code 授权码 适合未登录的用户，但是社交账号已绑定用户 POST /admin-api/system/auth/social-login */
export async function socialQuickLogin(
  body: APITypes.AuthSocialLoginReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultAuthLoginRespVO>({
    url: `/admin-api/system/auth/social-login`,
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
