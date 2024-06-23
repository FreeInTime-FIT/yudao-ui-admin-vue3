// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 导出API 访问日志 Excel GET /admin-api/infra/api-access-log/export-excel */
export async function exportApiAccessLogExcel(
  params: APITypes.exportApiAccessLogExcelParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<any>({
    url: `/admin-api/infra/api-access-log/export-excel`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得API 访问日志分页 GET /admin-api/infra/api-access-log/page */
export async function getApiAccessLogPage(
  params: APITypes.getApiAccessLogPageParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultApiAccessLogRespVO>({
    url: `/admin-api/infra/api-access-log/page`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
