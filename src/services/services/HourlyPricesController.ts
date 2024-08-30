// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 创建每小时的价格信息 POST /admin-api/iot/hourly-prices/create */
export async function createHourlyPrices(
  body: APITypes.HourlyPricesSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultLong>({
    url: `/admin-api/iot/hourly-prices/create`,
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 删除每小时的价格信息 DELETE /admin-api/iot/hourly-prices/delete */
export async function deleteHourlyPrices(
  params: APITypes.deleteHourlyPricesParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/iot/hourly-prices/delete`,
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 导出每小时的价格信息 Excel GET /admin-api/iot/hourly-prices/export-excel */
export async function exportHourlyPricesExcel(
  params: APITypes.exportHourlyPricesExcelParams,
  options?: { [key: string]: any },
) {
  return request<any>({
    url: `/admin-api/iot/hourly-prices/export-excel`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得每小时的价格信息 GET /admin-api/iot/hourly-prices/get */
export async function getHourlyPrices(
  params: APITypes.getHourlyPricesParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultHourlyPricesRespVO>({
    url: `/admin-api/iot/hourly-prices/get`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得每小时的价格信息分页 GET /admin-api/iot/hourly-prices/page */
export async function getHourlyPricesPage(
  params: APITypes.getHourlyPricesPageParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultHourlyPricesRespVO>({
    url: `/admin-api/iot/hourly-prices/page`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新每小时的价格信息 PUT /admin-api/iot/hourly-prices/update */
export async function updateHourlyPrices(
  body: APITypes.HourlyPricesSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/iot/hourly-prices/update`,
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}
