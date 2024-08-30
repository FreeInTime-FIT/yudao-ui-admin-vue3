// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 创建定时任务 POST /admin-api/infra/job/create */
export async function createJob(body: APITypes.JobSaveReqVO, options?: { [key: string]: any }) {
  return request<APITypes.CommonResultLong>({
    url: `/admin-api/infra/job/create`,
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 删除定时任务 DELETE /admin-api/infra/job/delete */
export async function deleteJob(
  params: APITypes.deleteJobParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/infra/job/delete`,
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 导出定时任务 Excel GET /admin-api/infra/job/export-excel */
export async function exportJobExcel(
  params: APITypes.exportJobExcelParams,
  options?: { [key: string]: any },
) {
  return request<any>({
    url: `/admin-api/infra/job/export-excel`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得定时任务 GET /admin-api/infra/job/get */
export async function getJob(params: APITypes.getJobParams, options?: { [key: string]: any }) {
  return request<APITypes.CommonResultJobRespVO>({
    url: `/admin-api/infra/job/get`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得定时任务的下 n 次执行时间 GET /admin-api/infra/job/get_next_times */
export async function getJobNextTimes(
  params: APITypes.getJobNextTimesParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultListLocalDateTime>({
    url: `/admin-api/infra/job/get_next_times`,
    method: 'GET',
    params: {
      // count has a default value: 5
      count: '5',
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得定时任务分页 GET /admin-api/infra/job/page */
export async function getJobPage(
  params: APITypes.getJobPageParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultJobRespVO>({
    url: `/admin-api/infra/job/page`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 同步定时任务 POST /admin-api/infra/job/sync */
export async function syncJob(options?: { [key: string]: any }) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/infra/job/sync`,
    method: 'POST',
    ...(options || {}),
  });
}

/** 触发定时任务 PUT /admin-api/infra/job/trigger */
export async function triggerJob(
  params: APITypes.triggerJobParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/infra/job/trigger`,
    method: 'PUT',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新定时任务 PUT /admin-api/infra/job/update */
export async function updateJob(body: APITypes.JobSaveReqVO, options?: { [key: string]: any }) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/infra/job/update`,
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** 更新定时任务的状态 PUT /admin-api/infra/job/update-status */
export async function updateJobStatus(
  params: APITypes.updateJobStatusParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/infra/job/update-status`,
    method: 'PUT',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
