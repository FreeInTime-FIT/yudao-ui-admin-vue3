/**
 * @description
 * @author yinshi
 * @date 2024/7/29
 */
import { defineStore } from 'pinia'

import { store } from '../index'

type ProjectInfo = {

}

export const useProjectStore = defineStore('projectStore', {
  state() {
    return {
      projectInfo: {
        name: '电力项目1',
        id: 1,
      },
      projectList: [
        {
          name: '电力项目1',
          id: 1,
          latlng: []
        },
        {
          name: '电力项目2',
          id: 2,
        },
        {
          name: '电力项目3',
          id: 3,
        },
      ],
    }
  },
  actions: {
    changeProject(project)  {
      console.log(project);
      this.projectInfo = project;
    }
  }
})
