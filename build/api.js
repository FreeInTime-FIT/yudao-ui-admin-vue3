/**
 * @description
 * @author yinshi
 * @date 2024/6/21
 */
const { generateService } = require('openapi3-ts-generator')

generateService({
  // schemaPath: 'http://120.26.61.213:84/v3/api-docs/all',
  schemaPath: 'http://192.168.1.11:48080/v3/api-docs/all',
  servicesPath: './src/services',
  requestImportStatement: "import request from '@/config/axios/request'",
})


