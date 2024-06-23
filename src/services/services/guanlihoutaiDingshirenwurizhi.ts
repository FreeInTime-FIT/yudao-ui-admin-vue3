// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 导出定时任务日志 Excel GET /admin-api/infra/job-log/export-excel */
export async function exportJobLogExcel(
  params: APITypes.exportJobLogExcelParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<any>({
    url: `/admin-api/infra/job-log/export-excel`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得定时任务日志 GET /admin-api/infra/job-log/get */
export async function getJobLog(
  params: APITypes.getJobLogParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultJobLogRespVO>({
    url: `/admin-api/infra/job-log/get`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得定时任务日志分页 GET /admin-api/infra/job-log/page */
export async function getJobLogPage(
  params: APITypes.getJobLogPageParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultJobLogRespVO>({
    url: `/admin-api/infra/job-log/page`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
