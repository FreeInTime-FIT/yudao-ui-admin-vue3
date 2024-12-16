// @ts-ignore
/* eslint-disable */
import request from '@/config/axios/request';

/** 此处后端没有提供注释 GET /admin-api/test/genSendFile */
export async function genSendFile(options?: { [key: string]: any }) {
  return request<any>({
    url: `/admin-api/test/genSendFile`,
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /admin-api/test/warning */
export async function warning(options?: { [key: string]: any }) {
  return request<any>({
    url: `/admin-api/test/warning`,
    method: 'GET',
    ...(options || {}),
  });
}
