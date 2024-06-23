// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 根据字典类型查询字典数据信息 GET /app-api/system/dict-data/type */
export async function getDictDataListByType(
  params: APITypes.getDictDataListByTypeParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultListAppDictDataRespVO>({
    url: `/app-api/system/dict-data/type`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
