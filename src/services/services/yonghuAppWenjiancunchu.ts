// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 上传文件 POST /app-api/infra/file/upload */
export async function uploadFile(
  params: APITypes.uploadFileParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultString>({
    url: `/app-api/infra/file/upload`,
    method: 'POST',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
