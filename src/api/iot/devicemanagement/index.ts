import request from '@/config/axios'

// 设备管理 VO
export interface DeviceManagementVO {
  id: number // 主键ID
  deviceCode: string // 设备编号
  projectCode: string // 项目编号
  transformerCapacity: number // 变压器容量(kVA)
  loadPower: number // 负荷功率(kW)
  energyStorageType: string // 储能类型
  energyStorageCapacity: number // 储能容量(kWh)
  ratedPower: number // 额定功率(kW)
  batteryType: string // 电池类型
  batteryVoltageRange: string // 电池电压范围(V)
  dischargeDepth: number // 放电深度(%)
  cycleLife: number // 循环寿命(次)
  chargeDischargeRate: string // 充放电速率(C)
  expectedLifespan: number // 预期寿命(年)
  temperatureRange: string // 温度范围(°C)
  remark: string // 备注
}

// 设备管理 API
export const DeviceManagementApi = {
  // 查询设备管理分页
  getDeviceManagementPage: async (params: any) => {
    return await request.get({ url: `/iot/device-management/page`, params })
  },

  // 查询设备管理详情
  getDeviceManagement: async (id: number) => {
    return await request.get({ url: `/iot/device-management/get?id=` + id })
  },

  // 新增设备管理
  createDeviceManagement: async (data: DeviceManagementVO) => {
    return await request.post({ url: `/iot/device-management/create`, data })
  },

  // 修改设备管理
  updateDeviceManagement: async (data: DeviceManagementVO) => {
    return await request.put({ url: `/iot/device-management/update`, data })
  },

  // 删除设备管理
  deleteDeviceManagement: async (id: number) => {
    return await request.delete({ url: `/iot/device-management/delete?id=` + id })
  },

  // 导出设备管理 Excel
  exportDeviceManagement: async (params) => {
    return await request.download({ url: `/iot/device-management/export-excel`, params })
  }
}