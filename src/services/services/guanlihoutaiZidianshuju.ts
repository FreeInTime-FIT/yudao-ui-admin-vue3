// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 新增字典数据 POST /admin-api/system/dict-data/create */
export async function createDictData(
  params: APITypes.createDictDataParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.DictDataSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultLong>({
    url: `/admin-api/system/dict-data/create`,
    method: 'POST',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 删除字典数据 DELETE /admin-api/system/dict-data/delete */
export async function deleteDictData(
  params: APITypes.deleteDictDataParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/dict-data/delete`,
    method: 'DELETE',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 导出字典数据 GET /admin-api/system/dict-data/export */
export async function export3(
  params: APITypes.export3Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<any>({
    url: `/admin-api/system/dict-data/export`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** /查询字典数据详细 GET /admin-api/system/dict-data/get */
export async function getDictData(
  params: APITypes.getDictDataParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultDictDataRespVO>({
    url: `/admin-api/system/dict-data/get`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得全部字典数据列表 一般用于管理后台缓存字典数据在本地 GET /admin-api/system/dict-data/list-all-simple */
export async function getSimpleDictDataList(
  params: APITypes.getSimpleDictDataListParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultListDictDataSimpleRespVO>({
    url: `/admin-api/system/dict-data/list-all-simple`,
    method: 'GET',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** /获得字典类型的分页列表 GET /admin-api/system/dict-data/page */
export async function getDictTypePage(
  params: APITypes.getDictTypePageParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultDictDataRespVO>({
    url: `/admin-api/system/dict-data/page`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得全部字典数据列表 一般用于管理后台缓存字典数据在本地 GET /admin-api/system/dict-data/simple-list */
export async function getSimpleDictDataList1(
  params: APITypes.getSimpleDictDataList1Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultListDictDataSimpleRespVO>({
    url: `/admin-api/system/dict-data/simple-list`,
    method: 'GET',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 修改字典数据 PUT /admin-api/system/dict-data/update */
export async function updateDictData(
  params: APITypes.updateDictDataParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.DictDataSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/dict-data/update`,
    method: 'PUT',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}
