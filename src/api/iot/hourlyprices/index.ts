import request from '@/config/axios'

// 每小时的价格信息 VO
export interface HourlyPricesVO {
  id: number // 主键
  month: string // 存储年月，格式为YYYY-MM，例如2024-08，用于标识具体的年份和月份
  projectId: number // 项目的唯一标识ID
  price01: number // 第1小时的价格
  price02: number // 第2小时的价格
  price03: number // 第3小时的价格
  price04: number // 第4小时的价格
  price05: number // 第5小时的价格
  price06: number // 第6小时的价格
  price07: number // 第7小时的价格
  price08: number // 第8小时的价格
  price09: number // 第9小时的价格
  price10: number // 第10小时的价格
  price11: number // 第11小时的价格
  price12: number // 第12小时的价格
  price13: number // 第13小时的价格
  price14: number // 第14小时的价格
  price15: number // 第15小时的价格
  price16: number // 第16小时的价格
  price17: number // 第17小时的价格
  price18: number // 第18小时的价格
  price19: number // 第19小时的价格
  price20: number // 第20小时的价格
  price21: number // 第21小时的价格
  price22: number // 第22小时的价格
  price23: number // 第23小时的价格
  price24: number // 第24小时的价格
}

// 每小时的价格信息 API
export const HourlyPricesApi = {
  // 查询每小时的价格信息分页
  getHourlyPricesPage: async (params: any) => {
    return await request.get({ url: `/iot/hourly-prices/page`, params })
  },

  // 查询每小时的价格信息详情
  getHourlyPrices: async (id: number) => {
    return await request.get({ url: `/iot/hourly-prices/get?id=` + id })
  },

  // 新增每小时的价格信息
  createHourlyPrices: async (data: HourlyPricesVO) => {
    return await request.post({ url: `/iot/hourly-prices/create`, data })
  },

  // 修改每小时的价格信息
  updateHourlyPrices: async (data: HourlyPricesVO) => {
    return await request.put({ url: `/iot/hourly-prices/update`, data })
  },

  // 删除每小时的价格信息
  deleteHourlyPrices: async (id: number) => {
    return await request.delete({ url: `/iot/hourly-prices/delete?id=` + id })
  },

  // 导出每小时的价格信息 Excel
  exportHourlyPrices: async (params) => {
    return await request.download({ url: `/iot/hourly-prices/export-excel`, params })
  }
}