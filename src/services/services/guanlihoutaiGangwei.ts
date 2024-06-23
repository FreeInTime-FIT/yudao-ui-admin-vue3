// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 创建岗位 POST /admin-api/system/post/create */
export async function createPost(
  params: APITypes.createPostParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.PostSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultLong>({
    url: `/admin-api/system/post/create`,
    method: 'POST',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 删除岗位 DELETE /admin-api/system/post/delete */
export async function deletePost(
  params: APITypes.deletePostParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/post/delete`,
    method: 'DELETE',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 岗位管理 GET /admin-api/system/post/export */
export async function export1(
  params: APITypes.export1Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<any>({
    url: `/admin-api/system/post/export`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得岗位信息 GET /admin-api/system/post/get */
export async function getPost(
  params: APITypes.getPostParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPostRespVO>({
    url: `/admin-api/system/post/get`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取岗位全列表 只包含被开启的岗位，主要用于前端的下拉选项 GET /admin-api/system/post/list-all-simple */
export async function getSimplePostList(
  params: APITypes.getSimplePostListParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultListPostSimpleRespVO>({
    url: `/admin-api/system/post/list-all-simple`,
    method: 'GET',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 获得岗位分页列表 GET /admin-api/system/post/page */
export async function getPostPage(
  params: APITypes.getPostPageParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultPostRespVO>({
    url: `/admin-api/system/post/page`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取岗位全列表 只包含被开启的岗位，主要用于前端的下拉选项 GET /admin-api/system/post/simple-list */
export async function getSimplePostList1(
  params: APITypes.getSimplePostList1Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultListPostSimpleRespVO>({
    url: `/admin-api/system/post/simple-list`,
    method: 'GET',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 修改岗位 PUT /admin-api/system/post/update */
export async function updatePost(
  params: APITypes.updatePostParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.PostSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/post/update`,
    method: 'PUT',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}
