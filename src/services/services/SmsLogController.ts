// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 导出短信日志 Excel GET /admin-api/system/sms-log/export-excel */
export async function exportSmsLogExcel(
  params: APITypes.exportSmsLogExcelParams,
  options?: { [key: string]: any },
) {
  return request<any>({
    url: `/admin-api/system/sms-log/export-excel`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得短信日志分页 GET /admin-api/system/sms-log/page */
export async function getSmsLogPage(
  params: APITypes.getSmsLogPageParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultSmsLogRespVO>({
    url: `/admin-api/system/sms-log/page`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
