// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 创建租户套餐 POST /admin-api/system/tenant-package/create */
export async function createTenantPackage(
  body: APITypes.TenantPackageSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultLong>({
    url: `/admin-api/system/tenant-package/create`,
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 删除租户套餐 DELETE /admin-api/system/tenant-package/delete */
export async function deleteTenantPackage(
  params: APITypes.deleteTenantPackageParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/tenant-package/delete`,
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得租户套餐 GET /admin-api/system/tenant-package/get */
export async function getTenantPackage(
  params: APITypes.getTenantPackageParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultTenantPackageRespVO>({
    url: `/admin-api/system/tenant-package/get`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取租户套餐精简信息列表 只包含被开启的租户套餐，主要用于前端的下拉选项 GET /admin-api/system/tenant-package/get-simple-list */
export async function getTenantPackageList(options?: { [key: string]: any }) {
  return request<APITypes.CommonResultListTenantPackageSimpleRespVO>({
    url: `/admin-api/system/tenant-package/get-simple-list`,
    method: 'GET',
    ...(options || {}),
  });
}

/** 获得租户套餐分页 GET /admin-api/system/tenant-package/page */
export async function getTenantPackagePage(
  params: APITypes.getTenantPackagePageParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultTenantPackageRespVO>({
    url: `/admin-api/system/tenant-package/page`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取租户套餐精简信息列表 只包含被开启的租户套餐，主要用于前端的下拉选项 GET /admin-api/system/tenant-package/simple-list */
export async function getTenantPackageList_2(options?: { [key: string]: any }) {
  return request<APITypes.CommonResultListTenantPackageSimpleRespVO>({
    url: `/admin-api/system/tenant-package/simple-list`,
    method: 'GET',
    ...(options || {}),
  });
}

/** 更新租户套餐 PUT /admin-api/system/tenant-package/update */
export async function updateTenantPackage(
  body: APITypes.TenantPackageSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/tenant-package/update`,
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}
