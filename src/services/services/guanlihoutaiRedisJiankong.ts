// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 获得 Redis 监控信息 GET /admin-api/infra/redis/get-monitor-info */
export async function getRedisMonitorInfo(
  params: APITypes.getRedisMonitorInfoParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultRedisMonitorRespVO>({
    url: `/admin-api/infra/redis/get-monitor-info`,
    method: 'GET',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}
