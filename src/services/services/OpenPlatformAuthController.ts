// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 使用 appKey 和 appSecret 获取访问令牌 POST /admin-api/auth/token */
export async function getToken(
  body: APITypes.OpenPlatformTokenReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultOpenPlatformTokenRespVO>({
    url: `/admin-api/auth/token`,
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
