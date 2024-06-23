// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 获得 IP 对应的地区名 GET /admin-api/system/area/get-by-ip */
export async function getAreaByIp(
  params: APITypes.getAreaByIpParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultString>({
    url: `/admin-api/system/area/get-by-ip`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得地区树 GET /admin-api/system/area/tree */
export async function getAreaTree1(
  params: APITypes.getAreaTree1Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultListAreaNodeRespVO>({
    url: `/admin-api/system/area/tree`,
    method: 'GET',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}
