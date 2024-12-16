// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 分页查询设备告警记录 GET /admin-api/iot-warning/deviceWarningRecord/page */
export async function page(params: APITypes.pageParams, options?: { [key: string]: any }) {
  return request<APITypes.CommonResultPageResultDeviceWarningRecordVO>({
    url: `/admin-api/iot-warning/deviceWarningRecord/page`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
