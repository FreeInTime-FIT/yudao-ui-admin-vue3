// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 创建文件配置 POST /admin-api/infra/file-config/create */
export async function createFileConfig(
  body: APITypes.FileConfigSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultLong>({
    url: `/admin-api/infra/file-config/create`,
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 删除文件配置 DELETE /admin-api/infra/file-config/delete */
export async function deleteFileConfig(
  params: APITypes.deleteFileConfigParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/infra/file-config/delete`,
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得文件配置 GET /admin-api/infra/file-config/get */
export async function getFileConfig(
  params: APITypes.getFileConfigParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultFileConfigRespVO>({
    url: `/admin-api/infra/file-config/get`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得文件配置分页 GET /admin-api/infra/file-config/page */
export async function getFileConfigPage(
  params: APITypes.getFileConfigPageParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultFileConfigRespVO>({
    url: `/admin-api/infra/file-config/page`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 测试文件配置是否正确 GET /admin-api/infra/file-config/test */
export async function testFileConfig(
  params: APITypes.testFileConfigParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultString>({
    url: `/admin-api/infra/file-config/test`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新文件配置 PUT /admin-api/infra/file-config/update */
export async function updateFileConfig(
  body: APITypes.FileConfigSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/infra/file-config/update`,
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** 更新文件配置为 Master PUT /admin-api/infra/file-config/update-master */
export async function updateFileConfigMaster(
  params: APITypes.updateFileConfigMasterParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/infra/file-config/update-master`,
    method: 'PUT',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
