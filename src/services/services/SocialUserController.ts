// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 社交绑定，使用 code 授权码 POST /admin-api/system/social-user/bind */
export async function socialBind(
  body: APITypes.SocialUserBindReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/social-user/bind`,
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 获得社交用户 GET /admin-api/system/social-user/get */
export async function getSocialUser(
  params: APITypes.getSocialUserParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultSocialUserRespVO>({
    url: `/admin-api/system/social-user/get`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得社交用户分页 GET /admin-api/system/social-user/page */
export async function getSocialUserPage(
  params: APITypes.getSocialUserPageParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultSocialUserRespVO>({
    url: `/admin-api/system/social-user/page`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 取消社交绑定 DELETE /admin-api/system/social-user/unbind */
export async function socialUnbind(
  body: APITypes.SocialUserUnbindReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/social-user/unbind`,
    method: 'DELETE',
    data: body,
    ...(options || {}),
  });
}
