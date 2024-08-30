// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 此处后端没有提供注释 POST /admin-api/iot/device/message/switch-mode */
export async function switchMode(body: APITypes.SwitchModeParam, options?: { [key: string]: any }) {
  return request<APITypes.CommonResultObject>({
    url: `/admin-api/iot/device/message/switch-mode`,
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
