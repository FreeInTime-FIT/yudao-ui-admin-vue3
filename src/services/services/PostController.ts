// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 创建岗位 POST /admin-api/system/post/create */
export async function createPost(body: APITypes.PostSaveReqVO, options?: { [key: string]: any }) {
  return request<APITypes.CommonResultLong>({
    url: `/admin-api/system/post/create`,
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 删除岗位 DELETE /admin-api/system/post/delete */
export async function deletePost(
  params: APITypes.deletePostParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/post/delete`,
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 岗位管理 GET /admin-api/system/post/export */
export async function exportUsingGET(
  params: APITypes.exportUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<any>({
    url: `/admin-api/system/post/export`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得岗位信息 GET /admin-api/system/post/get */
export async function getPost(params: APITypes.getPostParams, options?: { [key: string]: any }) {
  return request<APITypes.CommonResultPostRespVO>({
    url: `/admin-api/system/post/get`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取岗位全列表 只包含被开启的岗位，主要用于前端的下拉选项 GET /admin-api/system/post/list-all-simple */
export async function getSimplePostList(options?: { [key: string]: any }) {
  return request<APITypes.CommonResultListPostSimpleRespVO>({
    url: `/admin-api/system/post/list-all-simple`,
    method: 'GET',
    ...(options || {}),
  });
}

/** 获得岗位分页列表 GET /admin-api/system/post/page */
export async function getPostPage(
  params: APITypes.getPostPageParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultPostRespVO>({
    url: `/admin-api/system/post/page`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取岗位全列表 只包含被开启的岗位，主要用于前端的下拉选项 GET /admin-api/system/post/simple-list */
export async function getSimplePostList_2(options?: { [key: string]: any }) {
  return request<APITypes.CommonResultListPostSimpleRespVO>({
    url: `/admin-api/system/post/simple-list`,
    method: 'GET',
    ...(options || {}),
  });
}

/** 修改岗位 PUT /admin-api/system/post/update */
export async function updatePost(body: APITypes.PostSaveReqVO, options?: { [key: string]: any }) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/post/update`,
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}
