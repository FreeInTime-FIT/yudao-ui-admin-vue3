// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 校验验证码 POST /admin-api/system/captcha/check */
export async function check(
  params: APITypes.checkParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.CaptchaVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.ResponseModel>({
    url: `/admin-api/system/captcha/check`,
    method: 'POST',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 获得验证码 POST /admin-api/system/captcha/get */
export async function get(
  params: APITypes.getParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.CaptchaVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.ResponseModel>({
    url: `/admin-api/system/captcha/get`,
    method: 'POST',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}
