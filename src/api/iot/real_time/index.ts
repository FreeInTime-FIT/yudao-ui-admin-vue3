import request from '@/config/axios'

export const IOTRealTimeAPI = {
  // 查询表的列
  getTableColumns: async (params: any) => {
    return await request.post({url: `/iot/device/real-time/columns`,  data:params})
  },
  // 分页查询数据
  getTableData: async (params: any) => {
    return await request.post({url: `/iot/device/real-time/data-page`, data: params})
  }
}
