// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 导出操作日志 GET /admin-api/system/operate-log/export */
export async function exportOperateLog(
  params: APITypes.exportOperateLogParams,
  options?: { [key: string]: any },
) {
  return request<any>({
    url: `/admin-api/system/operate-log/export`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查看操作日志分页列表 GET /admin-api/system/operate-log/page */
export async function pageOperateLog(
  params: APITypes.pageOperateLogParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultOperateLogRespVO>({
    url: `/admin-api/system/operate-log/page`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
