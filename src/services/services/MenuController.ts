// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 创建菜单 POST /admin-api/system/menu/create */
export async function createMenu(body: APITypes.MenuSaveVO, options?: { [key: string]: any }) {
  return request<APITypes.CommonResultLong>({
    url: `/admin-api/system/menu/create`,
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 删除菜单 DELETE /admin-api/system/menu/delete */
export async function deleteMenu(
  params: APITypes.deleteMenuParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/menu/delete`,
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取菜单信息 GET /admin-api/system/menu/get */
export async function getMenu(params: APITypes.getMenuParams, options?: { [key: string]: any }) {
  return request<APITypes.CommonResultMenuRespVO>({
    url: `/admin-api/system/menu/get`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取菜单列表 用于【菜单管理】界面 GET /admin-api/system/menu/list */
export async function getMenuList(
  params: APITypes.getMenuListParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultListMenuRespVO>({
    url: `/admin-api/system/menu/list`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取菜单精简信息列表 只包含被开启的菜单，用于【角色分配菜单】功能的选项。在多租户的场景下，会只返回租户所在套餐有的菜单 GET /admin-api/system/menu/list-all-simple */
export async function getSimpleMenuList(options?: { [key: string]: any }) {
  return request<APITypes.CommonResultListMenuSimpleRespVO>({
    url: `/admin-api/system/menu/list-all-simple`,
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取菜单精简信息列表 只包含被开启的菜单，用于【角色分配菜单】功能的选项。在多租户的场景下，会只返回租户所在套餐有的菜单 GET /admin-api/system/menu/simple-list */
export async function getSimpleMenuList_2(options?: { [key: string]: any }) {
  return request<APITypes.CommonResultListMenuSimpleRespVO>({
    url: `/admin-api/system/menu/simple-list`,
    method: 'GET',
    ...(options || {}),
  });
}

/** 修改菜单 PUT /admin-api/system/menu/update */
export async function updateMenu(body: APITypes.MenuSaveVO, options?: { [key: string]: any }) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/menu/update`,
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}
