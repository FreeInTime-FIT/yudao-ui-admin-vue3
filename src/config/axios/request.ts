/**
 * @description
 * @author yinshi
 * @date 2024/6/21
 */
import {AxiosRequestConfig} from 'axios'
import { service } from './service'

import { config } from './config'

const { default_headers } = config


const request = <T extends Record<string, any>>(option: AxiosRequestConfig) => {
  const { url, method, params, body, headersType, responseType, ...config } = option
  return service<T>({
    url: url,
    method,
    baseURL: import.meta.env.VITE_BASE_URL + '/',
    // baseUrl: '/',
    params,
    data: body,
    ...config,
    responseType: responseType,
    headers: {
      'Content-Type': headersType || default_headers
    }
  })
}

export default request;
