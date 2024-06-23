// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 创建邮箱账号 POST /admin-api/system/mail-account/create */
export async function createMailAccount(
  params: APITypes.createMailAccountParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.MailAccountSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultLong>({
    url: `/admin-api/system/mail-account/create`,
    method: 'POST',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 删除邮箱账号 DELETE /admin-api/system/mail-account/delete */
export async function deleteMailAccount(
  params: APITypes.deleteMailAccountParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/mail-account/delete`,
    method: 'DELETE',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得邮箱账号 GET /admin-api/system/mail-account/get */
export async function getMailAccount(
  params: APITypes.getMailAccountParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultMailAccountRespVO>({
    url: `/admin-api/system/mail-account/get`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得邮箱账号精简列表 GET /admin-api/system/mail-account/list-all-simple */
export async function getSimpleMailAccountList(
  params: APITypes.getSimpleMailAccountListParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultListMailAccountSimpleRespVO>({
    url: `/admin-api/system/mail-account/list-all-simple`,
    method: 'GET',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 获得邮箱账号分页 GET /admin-api/system/mail-account/page */
export async function getMailAccountPage(
  params: APITypes.getMailAccountPageParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultMailAccountRespVO>({
    url: `/admin-api/system/mail-account/page`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得邮箱账号精简列表 GET /admin-api/system/mail-account/simple-list */
export async function getSimpleMailAccountList1(
  params: APITypes.getSimpleMailAccountList1Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultListMailAccountSimpleRespVO>({
    url: `/admin-api/system/mail-account/simple-list`,
    method: 'GET',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 修改邮箱账号 PUT /admin-api/system/mail-account/update */
export async function updateMailAccount(
  params: APITypes.updateMailAccountParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.MailAccountSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/mail-account/update`,
    method: 'PUT',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}
