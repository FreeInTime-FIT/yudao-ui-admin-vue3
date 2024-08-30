// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 使用 HTTP 查询数据 这个只是示例接口，实际应该每个查询，都要写一个接口 GET /admin-api/report/go-view/data/get-by-http */
export async function getDataByHttp(
  params: APITypes.getDataByHttpParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultGoViewDataRespVO>({
    url: `/admin-api/report/go-view/data/get-by-http`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 使用 HTTP 查询数据 这个只是示例接口，实际应该每个查询，都要写一个接口 PUT /admin-api/report/go-view/data/get-by-http */
export async function getDataByHttp_2(body: string, options?: { [key: string]: any }) {
  return request<APITypes.CommonResultGoViewDataRespVO>({
    url: `/admin-api/report/go-view/data/get-by-http`,
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** 使用 HTTP 查询数据 这个只是示例接口，实际应该每个查询，都要写一个接口 POST /admin-api/report/go-view/data/get-by-http */
export async function getDataByHttp_3(body: string, options?: { [key: string]: any }) {
  return request<APITypes.CommonResultGoViewDataRespVO>({
    url: `/admin-api/report/go-view/data/get-by-http`,
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 使用 HTTP 查询数据 这个只是示例接口，实际应该每个查询，都要写一个接口 DELETE /admin-api/report/go-view/data/get-by-http */
export async function getDataByHttp_4(body: string, options?: { [key: string]: any }) {
  return request<APITypes.CommonResultGoViewDataRespVO>({
    url: `/admin-api/report/go-view/data/get-by-http`,
    method: 'DELETE',
    data: body,
    ...(options || {}),
  });
}

/** 使用 HTTP 查询数据 这个只是示例接口，实际应该每个查询，都要写一个接口 PATCH /admin-api/report/go-view/data/get-by-http */
export async function getDataByHttp_5(body: string, options?: { [key: string]: any }) {
  return request<APITypes.CommonResultGoViewDataRespVO>({
    url: `/admin-api/report/go-view/data/get-by-http`,
    method: 'PATCH',
    data: body,
    ...(options || {}),
  });
}

/** 使用 SQL 查询数据 GET /admin-api/report/go-view/data/get-by-sql */
export async function getDataBySQL(
  params: APITypes.getDataBySQLParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultGoViewDataRespVO>({
    url: `/admin-api/report/go-view/data/get-by-sql`,
    method: 'GET',
    params: {
      ...params,
      reqVO: undefined,
      ...params['reqVO'],
    },
    ...(options || {}),
  });
}

/** 使用 SQL 查询数据 PUT /admin-api/report/go-view/data/get-by-sql */
export async function getDataBySQL_2(
  body: APITypes.GoViewDataGetBySqlReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultGoViewDataRespVO>({
    url: `/admin-api/report/go-view/data/get-by-sql`,
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** 使用 SQL 查询数据 POST /admin-api/report/go-view/data/get-by-sql */
export async function getDataBySQL_3(
  body: APITypes.GoViewDataGetBySqlReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultGoViewDataRespVO>({
    url: `/admin-api/report/go-view/data/get-by-sql`,
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 使用 SQL 查询数据 DELETE /admin-api/report/go-view/data/get-by-sql */
export async function getDataBySQL_4(
  body: APITypes.GoViewDataGetBySqlReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultGoViewDataRespVO>({
    url: `/admin-api/report/go-view/data/get-by-sql`,
    method: 'DELETE',
    data: body,
    ...(options || {}),
  });
}

/** 使用 SQL 查询数据 PATCH /admin-api/report/go-view/data/get-by-sql */
export async function getDataBySQL_5(
  body: APITypes.GoViewDataGetBySqlReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultGoViewDataRespVO>({
    url: `/admin-api/report/go-view/data/get-by-sql`,
    method: 'PATCH',
    data: body,
    ...(options || {}),
  });
}
