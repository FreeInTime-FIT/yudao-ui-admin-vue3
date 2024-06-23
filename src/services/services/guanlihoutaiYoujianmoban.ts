// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 创建邮件模版 POST /admin-api/system/mail-template/create */
export async function createMailTemplate(
  params: APITypes.createMailTemplateParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.MailTemplateSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultLong>({
    url: `/admin-api/system/mail-template/create`,
    method: 'POST',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 删除邮件模版 DELETE /admin-api/system/mail-template/delete */
export async function deleteMailTemplate(
  params: APITypes.deleteMailTemplateParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/mail-template/delete`,
    method: 'DELETE',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得邮件模版 GET /admin-api/system/mail-template/get */
export async function getMailTemplate(
  params: APITypes.getMailTemplateParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultMailTemplateRespVO>({
    url: `/admin-api/system/mail-template/get`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获得邮件模版精简列表 GET /admin-api/system/mail-template/list-all-simple */
export async function getSimpleTemplateList(
  params: APITypes.getSimpleTemplateListParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultListMailTemplateSimpleRespVO>({
    url: `/admin-api/system/mail-template/list-all-simple`,
    method: 'GET',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 获得邮件模版分页 GET /admin-api/system/mail-template/page */
export async function getMailTemplatePage(
  params: APITypes.getMailTemplatePageParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultPageResultMailTemplateRespVO>({
    url: `/admin-api/system/mail-template/page`,
    method: 'GET',
    headers: {},
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 发送短信 POST /admin-api/system/mail-template/send-mail */
export async function sendMail(
  params: APITypes.sendMailParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.MailTemplateSendReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultLong>({
    url: `/admin-api/system/mail-template/send-mail`,
    method: 'POST',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 获得邮件模版精简列表 GET /admin-api/system/mail-template/simple-list */
export async function getSimpleTemplateList1(
  params: APITypes.getSimpleTemplateList1Params & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultListMailTemplateSimpleRespVO>({
    url: `/admin-api/system/mail-template/simple-list`,
    method: 'GET',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 修改邮件模版 PUT /admin-api/system/mail-template/update */
export async function updateMailTemplate(
  params: APITypes.updateMailTemplateParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  body: APITypes.MailTemplateSaveReqVO,
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/mail-template/update`,
    method: 'PUT',
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}
