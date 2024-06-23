// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 创建短信渠道 POST /admin-api/system/sms-channel/create */
export async function createSmsChannel(
  params: APITypes.createSmsChannelParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.SmsChannelSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultLong>({
    url: `/admin-api/system/sms-channel/create`,
    method: 'POST',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 删除短信渠道 DELETE /admin-api/system/sms-channel/delete */
export async function deleteSmsChannel(
  params: APITypes.deleteSmsChannelParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/sms-channel/delete`,
    method: 'DELETE',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得短信渠道 GET /admin-api/system/sms-channel/get */
export async function getSmsChannel(
  params: APITypes.getSmsChannelParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultSmsChannelRespVO>({
    url: `/admin-api/system/sms-channel/get`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得短信渠道精简列表 包含被禁用的短信渠道 GET /admin-api/system/sms-channel/list-all-simple */
export async function getSimpleSmsChannelList(
  params: APITypes.getSimpleSmsChannelListParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultListSmsChannelSimpleRespVO>({
    url: `/admin-api/system/sms-channel/list-all-simple`,
    method: 'GET',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 获得短信渠道分页 GET /admin-api/system/sms-channel/page */
export async function getSmsChannelPage(
  params: APITypes.getSmsChannelPageParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultSmsChannelRespVO>({
    url: `/admin-api/system/sms-channel/page`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得短信渠道精简列表 包含被禁用的短信渠道 GET /admin-api/system/sms-channel/simple-list */
export async function getSimpleSmsChannelList1(
  params: APITypes.getSimpleSmsChannelList1Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultListSmsChannelSimpleRespVO>({
    url: `/admin-api/system/sms-channel/simple-list`,
    method: 'GET',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 更新短信渠道 PUT /admin-api/system/sms-channel/update */
export async function updateSmsChannel(
  params: APITypes.updateSmsChannelParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.SmsChannelSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/sms-channel/update`,
    method: 'PUT',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}
