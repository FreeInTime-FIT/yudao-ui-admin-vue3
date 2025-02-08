// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 此处后端没有提供注释 GET /admin-api/iot/report/get-chart-config */
export async function getLatestPrice(
  params: APITypes.getLatestPriceParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultGoViewDataRespVO>({
    url: `/admin-api/iot/report/get-chart-config`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /admin-api/iot/report/get-latest-profits */
export async function getLatest(
  params: APITypes.getLatestParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultObject>({
    url: `/admin-api/iot/report/get-latest-profits`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /admin-api/iot/report/get-panel-data */
export async function getPanelData(
  params: APITypes.getPanelDataParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultObject>({
    url: `/admin-api/iot/report/get-panel-data`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
