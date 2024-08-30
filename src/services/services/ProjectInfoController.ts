// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 创建项目信息 POST /admin-api/iot/project-info/create */
export async function createProjectInfo(
  body: APITypes.ProjectInfoSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultString>({
    url: `/admin-api/iot/project-info/create`,
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 删除项目信息 DELETE /admin-api/iot/project-info/delete */
export async function deleteProjectInfo(
  params: APITypes.deleteProjectInfoParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/iot/project-info/delete`,
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 导出项目信息 Excel GET /admin-api/iot/project-info/export-excel */
export async function exportProjectInfoExcel(
  params: APITypes.exportProjectInfoExcelParams,
  options?: { [key: string]: any },
) {
  return request<any>({
    url: `/admin-api/iot/project-info/export-excel`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得项目信息 GET /admin-api/iot/project-info/get */
export async function getProjectInfo(
  params: APITypes.getProjectInfoParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultProjectInfoRespVO>({
    url: `/admin-api/iot/project-info/get`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得项目信息分页 GET /admin-api/iot/project-info/list */
export async function getProjectInfoList(options?: { [key: string]: any }) {
  return request<APITypes.CommonResultPageResultProjectInfoRespVO>({
    url: `/admin-api/iot/project-info/list`,
    method: 'GET',
    ...(options || {}),
  });
}

/** 获得项目信息分页 GET /admin-api/iot/project-info/listForAuth */
export async function getProjectInfoListForAuth(options?: { [key: string]: any }) {
  return request<APITypes.CommonResultPageResultProjectInfoRespVO>({
    url: `/admin-api/iot/project-info/listForAuth`,
    method: 'GET',
    ...(options || {}),
  });
}

/** 获得项目信息分页 GET /admin-api/iot/project-info/page */
export async function getProjectInfoPage(
  params: APITypes.getProjectInfoPageParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultProjectInfoRespVO>({
    url: `/admin-api/iot/project-info/page`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新项目信息 PUT /admin-api/iot/project-info/update */
export async function updateProjectInfo(
  body: APITypes.ProjectInfoSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/iot/project-info/update`,
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** 更新项目状态 PUT /admin-api/iot/project-info/updateState */
export async function updateState(
  body: APITypes.ProjectInfoUpdateStateReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/iot/project-info/updateState`,
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}
