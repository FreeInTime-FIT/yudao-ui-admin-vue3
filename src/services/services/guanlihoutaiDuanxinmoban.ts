// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 创建短信模板 POST /admin-api/system/sms-template/create */
export async function createSmsTemplate(
  params: APITypes.createSmsTemplateParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.SmsTemplateSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultLong>({
    url: `/admin-api/system/sms-template/create`,
    method: 'POST',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 删除短信模板 DELETE /admin-api/system/sms-template/delete */
export async function deleteSmsTemplate(
  params: APITypes.deleteSmsTemplateParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/sms-template/delete`,
    method: 'DELETE',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 导出短信模板 Excel GET /admin-api/system/sms-template/export-excel */
export async function exportSmsTemplateExcel(
  params: APITypes.exportSmsTemplateExcelParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<any>({
    url: `/admin-api/system/sms-template/export-excel`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得短信模板 GET /admin-api/system/sms-template/get */
export async function getSmsTemplate(
  params: APITypes.getSmsTemplateParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultSmsTemplateRespVO>({
    url: `/admin-api/system/sms-template/get`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得短信模板分页 GET /admin-api/system/sms-template/page */
export async function getSmsTemplatePage(
  params: APITypes.getSmsTemplatePageParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultSmsTemplateRespVO>({
    url: `/admin-api/system/sms-template/page`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 发送短信 POST /admin-api/system/sms-template/send-sms */
export async function sendSms(
  params: APITypes.sendSmsParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.SmsTemplateSendReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultLong>({
    url: `/admin-api/system/sms-template/send-sms`,
    method: 'POST',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 更新短信模板 PUT /admin-api/system/sms-template/update */
export async function updateSmsTemplate(
  params: APITypes.updateSmsTemplateParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.SmsTemplateSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/sms-template/update`,
    method: 'PUT',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}
