// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 导出操作日志 GET /admin-api/system/operate-log/export */
export async function exportOperateLog(
  params: APITypes.exportOperateLogParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<any>({
    url: `/admin-api/system/operate-log/export`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查看操作日志分页列表 GET /admin-api/system/operate-log/page */
export async function pageOperateLog(
  params: APITypes.pageOperateLogParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultOperateLogRespVO>({
    url: `/admin-api/system/operate-log/page`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
