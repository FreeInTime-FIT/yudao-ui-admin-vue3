// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 导出登录日志 Excel GET /admin-api/system/login-log/export */
export async function exportLoginLog(
  params: APITypes.exportLoginLogParams,
  options?: { [key: string]: any },
) {
  return request<any>({
    url: `/admin-api/system/login-log/export`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得登录日志分页列表 GET /admin-api/system/login-log/page */
export async function getLoginLogPage(
  params: APITypes.getLoginLogPageParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultLoginLogRespVO>({
    url: `/admin-api/system/login-log/page`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
