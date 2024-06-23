// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 下载文件 GET /admin-api/infra/file/${configId}/get/&#42;&#42; */
export async function getFileContent(
  params: APITypes.getFileContentParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  const { configId, ...queryParams } = params;
  return request<any>({
    url: `/admin-api/infra/file/${configId}/get/**`,
    method: 'GET',
    headers: {},
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 创建文件 模式二：前端上传文件：配合 presigned-url 接口，记录上传了上传的文件 POST /admin-api/infra/file/create */
export async function createFile(
  params: APITypes.createFileParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.FileCreateReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultLong>({
    url: `/admin-api/infra/file/create`,
    method: 'POST',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 删除文件 DELETE /admin-api/infra/file/delete */
export async function deleteFile(
  params: APITypes.deleteFileParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/infra/file/delete`,
    method: 'DELETE',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得文件分页 GET /admin-api/infra/file/page */
export async function getFilePage(
  params: APITypes.getFilePageParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultFileRespVO>({
    url: `/admin-api/infra/file/page`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取文件预签名地址 模式二：前端上传文件：用于前端直接上传七牛、阿里云 OSS 等文件存储器 GET /admin-api/infra/file/presigned-url */
export async function getFilePresignedUrl(
  params: APITypes.getFilePresignedUrlParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultFilePresignedUrlRespVO>({
    url: `/admin-api/infra/file/presigned-url`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 上传文件 模式一：后端上传文件 POST /admin-api/infra/file/upload */
export async function uploadFile1(
  params: APITypes.uploadFile1Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultString>({
    url: `/admin-api/infra/file/upload`,
    method: 'POST',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
