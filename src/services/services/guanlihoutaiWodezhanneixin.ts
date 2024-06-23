// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 获得站内信 GET /admin-api/system/notify-message/get */
export async function getNotifyMessage(
  params: APITypes.getNotifyMessageParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultNotifyMessageRespVO>({
    url: `/admin-api/system/notify-message/get`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得当前用户的未读站内信数量 GET /admin-api/system/notify-message/get-unread-count */
export async function getUnreadNotifyMessageCount(
  params: APITypes.getUnreadNotifyMessageCountParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultLong>({
    url: `/admin-api/system/notify-message/get-unread-count`,
    method: 'GET',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 获取当前用户的最新站内信列表，默认 10 条 GET /admin-api/system/notify-message/get-unread-list */
export async function getUnreadNotifyMessageList(
  params: APITypes.getUnreadNotifyMessageListParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultListNotifyMessageRespVO>({
    url: `/admin-api/system/notify-message/get-unread-list`,
    method: 'GET',
    headers: {},
    params: {
      // size has a default value: 10
      size: '10',
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得我的站内信分页 GET /admin-api/system/notify-message/my-page */
export async function getMyMyNotifyMessagePage(
  params: APITypes.getMyMyNotifyMessagePageParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultNotifyMessageRespVO>({
    url: `/admin-api/system/notify-message/my-page`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得站内信分页 GET /admin-api/system/notify-message/page */
export async function getNotifyMessagePage(
  params: APITypes.getNotifyMessagePageParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultNotifyMessageRespVO>({
    url: `/admin-api/system/notify-message/page`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 标记所有站内信为已读 PUT /admin-api/system/notify-message/update-all-read */
export async function updateAllNotifyMessageRead(
  params: APITypes.updateAllNotifyMessageReadParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/notify-message/update-all-read`,
    method: 'PUT',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 标记站内信为已读 PUT /admin-api/system/notify-message/update-read */
export async function updateNotifyMessageRead(
  params: APITypes.updateNotifyMessageReadParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/notify-message/update-read`,
    method: 'PUT',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
