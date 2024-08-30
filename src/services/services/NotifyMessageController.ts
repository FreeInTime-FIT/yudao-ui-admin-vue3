// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 获得站内信 GET /admin-api/system/notify-message/get */
export async function getNotifyMessage(
  params: APITypes.getNotifyMessageParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultNotifyMessageRespVO>({
    url: `/admin-api/system/notify-message/get`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得当前用户的未读站内信数量 GET /admin-api/system/notify-message/get-unread-count */
export async function getUnreadNotifyMessageCount(options?: { [key: string]: any }) {
  return request<APITypes.CommonResultLong>({
    url: `/admin-api/system/notify-message/get-unread-count`,
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取当前用户的最新站内信列表，默认 10 条 GET /admin-api/system/notify-message/get-unread-list */
export async function getUnreadNotifyMessageList(
  params: APITypes.getUnreadNotifyMessageListParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultListNotifyMessageRespVO>({
    url: `/admin-api/system/notify-message/get-unread-list`,
    method: 'GET',
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
  params: APITypes.getMyMyNotifyMessagePageParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultNotifyMessageRespVO>({
    url: `/admin-api/system/notify-message/my-page`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得站内信分页 GET /admin-api/system/notify-message/page */
export async function getNotifyMessagePage(
  params: APITypes.getNotifyMessagePageParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultNotifyMessageRespVO>({
    url: `/admin-api/system/notify-message/page`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 标记所有站内信为已读 PUT /admin-api/system/notify-message/update-all-read */
export async function updateAllNotifyMessageRead(options?: { [key: string]: any }) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/notify-message/update-all-read`,
    method: 'PUT',
    ...(options || {}),
  });
}

/** 标记站内信为已读 PUT /admin-api/system/notify-message/update-read */
export async function updateNotifyMessageRead(
  params: APITypes.updateNotifyMessageReadParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/notify-message/update-read`,
    method: 'PUT',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
