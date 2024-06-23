// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 创建示例联系人 POST /admin-api/infra/demo01-contact/create */
export async function createDemo01Contact(
  params: APITypes.createDemo01ContactParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.Demo01ContactSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultLong>({
    url: `/admin-api/infra/demo01-contact/create`,
    method: 'POST',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 删除示例联系人 DELETE /admin-api/infra/demo01-contact/delete */
export async function deleteDemo01Contact(
  params: APITypes.deleteDemo01ContactParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/infra/demo01-contact/delete`,
    method: 'DELETE',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 导出示例联系人 Excel GET /admin-api/infra/demo01-contact/export-excel */
export async function exportDemo01ContactExcel(
  params: APITypes.exportDemo01ContactExcelParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<any>({
    url: `/admin-api/infra/demo01-contact/export-excel`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得示例联系人 GET /admin-api/infra/demo01-contact/get */
export async function getDemo01Contact(
  params: APITypes.getDemo01ContactParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultDemo01ContactRespVO>({
    url: `/admin-api/infra/demo01-contact/get`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得示例联系人分页 GET /admin-api/infra/demo01-contact/page */
export async function getDemo01ContactPage(
  params: APITypes.getDemo01ContactPageParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultDemo01ContactRespVO>({
    url: `/admin-api/infra/demo01-contact/page`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新示例联系人 PUT /admin-api/infra/demo01-contact/update */
export async function updateDemo01Contact(
  params: APITypes.updateDemo01ContactParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.Demo01ContactSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/infra/demo01-contact/update`,
    method: 'PUT',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}
