// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 创建设备管理 POST /admin-api/iot/device-management/create */
export async function createDeviceManagement(
  body: APITypes.DeviceManagementSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultInteger>({
    url: `/admin-api/iot/device-management/create`,
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 删除设备管理 DELETE /admin-api/iot/device-management/delete */
export async function deleteDeviceManagement(
  params: APITypes.deleteDeviceManagementParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/iot/device-management/delete`,
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 导出设备管理 Excel GET /admin-api/iot/device-management/export-excel */
export async function exportDeviceManagementExcel(
  params: APITypes.exportDeviceManagementExcelParams,
  options?: { [key: string]: any },
) {
  return request<any>({
    url: `/admin-api/iot/device-management/export-excel`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得设备管理 GET /admin-api/iot/device-management/get */
export async function getDeviceManagement(
  params: APITypes.getDeviceManagementParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultDeviceManagementRespVO>({
    url: `/admin-api/iot/device-management/get`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得设备管理分页 GET /admin-api/iot/device-management/page */
export async function getDeviceManagementPage(
  params: APITypes.getDeviceManagementPageParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultDeviceManagementRespVO>({
    url: `/admin-api/iot/device-management/page`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新设备管理 PUT /admin-api/iot/device-management/update */
export async function updateDeviceManagement(
  body: APITypes.DeviceManagementSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/iot/device-management/update`,
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}
