// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 此处后端没有提供注释 POST /admin-api/iot/device/real-time/columns */
export async function columns(body: APITypes.RealTimeQueryParam, options?: { [key: string]: any }) {
  return request<APITypes.CommonResultListMapStringObject>({
    url: `/admin-api/iot/device/real-time/columns`,
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /admin-api/iot/device/real-time/data-page */
export async function dataPage(
  body: APITypes.RealTimeQueryParam,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultMapStringObject>({
    url: `/admin-api/iot/device/real-time/data-page`,
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
