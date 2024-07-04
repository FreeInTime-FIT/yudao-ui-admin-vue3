// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 此处后端没有提供注释 GET /admin-api/iot/report/get-chart-config */
export async function getLatestPrice(
  params: APITypes.getLatestPriceParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultGoViewDataRespVO>({
    url: `/admin-api/iot/report/get-chart-config`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /admin-api/iot/report/get-latest-profits */
export async function getLatest1(
  params: APITypes.getLatest1Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultObject>({
    url: `/admin-api/iot/report/get-latest-profits`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /admin-api/iot/report/get-latest-profits-for-keys */
export async function getLatestForKeys(
  params: APITypes.getLatestForKeysParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.GetLatestForKeys,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultObject>({
    url: `/admin-api/iot/report/get-latest-profits-for-keys`,
    method: 'POST',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /admin-api/iot/report/sql */
export async function getLatest(
  params: APITypes.getLatestParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.IotReportSqlQuery,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultGoViewDataRespVO>({
    url: `/admin-api/iot/report/sql`,
    method: 'POST',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}
