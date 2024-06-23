// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 创建项目信息 POST /admin-api/iot/project-info/create */
export async function createProjectInfo(
  params: APITypes.createProjectInfoParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.ProjectInfoSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultString>({
    url: `/admin-api/iot/project-info/create`,
    method: 'POST',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 删除项目信息 DELETE /admin-api/iot/project-info/delete */
export async function deleteProjectInfo(
  params: APITypes.deleteProjectInfoParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/iot/project-info/delete`,
    method: 'DELETE',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 导出项目信息 Excel GET /admin-api/iot/project-info/export-excel */
export async function exportProjectInfoExcel(
  params: APITypes.exportProjectInfoExcelParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<any>({
    url: `/admin-api/iot/project-info/export-excel`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得项目信息 GET /admin-api/iot/project-info/get */
export async function getProjectInfo(
  params: APITypes.getProjectInfoParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultProjectInfoRespVO>({
    url: `/admin-api/iot/project-info/get`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得项目信息分页 GET /admin-api/iot/project-info/page */
export async function getProjectInfoPage(
  params: APITypes.getProjectInfoPageParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultProjectInfoRespVO>({
    url: `/admin-api/iot/project-info/page`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新项目信息 PUT /admin-api/iot/project-info/update */
export async function updateProjectInfo(
  params: APITypes.updateProjectInfoParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.ProjectInfoSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/iot/project-info/update`,
    method: 'PUT',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}
