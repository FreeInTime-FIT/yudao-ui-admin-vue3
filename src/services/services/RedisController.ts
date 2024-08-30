// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 获得 Redis 监控信息 GET /admin-api/infra/redis/get-monitor-info */
export async function getRedisMonitorInfo(options?: { [key: string]: any }) {
  return request<APITypes.CommonResultRedisMonitorRespVO>({
    url: `/admin-api/infra/redis/get-monitor-info`,
    method: 'GET',
    ...(options || {}),
  });
}
