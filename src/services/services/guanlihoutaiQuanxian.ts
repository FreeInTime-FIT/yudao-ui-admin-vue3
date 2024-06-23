// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 赋予角色数据权限 POST /admin-api/system/permission/assign-role-data-scope */
export async function assignRoleDataScope(
  params: APITypes.assignRoleDataScopeParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.PermissionAssignRoleDataScopeReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/permission/assign-role-data-scope`,
    method: 'POST',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 赋予角色菜单 POST /admin-api/system/permission/assign-role-menu */
export async function assignRoleMenu(
  params: APITypes.assignRoleMenuParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.PermissionAssignRoleMenuReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/permission/assign-role-menu`,
    method: 'POST',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 赋予用户角色 POST /admin-api/system/permission/assign-user-role */
export async function assignUserRole(
  params: APITypes.assignUserRoleParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.PermissionAssignUserRoleReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/permission/assign-user-role`,
    method: 'POST',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 获得角色拥有的菜单编号 GET /admin-api/system/permission/list-role-menus */
export async function getRoleMenuList(
  params: APITypes.getRoleMenuListParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultSetLong>({
    url: `/admin-api/system/permission/list-role-menus`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得管理员拥有的角色编号列表 GET /admin-api/system/permission/list-user-roles */
export async function listAdminRoles(
  params: APITypes.listAdminRolesParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultSetLong>({
    url: `/admin-api/system/permission/list-user-roles`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
