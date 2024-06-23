// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 获得用户基本信息 GET /admin-api/system/oauth2/user/get */
export async function getUserInfo(
  params: APITypes.getUserInfoParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultOAuth2UserInfoRespVO>({
    url: `/admin-api/system/oauth2/user/get`,
    method: 'GET',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 更新用户基本信息 PUT /admin-api/system/oauth2/user/update */
export async function updateUserInfo(
  params: APITypes.updateUserInfoParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.OAuth2UserUpdateReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/oauth2/user/update`,
    method: 'PUT',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}
