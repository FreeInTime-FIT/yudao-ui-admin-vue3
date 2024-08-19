/**
 * @description
 * @author yinshi
 * @date 2024/7/29
 */
import { defineStore } from 'pinia'

import { store } from '../index'
import {getProjectInfoList} from "@/services/services/guanlihoutaiXiangmuxinxi";

type ProjectInfo = {

}

export const useProjectStore = defineStore('projectStore', {
  state() {
    return {
      projectInfo: null,
      projectList: [
      ],
    }
  },
  actions: {
    async getProjectList() {
      const res = await getProjectInfoList({});
      if(res.code) {
        return
      }
      this.projectList = res.data.list;
      this.projectInfo = this.projectList[0];
    },
    changeProject(project)  {
      console.log(project);
      this.projectInfo = project;
    }
  }
})
