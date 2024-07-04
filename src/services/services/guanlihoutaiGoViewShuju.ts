// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 使用 HTTP 查询数据 这个只是示例接口，实际应该每个查询，都要写一个接口 GET /admin-api/report/go-view/data/get-by-http */
export async function getDataByHttp(
  params: APITypes.getDataByHttpParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultGoViewDataRespVO>({
    url: `/admin-api/report/go-view/data/get-by-http`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 使用 HTTP 查询数据 这个只是示例接口，实际应该每个查询，都要写一个接口 PUT /admin-api/report/go-view/data/get-by-http */
export async function getDataByHttp3(
  params: APITypes.getDataByHttp3Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: string,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultGoViewDataRespVO>({
    url: `/admin-api/report/go-view/data/get-by-http`,
    method: 'PUT',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 使用 HTTP 查询数据 这个只是示例接口，实际应该每个查询，都要写一个接口 POST /admin-api/report/go-view/data/get-by-http */
export async function getDataByHttp2(
  params: APITypes.getDataByHttp2Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: string,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultGoViewDataRespVO>({
    url: `/admin-api/report/go-view/data/get-by-http`,
    method: 'POST',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 使用 HTTP 查询数据 这个只是示例接口，实际应该每个查询，都要写一个接口 DELETE /admin-api/report/go-view/data/get-by-http */
export async function getDataByHttp5(
  params: APITypes.getDataByHttp5Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: string,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultGoViewDataRespVO>({
    url: `/admin-api/report/go-view/data/get-by-http`,
    method: 'DELETE',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 使用 HTTP 查询数据 这个只是示例接口，实际应该每个查询，都要写一个接口 PATCH /admin-api/report/go-view/data/get-by-http */
export async function getDataByHttp4(
  params: APITypes.getDataByHttp4Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: string,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultGoViewDataRespVO>({
    url: `/admin-api/report/go-view/data/get-by-http`,
    method: 'PATCH',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 使用 SQL 查询数据 GET /admin-api/report/go-view/data/get-by-sql */
export async function getDataBySQL(
  params: APITypes.getDataBySQLParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultGoViewDataRespVO>({
    url: `/admin-api/report/go-view/data/get-by-sql`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
      reqVO: undefined,
      ...params['reqVO'],
    },
    ...(options || {}),
  });
}

/** 使用 SQL 查询数据 PUT /admin-api/report/go-view/data/get-by-sql */
export async function getDataBySQL3(
  params: APITypes.getDataBySQL3Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.GoViewDataGetBySqlReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultGoViewDataRespVO>({
    url: `/admin-api/report/go-view/data/get-by-sql`,
    method: 'PUT',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 使用 SQL 查询数据 POST /admin-api/report/go-view/data/get-by-sql */
export async function getDataBySQL2(
  params: APITypes.getDataBySQL2Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.GoViewDataGetBySqlReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultGoViewDataRespVO>({
    url: `/admin-api/report/go-view/data/get-by-sql`,
    method: 'POST',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 使用 SQL 查询数据 DELETE /admin-api/report/go-view/data/get-by-sql */
export async function getDataBySQL5(
  params: APITypes.getDataBySQL5Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.GoViewDataGetBySqlReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultGoViewDataRespVO>({
    url: `/admin-api/report/go-view/data/get-by-sql`,
    method: 'DELETE',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 使用 SQL 查询数据 PATCH /admin-api/report/go-view/data/get-by-sql */
export async function getDataBySQL4(
  params: APITypes.getDataBySQL4Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.GoViewDataGetBySqlReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultGoViewDataRespVO>({
    url: `/admin-api/report/go-view/data/get-by-sql`,
    method: 'PATCH',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}
