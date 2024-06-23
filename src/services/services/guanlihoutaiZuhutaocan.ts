// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 创建租户套餐 POST /admin-api/system/tenant-package/create */
export async function createTenantPackage(
  params: APITypes.createTenantPackageParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.TenantPackageSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultLong>({
    url: `/admin-api/system/tenant-package/create`,
    method: 'POST',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 删除租户套餐 DELETE /admin-api/system/tenant-package/delete */
export async function deleteTenantPackage(
  params: APITypes.deleteTenantPackageParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/tenant-package/delete`,
    method: 'DELETE',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得租户套餐 GET /admin-api/system/tenant-package/get */
export async function getTenantPackage(
  params: APITypes.getTenantPackageParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultTenantPackageRespVO>({
    url: `/admin-api/system/tenant-package/get`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取租户套餐精简信息列表 只包含被开启的租户套餐，主要用于前端的下拉选项 GET /admin-api/system/tenant-package/get-simple-list */
export async function getTenantPackageList(
  params: APITypes.getTenantPackageListParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultListTenantPackageSimpleRespVO>({
    url: `/admin-api/system/tenant-package/get-simple-list`,
    method: 'GET',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 获得租户套餐分页 GET /admin-api/system/tenant-package/page */
export async function getTenantPackagePage(
  params: APITypes.getTenantPackagePageParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultTenantPackageRespVO>({
    url: `/admin-api/system/tenant-package/page`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取租户套餐精简信息列表 只包含被开启的租户套餐，主要用于前端的下拉选项 GET /admin-api/system/tenant-package/simple-list */
export async function getTenantPackageList1(
  params: APITypes.getTenantPackageList1Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultListTenantPackageSimpleRespVO>({
    url: `/admin-api/system/tenant-package/simple-list`,
    method: 'GET',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 更新租户套餐 PUT /admin-api/system/tenant-package/update */
export async function updateTenantPackage(
  params: APITypes.updateTenantPackageParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.TenantPackageSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/tenant-package/update`,
    method: 'PUT',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}
