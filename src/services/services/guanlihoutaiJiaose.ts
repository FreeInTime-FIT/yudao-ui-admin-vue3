// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 创建角色 POST /admin-api/system/role/create */
export async function createRole(
  params: APITypes.createRoleParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.RoleSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultLong>({
    url: `/admin-api/system/role/create`,
    method: 'POST',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 删除角色 DELETE /admin-api/system/role/delete */
export async function deleteRole(
  params: APITypes.deleteRoleParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/role/delete`,
    method: 'DELETE',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 导出角色 Excel GET /admin-api/system/role/export-excel */
export async function exportUsingGET(
  params: APITypes.exportUsingGETParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<any>({
    url: `/admin-api/system/role/export-excel`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得角色信息 GET /admin-api/system/role/get */
export async function getRole(
  params: APITypes.getRoleParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultRoleRespVO>({
    url: `/admin-api/system/role/get`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取角色精简信息列表 只包含被开启的角色，主要用于前端的下拉选项 GET /admin-api/system/role/list-all-simple */
export async function getSimpleRoleList(
  params: APITypes.getSimpleRoleListParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultListRoleRespVO>({
    url: `/admin-api/system/role/list-all-simple`,
    method: 'GET',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 获得角色分页 GET /admin-api/system/role/page */
export async function getRolePage(
  params: APITypes.getRolePageParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultRoleRespVO>({
    url: `/admin-api/system/role/page`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取角色精简信息列表 只包含被开启的角色，主要用于前端的下拉选项 GET /admin-api/system/role/simple-list */
export async function getSimpleRoleList1(
  params: APITypes.getSimpleRoleList1Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultListRoleRespVO>({
    url: `/admin-api/system/role/simple-list`,
    method: 'GET',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 修改角色 PUT /admin-api/system/role/update */
export async function updateRole(
  params: APITypes.updateRoleParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.RoleSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/role/update`,
    method: 'PUT',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}
