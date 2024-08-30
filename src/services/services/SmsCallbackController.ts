// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 阿里云短信的回调 参见 https://help.aliyun.com/zh/sms/developer-reference/configure-delivery-receipts-1 文档 POST /admin-api/system/sms/callback/aliyun */
export async function receiveAliyunSmsStatus(options?: { [key: string]: any }) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/sms/callback/aliyun`,
    method: 'POST',
    ...(options || {}),
  });
}

/** 腾讯云短信的回调 参见 https://cloud.tencent.com/document/product/382/59178 文档 POST /admin-api/system/sms/callback/tencent */
export async function receiveTencentSmsStatus(options?: { [key: string]: any }) {
  return request<APITypes.CommonResultBoolean>({
    url: `/admin-api/system/sms/callback/tencent`,
    method: 'POST',
    ...(options || {}),
  });
}
