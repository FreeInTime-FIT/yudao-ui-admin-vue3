/**
 * @description
 * @author yinshi
 * @date 2024/7/29
 */
import { defineStore } from 'pinia'
import {getProjectInfoList} from "@/services/services/guanlihoutaiXiangmuxinxi";

type ProjectParams = {
  projectInfo: APITypes.ProjectInfoRespVO | null;
  projectList: APITypes.ProjectInfoRespVO[];
}

export const useProjectStore = defineStore('projectStore', {
  state(): ProjectParams {
    return {
      projectInfo: null,
      projectList: [],
    }
  },
  actions: {
    async getProjectList() {
      const res = await getProjectInfoList({});
      if(!res || !res.data) {
        return
      }
      this.projectList = res.data.list || [];
      this.projectInfo = this.projectList[0];
    },
    changeProject(project)  {
      console.log(project);
      this.projectInfo = project;
    }
  }
})
