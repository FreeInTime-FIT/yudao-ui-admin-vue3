// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 创建站内信模版 POST /admin-api/system/notify-template/create */
export async function createNotifyTemplate(
  body: APITypes.NotifyTemplateSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultLong>({
    url: `/admin-api/system/notify-template/create`,
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 删除站内信模版 DELETE /admin-api/system/notify-template/delete */
export async function deleteNotifyTemplate(
  params: APITypes.deleteNotifyTemplateParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/notify-template/delete`,
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得站内信模版 GET /admin-api/system/notify-template/get */
export async function getNotifyTemplate(
  params: APITypes.getNotifyTemplateParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultNotifyTemplateRespVO>({
    url: `/admin-api/system/notify-template/get`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得站内信模版分页 GET /admin-api/system/notify-template/page */
export async function getNotifyTemplatePage(
  params: APITypes.getNotifyTemplatePageParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultNotifyTemplateRespVO>({
    url: `/admin-api/system/notify-template/page`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 发送站内信 POST /admin-api/system/notify-template/send-notify */
export async function sendNotify(
  body: APITypes.NotifyTemplateSendReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultLong>({
    url: `/admin-api/system/notify-template/send-notify`,
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 更新站内信模版 PUT /admin-api/system/notify-template/update */
export async function updateNotifyTemplate(
  body: APITypes.NotifyTemplateSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/notify-template/update`,
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}
