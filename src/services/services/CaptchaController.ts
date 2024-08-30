// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 校验验证码 POST /admin-api/system/captcha/check */
export async function check(body: APITypes.CaptchaVO, options?: { [key: string]: any }) {
  return request<APITypes.ResponseModel>({
    url: `/admin-api/system/captcha/check`,
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 获得验证码 POST /admin-api/system/captcha/get */
export async function get(body: APITypes.CaptchaVO, options?: { [key: string]: any }) {
  return request<APITypes.ResponseModel>({
    url: `/admin-api/system/captcha/get`,
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
