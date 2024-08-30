// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 创建示例分类 POST /admin-api/infra/demo02-category/create */
export async function createDemo02Category(
  body: APITypes.Demo02CategorySaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultLong>({
    url: `/admin-api/infra/demo02-category/create`,
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 删除示例分类 DELETE /admin-api/infra/demo02-category/delete */
export async function deleteDemo02Category(
  params: APITypes.deleteDemo02CategoryParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/infra/demo02-category/delete`,
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 导出示例分类 Excel GET /admin-api/infra/demo02-category/export-excel */
export async function exportDemo02CategoryExcel(
  params: APITypes.exportDemo02CategoryExcelParams,
  options?: { [key: string]: any },
) {
  return request<any>({
    url: `/admin-api/infra/demo02-category/export-excel`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得示例分类 GET /admin-api/infra/demo02-category/get */
export async function getDemo02Category(
  params: APITypes.getDemo02CategoryParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultDemo02CategoryRespVO>({
    url: `/admin-api/infra/demo02-category/get`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得示例分类列表 GET /admin-api/infra/demo02-category/list */
export async function getDemo02CategoryList(
  params: APITypes.getDemo02CategoryListParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultListDemo02CategoryRespVO>({
    url: `/admin-api/infra/demo02-category/list`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新示例分类 PUT /admin-api/infra/demo02-category/update */
export async function updateDemo02Category(
  body: APITypes.Demo02CategorySaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/infra/demo02-category/update`,
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}
