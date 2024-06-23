// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 获得地区树 GET /app-api/system/area/tree */
export async function getAreaTree(
  params: APITypes.getAreaTreeParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultListAppAreaNodeRespVO>({
    url: `/app-api/system/area/tree`,
    method: 'GET',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}
