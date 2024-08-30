// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 赋予角色数据权限 POST /admin-api/system/permission/assign-role-data-scope */
export async function assignRoleDataScope(
  body: APITypes.PermissionAssignRoleDataScopeReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/permission/assign-role-data-scope`,
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 赋予角色菜单 POST /admin-api/system/permission/assign-role-menu */
export async function assignRoleMenu(
  body: APITypes.PermissionAssignRoleMenuReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/permission/assign-role-menu`,
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 赋予用户项目 POST /admin-api/system/permission/assign-user-project */
export async function assignUserProject(
  body: APITypes.PermissionAssignUserRoleReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/permission/assign-user-project`,
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 赋予用户角色 POST /admin-api/system/permission/assign-user-role */
export async function assignUserRole(
  body: APITypes.PermissionAssignUserRoleReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/permission/assign-user-role`,
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 获得角色拥有的菜单编号 GET /admin-api/system/permission/list-role-menus */
export async function getRoleMenuList(
  params: APITypes.getRoleMenuListParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultSetLong>({
    url: `/admin-api/system/permission/list-role-menus`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得用户所拥有的项目列表 GET /admin-api/system/permission/list-user-projects */
export async function listUserProjects(
  params: APITypes.listUserProjectsParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultSetLong>({
    url: `/admin-api/system/permission/list-user-projects`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得管理员拥有的角色编号列表 GET /admin-api/system/permission/list-user-roles */
export async function listAdminRoles(
  params: APITypes.listAdminRolesParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultSetLong>({
    url: `/admin-api/system/permission/list-user-roles`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
