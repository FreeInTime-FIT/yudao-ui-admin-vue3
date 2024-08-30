// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 获得用户基本信息 GET /admin-api/system/oauth2/user/get */
export async function getUserInfo(options?: { [key: string]: any }) {
  return request<APITypes.CommonResultOAuth2UserInfoRespVO>({
    url: `/admin-api/system/oauth2/user/get`,
    method: 'GET',
    ...(options || {}),
  });
}

/** 更新用户基本信息 PUT /admin-api/system/oauth2/user/update */
export async function updateUserInfo(
  body: APITypes.OAuth2UserUpdateReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/oauth2/user/update`,
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}
