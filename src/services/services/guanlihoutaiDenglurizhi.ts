// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 导出登录日志 Excel GET /admin-api/system/login-log/export */
export async function exportLoginLog(
  params: APITypes.exportLoginLogParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<any>({
    url: `/admin-api/system/login-log/export`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得登录日志分页列表 GET /admin-api/system/login-log/page */
export async function getLoginLogPage(
  params: APITypes.getLoginLogPageParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultLoginLogRespVO>({
    url: `/admin-api/system/login-log/page`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
