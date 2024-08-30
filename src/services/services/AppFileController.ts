// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 上传文件 POST /app-api/infra/file/upload */
export async function uploadFile(
  params: APITypes.uploadFileParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultString>({
    url: `/app-api/infra/file/upload`,
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
