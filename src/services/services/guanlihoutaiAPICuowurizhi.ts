// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 导出 API 错误日志 Excel GET /admin-api/infra/api-error-log/export-excel */
export async function exportApiErrorLogExcel(
  params: APITypes.exportApiErrorLogExcelParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<any>({
    url: `/admin-api/infra/api-error-log/export-excel`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得 API 错误日志分页 GET /admin-api/infra/api-error-log/page */
export async function getApiErrorLogPage(
  params: APITypes.getApiErrorLogPageParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultApiErrorLogRespVO>({
    url: `/admin-api/infra/api-error-log/page`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新 API 错误日志的状态 PUT /admin-api/infra/api-error-log/update-status */
export async function updateApiErrorLogProcess(
  params: APITypes.updateApiErrorLogProcessParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/infra/api-error-log/update-status`,
    method: 'PUT',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
