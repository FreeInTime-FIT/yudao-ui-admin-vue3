// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 创建通知公告 POST /admin-api/system/notice/create */
export async function createNotice(
  body: APITypes.NoticeSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultLong>({
    url: `/admin-api/system/notice/create`,
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 删除通知公告 DELETE /admin-api/system/notice/delete */
export async function deleteNotice(
  params: APITypes.deleteNoticeParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/notice/delete`,
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得通知公告 GET /admin-api/system/notice/get */
export async function getNotice(
  params: APITypes.getNoticeParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultNoticeRespVO>({
    url: `/admin-api/system/notice/get`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取通知公告列表 GET /admin-api/system/notice/page */
export async function getNoticePage(
  params: APITypes.getNoticePageParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultNoticeRespVO>({
    url: `/admin-api/system/notice/page`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 推送通知公告 只发送给 websocket 连接在线的用户 POST /admin-api/system/notice/push */
export async function push(params: APITypes.pushParams, options?: { [key: string]: any }) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/notice/push`,
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 修改通知公告 PUT /admin-api/system/notice/update */
export async function updateNotice(
  body: APITypes.NoticeSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/notice/update`,
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}
