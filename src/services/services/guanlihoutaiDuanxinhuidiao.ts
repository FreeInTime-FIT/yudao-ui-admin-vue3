// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 阿里云短信的回调 参见 https://help.aliyun.com/zh/sms/developer-reference/configure-delivery-receipts-1 文档 POST /admin-api/system/sms/callback/aliyun */
export async function receiveAliyunSmsStatus(
  params: APITypes.receiveAliyunSmsStatusParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/sms/callback/aliyun`,
    method: 'POST',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}

/** 腾讯云短信的回调 参见 https://cloud.tencent.com/document/product/382/59178 文档 POST /admin-api/system/sms/callback/tencent */
export async function receiveTencentSmsStatus(
  params: APITypes.receiveTencentSmsStatusParams & {
    // header
    /** 租户编号 */
    'tenant-id'?: number;
    /** 认证 Token */
    Authorization?: string;
  },
  options?: { [key: string]: any },
) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/sms/callback/tencent`,
    method: 'POST',
    headers: {},
    params: { ...params },
    ...(options || {}),
  });
}
