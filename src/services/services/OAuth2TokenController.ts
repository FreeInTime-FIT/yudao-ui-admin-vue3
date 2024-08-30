// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 删除访问令牌 DELETE /admin-api/system/oauth2-token/delete */
export async function deleteAccessToken(
  params: APITypes.deleteAccessTokenParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/oauth2-token/delete`,
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得访问令牌分页 只返回有效期内的 GET /admin-api/system/oauth2-token/page */
export async function getAccessTokenPage(
  params: APITypes.getAccessTokenPageParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultOAuth2AccessTokenRespVO>({
    url: `/admin-api/system/oauth2-token/page`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
