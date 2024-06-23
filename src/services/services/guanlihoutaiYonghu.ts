// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 新增用户 POST /admin-api/system/user/create */
export async function createUser(
  params: APITypes.createUserParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.UserSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultLong>({
    url: `/admin-api/system/user/create`,
    method: 'POST',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 删除用户 DELETE /admin-api/system/user/delete */
export async function deleteUser(
  params: APITypes.deleteUserParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/user/delete`,
    method: 'DELETE',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 导出用户 GET /admin-api/system/user/export */
export async function exportUserList(
  params: APITypes.exportUserListParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<any>({
    url: `/admin-api/system/user/export`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得用户详情 GET /admin-api/system/user/get */
export async function getUser(
  params: APITypes.getUserParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultUserRespVO>({
    url: `/admin-api/system/user/get`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得导入用户模板 GET /admin-api/system/user/get-import-template */
export async function importTemplate(
  params: APITypes.importTemplateParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<any>({
    url: `/admin-api/system/user/get-import-template`,
    method: 'GET',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 导入用户 POST /admin-api/system/user/import */
export async function importExcel(
  params: APITypes.importExcelParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultUserImportRespVO>({
    url: `/admin-api/system/user/import`,
    method: 'POST',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取用户精简信息列表 只包含被开启的用户，主要用于前端的下拉选项 GET /admin-api/system/user/list-all-simple */
export async function getSimpleUserList(
  params: APITypes.getSimpleUserListParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultListUserSimpleRespVO>({
    url: `/admin-api/system/user/list-all-simple`,
    method: 'GET',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 获得用户分页列表 GET /admin-api/system/user/page */
export async function getUserPage(
  params: APITypes.getUserPageParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultUserRespVO>({
    url: `/admin-api/system/user/page`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取用户精简信息列表 只包含被开启的用户，主要用于前端的下拉选项 GET /admin-api/system/user/simple-list */
export async function getSimpleUserList1(
  params: APITypes.getSimpleUserList1Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultListUserSimpleRespVO>({
    url: `/admin-api/system/user/simple-list`,
    method: 'GET',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 修改用户 PUT /admin-api/system/user/update */
export async function updateUser(
  params: APITypes.updateUserParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.UserSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/user/update`,
    method: 'PUT',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 重置用户密码 PUT /admin-api/system/user/update-password */
export async function updateUserPassword(
  params: APITypes.updateUserPasswordParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.UserUpdatePasswordReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/user/update-password`,
    method: 'PUT',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 修改用户状态 PUT /admin-api/system/user/update-status */
export async function updateUserStatus(
  params: APITypes.updateUserStatusParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.UserUpdateStatusReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/user/update-status`,
    method: 'PUT',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}
