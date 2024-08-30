// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 创建角色 POST /admin-api/system/role/create */
export async function createRole(body: APITypes.RoleSaveReqVO, options?: { [key: string]: any }) {
  return request<APITypes.CommonResultLong>({
    url: `/admin-api/system/role/create`,
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 删除角色 DELETE /admin-api/system/role/delete */
export async function deleteRole(
  params: APITypes.deleteRoleParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/role/delete`,
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 导出角色 Excel GET /admin-api/system/role/export-excel */
export async function exportUsingGET(
  params: APITypes.exportUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<any>({
    url: `/admin-api/system/role/export-excel`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得角色信息 GET /admin-api/system/role/get */
export async function getRole(params: APITypes.getRoleParams, options?: { [key: string]: any }) {
  return request<APITypes.CommonResultRoleRespVO>({
    url: `/admin-api/system/role/get`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取角色精简信息列表 只包含被开启的角色，主要用于前端的下拉选项 GET /admin-api/system/role/list-all-simple */
export async function getSimpleRoleList(options?: { [key: string]: any }) {
  return request<APITypes.CommonResultListRoleRespVO>({
    url: `/admin-api/system/role/list-all-simple`,
    method: 'GET',
    ...(options || {}),
  });
}

/** 获得角色分页 GET /admin-api/system/role/page */
export async function getRolePage(
  params: APITypes.getRolePageParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultRoleRespVO>({
    url: `/admin-api/system/role/page`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取角色精简信息列表 只包含被开启的角色，主要用于前端的下拉选项 GET /admin-api/system/role/simple-list */
export async function getSimpleRoleList_2(options?: { [key: string]: any }) {
  return request<APITypes.CommonResultListRoleRespVO>({
    url: `/admin-api/system/role/simple-list`,
    method: 'GET',
    ...(options || {}),
  });
}

/** 修改角色 PUT /admin-api/system/role/update */
export async function updateRole(body: APITypes.RoleSaveReqVO, options?: { [key: string]: any }) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/role/update`,
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}
