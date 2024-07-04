// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 创建项目 POST /admin-api/report/go-view/project/create */
export async function createProject(
  params: APITypes.createProjectParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.GoViewProjectCreateReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultLong>({
    url: `/admin-api/report/go-view/project/create`,
    method: 'POST',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 删除 GoView 项目 DELETE /admin-api/report/go-view/project/delete */
export async function deleteProject(
  params: APITypes.deleteProjectParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/report/go-view/project/delete`,
    method: 'DELETE',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得项目 GET /admin-api/report/go-view/project/get */
export async function getProject(
  params: APITypes.getProjectParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultGoViewProjectRespVO>({
    url: `/admin-api/report/go-view/project/get`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得我的项目分页 GET /admin-api/report/go-view/project/my-page */
export async function getMyProjectPage(
  params: APITypes.getMyProjectPageParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultGoViewProjectRespVO>({
    url: `/admin-api/report/go-view/project/my-page`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新项目 PUT /admin-api/report/go-view/project/update */
export async function updateProject(
  params: APITypes.updateProjectParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.GoViewProjectUpdateReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/report/go-view/project/update`,
    method: 'PUT',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}
