// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 获取实时电价数据 GET /admin-api/data/price */
export async function getPriceData(options?: { [key: string]: any }) {
  return request<APITypes.CommonResultMapStringObject>({
    url: `/admin-api/data/price`,
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取微电网状态 GET /admin-api/data/status */
export async function getStatusData(options?: { [key: string]: any }) {
  return request<APITypes.CommonResultMapStringObject>({
    url: `/admin-api/data/status`,
    method: 'GET',
    ...(options || {}),
  });
}
