<script setup lang="ts">
import dayjs from "dayjs";
import {ref, computed } from "vue";
import {useRouter} from "vue-router";
import {CaretBottom} from "@element-plus/icons-vue";
import { useProjectStore } from '@/store/modules/project'
const now = ref(dayjs());
const router = useRouter();
const projectVisible = ref(false);
const menu = router.options.routes.find(i => i.path === '/screen').children?.filter(i => !i.meta.hidden);

const projectStore = useProjectStore();
const date = computed(() => ({
  time: now.value.format('HH:mm:ss'),
  date: now.value.format('YYYY-MM-DD'),
}));

function handleClick(item) {
  router.push({
    name: item.name,
  })
}

const changeProject = (project) => {
  projectStore.changeProject(project)
  projectVisible.value = false;
  console.log(projectVisible.value);
}
setInterval(() => {
   now.value = dayjs();
}, 1000)
defineOptions({ name: 'ScreenLayout' })

</script>

<template>
  <section class="h-[100%] flex flex-col dark">
    <header class="flex pa-[12px] shadow-[var(--el-box-shadow-dark)] bg-[var(--screen-header-bg)] color-[var(--screen-header-text-color)]">
      <div class="flex-1 flex-items-center flex">
        <a type="info" href="/screen/index" class="font-size-[30px] color-[var(--screen-header-text-color)] logo">
          <img src="/logo.png" alt="" />
          <span>云监控系统</span>
        </a>
        <span>{{$route.meta.title}}</span>

        <ElPopover v-model:visible="projectVisible" placement="bottom" :width="400" trigger="click">
          <template #reference>
            <div class="select-project">
              <span>当前项目：</span>
              <span class="project-name">{{projectStore.projectInfo?.name}}</span>
              <el-icon><CaretBottom /></el-icon>
            </div>

          </template>
          <div>
            <div  v-for="item in projectStore.projectList"
                  class="project-item"
                  :class="{selected: projectStore.projectInfo.id === item.id}"
                  @click="changeProject(item)"
                  :key="item.id">
              <span>{{item.name}}</span>
            </div>
          </div>
        </ElPopover>
      </div>
      <div class="flex flex-items-center gap-10px">
        <RouterLink to="/screen/warning/index">
          <ElButton link>实时告警</ElButton>
        </RouterLink>
        <ElDivider direction='vertical' />
        <RouterLink to="/screen/setting/index">
          <ElButton link>
            <ElAvatar />
            <span class="ml-[6px]">管理中心</span>
          </ElButton>

        </RouterLink>
        <div class="text-center">
          <div class="text-24px font-600">
            {{date.time}}
          </div>
          <div>{{date.date}}</div>
        </div>
      </div>

    </header>
    <section class="flex-1 position-relative h-0 bg-[var(--screen-content-bg)]  color-[var(--screen-content-text-color)]">
      <div class="menu-box">
        <div class="menu-list">
          <div class="menu-item" :class="{active: item.name === $route.name}" v-for="item in menu" :key="item.path" @click="handleClick(item)">
            <div><Icon class="icon" icon="ant-design:dashboard-filled" /></div>
            <div>{{item.meta.title}}</div>
          </div>
        </div>
      </div>
      <article
        class="flex flex-col ml-[16px] box-border pt-[12px] h-[100%] overflow-y-auto"
        :class="{full: $route.meta.full}"
      >
        <router-view>
          <template #default="{ Component, route }">
            <component :is="Component" :key="route.fullPath" />
          </template>
        </router-view>
      </article>

    </section>
  </section>
</template>

<style scoped lang="scss">
  .dark{
    --el-text-color-regular: #fff;
    --el-input-text-color: #fff;
    --el-fill-color-blank: #101b43;
    --el-border-color-light: transparent;
    --el-text-color-placeholder: rgba(255, 255, 255, 0.9);
    --el-mask-color:  rgb(22 32 60);
   --el-text-color-primary:#fff;
    --el-card-padding: 4px;
    --el-border-color: transparent;
    --el-bg-color: rgb(22 32 60);
    --el-fill-color-light: rgba(77, 83, 94, 0.77);

  }
  :deep(.el-table){
    --el-table-header-text-color: #fff;
    --el-table-tr-bg-color: #101b43;
    --el-fill-color-lighter: var(--el-fill-color-blank);
    --el-table-border-color: var(--el-fill-color-blank);

  }
  .menu-box{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    background-color: transparent;
    color: #fff;
    z-index: 9999;
    min-width: 30px;
    overflow: auto;
    &:hover{
      background-color: var(--screen-content-bg);
      .menu-list{
        display: block;
      }
    }
  }
  .menu-list{
    transition: all linear 0.3s;
    display: none;
    width: 160px;
    background-color: #376ed8;
    padding: 12px 0;
  }
  .menu-item{
    display: flex;
    align-items: center;
    padding: 8px 12px;
    gap: 8px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    .icon{
      color: inherit;
    }
    &.active{
      background-color: #fff;
      color: #376ed8;
    }
    &:hover{
      color: #6d9af3;
    }
    .el-icon{
      color: inherit;
    }
    &:last-child{
      border-bottom: none;
    }
  }
  .logo{
    display: flex;
    text-decoration: none;
    font-weight: bold;
    white-space: nowrap;
    margin-right: 12px;
    img{
      width: 30px;
      display: block;
      margin-right: 4px;
    }
  }
  .select-project{
    padding: 4px 12px;
    border-radius: 4px;
    margin-left: 12px;
    cursor: pointer;
    background-color: var(--el-bg-color);
    .project-name{
      font-weight: bold;
      margin-right: 4px;
    }
  }
  .project-item{
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
    font-size: var(--el-text-font-size + 2);
    font-weight: bold;
    &:hover{
      background-color: var(--el-color-primary-light-9);
    }
    &.selected{
      color: var(--el-color-primary);
    }
  }
  .full{
    padding-top: 0;
    margin-top: 0;
    margin-left: 0;
  }
  :deep {
    .el-card{
      --el-card-padding: 10px;
      --el-card-bg-color: transparent;
    }
    .el-card__header{
      background: linear-gradient(to right, rgb(30 57 117), rgb(11 18 42));
      > div{
        background: linear-gradient(to right, rgb(54 104 199), rgb(11 18 42));
        padding: 6px 16px;

      }
    }
    .el-card__body{
      margin-top: 8px;
      background-color: rgb(22 32 60);
    }
  }
</style>
