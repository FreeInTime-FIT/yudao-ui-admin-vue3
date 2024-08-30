// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 获得邮箱日志 GET /admin-api/system/mail-log/get */
export async function getMailTemplate(
  params: APITypes.getMailTemplateParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultMailLogRespVO>({
    url: `/admin-api/system/mail-log/get`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得邮箱日志分页 GET /admin-api/system/mail-log/page */
export async function getMailLogPage(
  params: APITypes.getMailLogPageParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultMailLogRespVO>({
    url: `/admin-api/system/mail-log/page`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
