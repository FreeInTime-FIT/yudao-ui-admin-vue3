// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 创建部门 POST /admin-api/system/dept/create */
export async function createDept(
  params: APITypes.createDeptParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.DeptSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultLong>({
    url: `/admin-api/system/dept/create`,
    method: 'POST',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 删除部门 DELETE /admin-api/system/dept/delete */
export async function deleteDept(
  params: APITypes.deleteDeptParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/dept/delete`,
    method: 'DELETE',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得部门信息 GET /admin-api/system/dept/get */
export async function getDept(
  params: APITypes.getDeptParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultDeptRespVO>({
    url: `/admin-api/system/dept/get`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取部门列表 GET /admin-api/system/dept/list */
export async function getDeptList(
  params: APITypes.getDeptListParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultListDeptRespVO>({
    url: `/admin-api/system/dept/list`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取部门精简信息列表 只包含被开启的部门，主要用于前端的下拉选项 GET /admin-api/system/dept/list-all-simple */
export async function getSimpleDeptList(
  params: APITypes.getSimpleDeptListParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultListDeptSimpleRespVO>({
    url: `/admin-api/system/dept/list-all-simple`,
    method: 'GET',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 获取部门精简信息列表 只包含被开启的部门，主要用于前端的下拉选项 GET /admin-api/system/dept/simple-list */
export async function getSimpleDeptList1(
  params: APITypes.getSimpleDeptList1Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultListDeptSimpleRespVO>({
    url: `/admin-api/system/dept/simple-list`,
    method: 'GET',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 更新部门 PUT /admin-api/system/dept/update */
export async function updateDept(
  params: APITypes.updateDeptParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.DeptSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/dept/update`,
    method: 'PUT',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}
