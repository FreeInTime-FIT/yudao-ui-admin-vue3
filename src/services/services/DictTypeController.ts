// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 创建字典类型 POST /admin-api/system/dict-type/create */
export async function createDictType(
  body: APITypes.DictTypeSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultLong>({
    url: `/admin-api/system/dict-type/create`,
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 删除字典类型 DELETE /admin-api/system/dict-type/delete */
export async function deleteDictType(
  params: APITypes.deleteDictTypeParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/dict-type/delete`,
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 导出数据类型 GET /admin-api/system/dict-type/export */
export async function exportUsingGET(
  params: APITypes.exportUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<any>({
    url: `/admin-api/system/dict-type/export`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** /查询字典类型详细 GET /admin-api/system/dict-type/get */
export async function getDictType(
  params: APITypes.getDictTypeParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultDictTypeRespVO>({
    url: `/admin-api/system/dict-type/get`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得全部字典类型列表 包括开启 + 禁用的字典类型，主要用于前端的下拉选项 GET /admin-api/system/dict-type/list-all-simple */
export async function getSimpleDictTypeList(options?: { [key: string]: any }) {
  return request<APITypes.CommonResultListDictTypeSimpleRespVO>({
    url: `/admin-api/system/dict-type/list-all-simple`,
    method: 'GET',
    ...(options || {}),
  });
}

/** 获得字典类型的分页列表 GET /admin-api/system/dict-type/page */
export async function pageDictTypes(
  params: APITypes.pageDictTypesParams,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultDictTypeRespVO>({
    url: `/admin-api/system/dict-type/page`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得全部字典类型列表 包括开启 + 禁用的字典类型，主要用于前端的下拉选项 GET /admin-api/system/dict-type/simple-list */
export async function getSimpleDictTypeList_2(options?: { [key: string]: any }) {
  return request<APITypes.CommonResultListDictTypeSimpleRespVO>({
    url: `/admin-api/system/dict-type/simple-list`,
    method: 'GET',
    ...(options || {}),
  });
}

/** 修改字典类型 PUT /admin-api/system/dict-type/update */
export async function updateDictType(
  body: APITypes.DictTypeSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/dict-type/update`,
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}
