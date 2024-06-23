// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 创建租户 POST /admin-api/system/tenant/create */
export async function createTenant(
  params: APITypes.createTenantParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.TenantSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultLong>({
    url: `/admin-api/system/tenant/create`,
    method: 'POST',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 删除租户 DELETE /admin-api/system/tenant/delete */
export async function deleteTenant(
  params: APITypes.deleteTenantParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/tenant/delete`,
    method: 'DELETE',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 导出租户 Excel GET /admin-api/system/tenant/export-excel */
export async function exportTenantExcel(
  params: APITypes.exportTenantExcelParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<any>({
    url: `/admin-api/system/tenant/export-excel`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得租户 GET /admin-api/system/tenant/get */
export async function getTenant(
  params: APITypes.getTenantParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultTenantRespVO>({
    url: `/admin-api/system/tenant/get`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 使用域名，获得租户信息 登录界面，根据用户的域名，获得租户信息 GET /admin-api/system/tenant/get-by-website */
export async function getTenantByWebsite(
  params: APITypes.getTenantByWebsiteParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultTenantSimpleRespVO>({
    url: `/admin-api/system/tenant/get-by-website`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 使用租户名，获得租户编号 登录界面，根据用户的租户名，获得租户编号 GET /admin-api/system/tenant/get-id-by-name */
export async function getTenantIdByName(
  params: APITypes.getTenantIdByNameParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultLong>({
    url: `/admin-api/system/tenant/get-id-by-name`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得租户分页 GET /admin-api/system/tenant/page */
export async function getTenantPage(
  params: APITypes.getTenantPageParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultTenantRespVO>({
    url: `/admin-api/system/tenant/page`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新租户 PUT /admin-api/system/tenant/update */
export async function updateTenant(
  params: APITypes.updateTenantParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.TenantSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/tenant/update`,
    method: 'PUT',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}
