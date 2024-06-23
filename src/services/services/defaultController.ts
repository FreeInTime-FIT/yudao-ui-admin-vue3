// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 此处后端没有提供注释 GET /admin-api/bpm/&#42;&#42; */
export async function bpm404(
  params: APITypes.bpm404Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/bpm/**`,
    method: 'GET',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /admin-api/bpm/&#42;&#42; */
export async function bpm4043(
  params: APITypes.bpm4043Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/bpm/**`,
    method: 'PUT',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /admin-api/bpm/&#42;&#42; */
export async function bpm4042(
  params: APITypes.bpm4042Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/bpm/**`,
    method: 'POST',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /admin-api/bpm/&#42;&#42; */
export async function bpm4045(
  params: APITypes.bpm4045Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/bpm/**`,
    method: 'DELETE',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PATCH /admin-api/bpm/&#42;&#42; */
export async function bpm4044(
  params: APITypes.bpm4044Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/bpm/**`,
    method: 'PATCH',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /admin-api/crm/&#42;&#42; */
export async function crm404(
  params: APITypes.crm404Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/crm/**`,
    method: 'GET',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /admin-api/crm/&#42;&#42; */
export async function crm4043(
  params: APITypes.crm4043Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/crm/**`,
    method: 'PUT',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /admin-api/crm/&#42;&#42; */
export async function crm4042(
  params: APITypes.crm4042Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/crm/**`,
    method: 'POST',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /admin-api/crm/&#42;&#42; */
export async function crm4045(
  params: APITypes.crm4045Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/crm/**`,
    method: 'DELETE',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PATCH /admin-api/crm/&#42;&#42; */
export async function crm4044(
  params: APITypes.crm4044Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/crm/**`,
    method: 'PATCH',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /admin-api/erp/&#42;&#42; */
export async function erp404(
  params: APITypes.erp404Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/erp/**`,
    method: 'GET',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /admin-api/erp/&#42;&#42; */
export async function erp4043(
  params: APITypes.erp4043Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/erp/**`,
    method: 'PUT',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /admin-api/erp/&#42;&#42; */
export async function erp4042(
  params: APITypes.erp4042Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/erp/**`,
    method: 'POST',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /admin-api/erp/&#42;&#42; */
export async function erp4045(
  params: APITypes.erp4045Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/erp/**`,
    method: 'DELETE',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PATCH /admin-api/erp/&#42;&#42; */
export async function erp4044(
  params: APITypes.erp4044Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/erp/**`,
    method: 'PATCH',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /admin-api/mp/&#42;&#42; */
export async function mp404(
  params: APITypes.mp404Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/mp/**`,
    method: 'GET',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /admin-api/mp/&#42;&#42; */
export async function mp4043(
  params: APITypes.mp4043Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/mp/**`,
    method: 'PUT',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /admin-api/mp/&#42;&#42; */
export async function mp4042(
  params: APITypes.mp4042Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/mp/**`,
    method: 'POST',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /admin-api/mp/&#42;&#42; */
export async function mp4045(
  params: APITypes.mp4045Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/mp/**`,
    method: 'DELETE',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PATCH /admin-api/mp/&#42;&#42; */
export async function mp4044(
  params: APITypes.mp4044Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/mp/**`,
    method: 'PATCH',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /admin-api/pay/&#42;&#42; */
export async function pay404(
  params: APITypes.pay404Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/pay/**`,
    method: 'GET',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /admin-api/pay/&#42;&#42; */
export async function pay4043(
  params: APITypes.pay4043Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/pay/**`,
    method: 'PUT',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /admin-api/pay/&#42;&#42; */
export async function pay4042(
  params: APITypes.pay4042Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/pay/**`,
    method: 'POST',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /admin-api/pay/&#42;&#42; */
export async function pay4045(
  params: APITypes.pay4045Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/pay/**`,
    method: 'DELETE',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PATCH /admin-api/pay/&#42;&#42; */
export async function pay4044(
  params: APITypes.pay4044Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/pay/**`,
    method: 'PATCH',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /admin-api/product/&#42;&#42; */
export async function mall404(
  params: APITypes.mall404Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/product/**`,
    method: 'GET',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /admin-api/product/&#42;&#42; */
export async function mall4043(
  params: APITypes.mall4043Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/product/**`,
    method: 'PUT',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /admin-api/product/&#42;&#42; */
export async function mall4042(
  params: APITypes.mall4042Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/product/**`,
    method: 'POST',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /admin-api/product/&#42;&#42; */
export async function mall4045(
  params: APITypes.mall4045Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/product/**`,
    method: 'DELETE',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PATCH /admin-api/product/&#42;&#42; */
export async function mall4044(
  params: APITypes.mall4044Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/product/**`,
    method: 'PATCH',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /admin-api/promotion/&#42;&#42; */
export async function mall40414(
  params: APITypes.mall40414Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/promotion/**`,
    method: 'GET',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /admin-api/promotion/&#42;&#42; */
export async function mall40417(
  params: APITypes.mall40417Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/promotion/**`,
    method: 'PUT',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /admin-api/promotion/&#42;&#42; */
export async function mall40416(
  params: APITypes.mall40416Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/promotion/**`,
    method: 'POST',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /admin-api/promotion/&#42;&#42; */
export async function mall40419(
  params: APITypes.mall40419Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/promotion/**`,
    method: 'DELETE',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PATCH /admin-api/promotion/&#42;&#42; */
export async function mall40418(
  params: APITypes.mall40418Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/promotion/**`,
    method: 'PATCH',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /admin-api/report/&#42;&#42; */
export async function report404(
  params: APITypes.report404Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/report/**`,
    method: 'GET',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /admin-api/report/&#42;&#42; */
export async function report4043(
  params: APITypes.report4043Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/report/**`,
    method: 'PUT',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /admin-api/report/&#42;&#42; */
export async function report4042(
  params: APITypes.report4042Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/report/**`,
    method: 'POST',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /admin-api/report/&#42;&#42; */
export async function report4045(
  params: APITypes.report4045Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/report/**`,
    method: 'DELETE',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PATCH /admin-api/report/&#42;&#42; */
export async function report4044(
  params: APITypes.report4044Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/report/**`,
    method: 'PATCH',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /admin-api/trade/&#42;&#42; */
export async function mall4047(
  params: APITypes.mall4047Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/trade/**`,
    method: 'GET',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /admin-api/trade/&#42;&#42; */
export async function mall40410(
  params: APITypes.mall40410Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/trade/**`,
    method: 'PUT',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /admin-api/trade/&#42;&#42; */
export async function mall4049(
  params: APITypes.mall4049Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/trade/**`,
    method: 'POST',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /admin-api/trade/&#42;&#42; */
export async function mall40412(
  params: APITypes.mall40412Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/trade/**`,
    method: 'DELETE',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PATCH /admin-api/trade/&#42;&#42; */
export async function mall40411(
  params: APITypes.mall40411Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/trade/**`,
    method: 'PATCH',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}
