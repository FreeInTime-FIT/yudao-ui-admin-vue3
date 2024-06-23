// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 获得邮箱日志 GET /admin-api/system/mail-log/get */
export async function getMailTemplate1(
  params: APITypes.getMailTemplate1Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultMailLogRespVO>({
    url: `/admin-api/system/mail-log/get`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得邮箱日志分页 GET /admin-api/system/mail-log/page */
export async function getMailLogPage(
  params: APITypes.getMailLogPageParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultMailLogRespVO>({
    url: `/admin-api/system/mail-log/page`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
