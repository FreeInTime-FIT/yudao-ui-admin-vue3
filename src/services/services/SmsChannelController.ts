// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 创建短信渠道 POST /admin-api/system/sms-channel/create */
export async function createSmsChannel(
  body: APITypes.SmsChannelSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultLong>({
    url: `/admin-api/system/sms-channel/create`,
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 删除短信渠道 DELETE /admin-api/system/sms-channel/delete */
export async function deleteSmsChannel(
  params: APITypes.deleteSmsChannelParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/sms-channel/delete`,
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得短信渠道 GET /admin-api/system/sms-channel/get */
export async function getSmsChannel(
  params: APITypes.getSmsChannelParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultSmsChannelRespVO>({
    url: `/admin-api/system/sms-channel/get`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得短信渠道精简列表 包含被禁用的短信渠道 GET /admin-api/system/sms-channel/list-all-simple */
export async function getSimpleSmsChannelList(options?: { [key: string]: any }) {
  return request<APITypes.CommonResultListSmsChannelSimpleRespVO>({
    url: `/admin-api/system/sms-channel/list-all-simple`,
    method: 'GET',
    ...(options || {}),
  });
}

/** 获得短信渠道分页 GET /admin-api/system/sms-channel/page */
export async function getSmsChannelPage(
  params: APITypes.getSmsChannelPageParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultSmsChannelRespVO>({
    url: `/admin-api/system/sms-channel/page`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得短信渠道精简列表 包含被禁用的短信渠道 GET /admin-api/system/sms-channel/simple-list */
export async function getSimpleSmsChannelList_2(options?: { [key: string]: any }) {
  return request<APITypes.CommonResultListSmsChannelSimpleRespVO>({
    url: `/admin-api/system/sms-channel/simple-list`,
    method: 'GET',
    ...(options || {}),
  });
}

/** 更新短信渠道 PUT /admin-api/system/sms-channel/update */
export async function updateSmsChannel(
  body: APITypes.SmsChannelSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/sms-channel/update`,
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}
