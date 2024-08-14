import request from '@/config/axios'

// 项目信息 VO
export interface ProjectInfoVO {
  code: string // 项目编码
  name: string // 项目名称
  address: string // 项目地址
  lng: string // 经度
  lat: string // 纬度
  id: string // 主键ID
  ownerName: string // 项目负责人姓名
  contentUser: string // 联系人
  contentMobile: string // 联系电话
  remark: string // 备注
  state: number // 状态（1：正常，0：禁用）
}

// 项目信息 API
export const ProjectInfoApi = {
  // 查询项目信息分页
  getProjectInfoPage: async (params: any) => {
    return await request.get({ url: `/iot/project-info/page`, params })
  },

  // 查询项目信息详情
  getProjectInfo: async (id: number) => {
    return await request.get({ url: `/iot/project-info/get?id=` + id })
  },

  // 新增项目信息
  createProjectInfo: async (data: ProjectInfoVO) => {
    return await request.post({ url: `/iot/project-info/create`, data })
  },

  // 修改项目信息
  updateProjectInfo: async (data: ProjectInfoVO) => {
    return await request.put({ url: `/iot/project-info/update`, data })
  },

  // 删除项目信息
  deleteProjectInfo: async (id: number) => {
    return await request.delete({ url: `/iot/project-info/delete?id=` + id })
  },

  // 导出项目信息 Excel
  exportProjectInfo: async (params) => {
    return await request.download({ url: `/iot/project-info/export-excel`, params })
  },

  updateProjectState: async (id: number, state: number) => {
    return await request.put({url: `/iot/project-info/updateState`, data: {id, state}})
  },
}
