<script setup lang="tsx">
import { SuccessFilled, CircleCloseFilled} from "@element-plus/icons-vue";
import CardHeader from "@/views/screen/components/CardHeader.vue";
import InputWarp from "@/views/screen/components/InputWarp.vue";

import {useTable} from "@/hooks/web/useTable";
type QueryParams = {
  startTime?: string;
  endTime?: string;
  module?: string;
}
type RecordItem = {
  id: number | string;
  time: string;
  level: 1 | 2 | 3 | 4;
}
const queryParams = reactive<{
  startTime?: string;
  endTime?: string;
  module?: string;
}>({
  module: '',
  startTime: undefined,
  endTime: undefined,
})
const changeVisible = ref(false);
const selected = ref(
  'normal'
);
const innerModule = ref();
const moduleList = [{
  label: '经济模式',
  value: 'jj',
}, {
  label: '普通模式',
  value: 'normal',
}, {
  label: '微网运行模式',
  value: 'ww',
}, {
  label: '零碳运行模式',
  value: 'lt',
}, {
  label: '控功率模式',
  value: 'kgs',
}, {
  label: '控电量模式',
  value: 'kdl',
}]
const selectedModule = computed(() => {
  return moduleList.find(i => i.value === unref(selected));
})
const {  tableObject, tableMethods } = useTable<RecordItem>({
  async getListApi(option: any) {
    console.log(option);
    return {
      list: [{id: 1, name: '光伏模型      ',  status : '经济模式', person: 'xxxx'},
        { id: 2, name: '储能模型', status : '经济模式', person: 'xxxx'},
        { id: 3, name: '负荷模型 ', status : '经济模式', person: 'xxxx'},
        {id: 11, name: '电网模型', status : '经济模式', person: 'xxxx'},
        { id: 21, name: '光伏模型1', status : '经济模式', person: 'xxxx'},
        { id: 31, name: '储能模型', status : '经济模式', person: 'xxxx'},
        {id: 111, name: '负荷模型', status : '经济模式', person: 'xxxx'},
        { id: 211, name: '电网模型', status : '经济模式'},
        { id: 311, time: '2024-05-05 09:09:09', level : 3},
        {id: 1111, time: '2024-05-05 09:09:09', level : 1},
        { id: 2111, time: '2024-05-05 09:09:09', level : 2},
        { id: 3111, time: '2024-05-05 09:09:09', level : 3}, ] as RecordItem[],
      total: 20,
    };
  }, props: undefined, response: undefined,
  defaultParams: queryParams,
});
const { getList, setSearchParams } = tableMethods
onMounted(() => {
  getList()
})
const handleEdit = (row) => {
  console.log(row);
}
const handleClose = () => {

}
const handleOpen = () => {

}
const handleChangeVisible = () => {
  changeVisible.value = true;
  innerModule.value = unref(selected);
}
const handleConfirm = () => {
  changeVisible.value = false;
  selected.value = unref(innerModule);
}
</script>

<template>
  <ElCard
    class="header-card"
    body-class="header-card_body"
  >
    <template #header>
      <header class="flex p-[8px_12px] flex-justify-between flex-items-center">
        <h3 class="title">
          系统模式
          <span class="module-selected">{{selectedModule.label}}</span>
        </h3>
        <div>
          <ElButton type="primary" @click="handleChangeVisible">切换模式</ElButton>
        </div>
      </header>
    </template>
    <aside class="statistic-card">
      <el-row gutter="16">
        <ElCol :span="7">
          <div class="statistic-card-item">
            <header class="statistic-card-item_title">运行状态</header>
            <div class="statistic-card-item_list">
              <div>
                <div class="statistic-card-item_value"> {{444}}</div>
                <div class="statistic-card-item_name">已运行时长(分钟)</div>
              </div>
              <div>
                <div class="statistic-card-item_value">{{444}}</div>
                <div class="statistic-card-item_name">可运行时长(分钟)</div>
              </div>
            </div>
          </div>
        </ElCol>
        <ElCol :span="7">
          <div class="statistic-card-item">
            <header class="statistic-card-item_title">功率（kW）</header>
            <div class="statistic-card-item_list">
              <div>
                <div class="statistic-card-item_value"> {{300}}</div>
                <div class="statistic-card-item_name">实时功率</div>
              </div>
              <div>
                <div class="statistic-card-item_value">{{600}}</div>
                <div class="statistic-card-item_name">目标功率</div>
              </div>
            </div>
          </div>
        </ElCol>
        <ElCol :span="10">
          <div class="statistic-card-item">
            <header class="statistic-card-item_title">其他（kW）</header>
            <div class="statistic-card-item_list">
              <div>
                <div class="statistic-card-item_value">{{1120}}</div>
                <div class="statistic-card-item_name">潜在值</div>
              </div>
              <div>
                <div class="statistic-card-item_value"> {{-187.1}}</div>
                <div class="statistic-card-item_name">调节值</div>
              </div>
              <div>
                <div class="statistic-card-item_value">{{20}}</div>
                <div class="statistic-card-item_name">调节死区</div>
              </div>
            </div>
          </div>
        </ElCol>
      </el-row>
    </aside>
  </ElCard>

  <ElForm
    ref="queryFormRef"
    :inline="true"
    :model="queryParams"
    class=" form"
  >
    <ElFormItem prop="d" >
      <InputWarp>
        <ElSelect placeholder="名称" >
          <ElOption value="a">所有设备</ElOption>
        </ElSelect>
      </InputWarp>
    </ElFormItem>
    <ElFormItem prop="12" >
      <InputWarp>
        <ElSelect placeholder="运行状态" >
          <ElOption value="a">所有设备</ElOption>
        </ElSelect>
      </InputWarp>

    </ElFormItem>

    <ElFormItem>
      <ElButton type="primary">查询</ElButton>
    </ElFormItem>
  </ElForm>
  <ContentWrap
    title="模式设置列表"
  >
    <ElTable

      v-loading="tableObject.loading"
      :data="tableObject.tableList"
      stripe
    >
      <ElTableColumn width="80" label="序号" type="index" :index="index => index + 1" />
      <ElTableColumn prop="name" label="名称" />
      <ElTableColumn prop="status" label="运行状态"  />
      <ElTableColumn prop="3" label="控制" >
        <template #default="scope">
          <el-icon size="20" color="var(--el-color-success)" @click="handleOpen(scope.row)"><SuccessFilled /></el-icon>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="4" label="闭锁" >
        <template #default="scope">
          <el-icon size="20" color="var(--el-color-danger)" @click="handleClose(scope.row)"><CircleCloseFilled /></el-icon>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="person" label="操作人" />
      <ElTableColumn prop="7" label="用户编号" />
    </ElTable>
    <ElPagination
      :total="tableObject.total"
      v-model:current-page="tableObject.currentPage"
      v-model:page-size="tableObject.pageSize"
    />
    <ElDialog width="750" v-model="changeVisible" title="切换模式">
      <div class="module-list">
        <div v-for="item in moduleList"
             class="module-item"
             :key="item.value"
             @click="innerModule=item.value"
             :class="{selected: item.value === innerModule}"
        >
          <span>{{item.label}}</span></div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="changeVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirm">
            确认切换
          </el-button>
        </div>
      </template>
    </ElDialog>
  </ContentWrap>

</template>

<style scoped lang="scss">
  :deep{
    .el-select{
      --el-select-width: 180px;
    }
    .el-form-item{
      align-items: center;
    }
  }
  .statistic-card{
    text-align: center;
    margin-bottom: 30px;
  }
  .title{
    font-size: 20px;

    &:before{
      content: '';
      display: inline-block;
      width: 4px;
      height: 16px;
      background-color: var(--el-color-primary);
      margin-right: 8px;
    }
  }
  .header-card{
    --el-card-padding: 2px;
    --el-card-bg-color: transparent;
    margin: 0 16px 12px 0;
    :deep(.el-card__header){
      background-color: transparent;
    }
    :deep(.el-card__body){
      margin-top: 0;
      background-color: transparent;
    }
    h3{
      margin: 0;
    }
  }
  a{
    color: #fff;
    text-decoration: none;
  }
  .statistic-card-item{
    box-shadow: var(--el-box-shadow);
    padding: 12px 16px;
    background-color: #17203a;
    border-right: 4px;
    margin-top: 8px;
    &_title{
      font-size: 16px;
      font-weight: bold;
      text-align: left;
    }
    &_list{
      margin-top: 8px;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
    &_value{
      font-size: 24px;
      font-weight: bold;
    }
    &_name{
      margin-top: 3px;
    }
  }
  .module-list{
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
  .module-item{
    position: relative;
    display: inline-block;
    border-radius: 4px;
    padding: 6px 12px;
    width: 200px;
    text-align: center;
    background-color: #17203a;
    box-shadow: inset 0 0 12px 0 var(--el-color-primary);
    font-size: 20px;
    cursor: pointer;
    transition: all linear 0.3s;
    &:hover{
      font-weight: bold;
      transform: scale(1.04);
    }
    &:active{
      box-shadow: inset 0 0 12px 0 var(--el-color-warning);
      background-color: #3b290f;
    }
    &.selected{
      color: var(--el-color-warning);
      font-weight: bold;

    }
    &:after,
    &:before{
      position: absolute;
      top: 12px;
      content: '';
      display: inline-block;
      width: 2px;
      height: 16px;
    }
    &:before{
      left: 12px;
      box-shadow: 2px 0 4px 0 #0861bb;

    }
    &:after{
      right: 12px;
      box-shadow: -2px 0 4px 0 #0861bb;
    }
  }
  .module-selected{
    position: relative;
    display: inline-block;
    border-radius: 4px;
    padding: 6px 40px;
    background-color: #17203a;
    box-shadow: inset 0 0 12px 0 var(--el-color-primary);
    font-size: 24p;
    color: var(--el-color-warning);
    &:after,
    &:before{
      position: absolute;
      top: 12px;
      content: '';
      display: inline-block;
      width: 2px;
      height: 16px;
    }
    &:before{
      left: 12px;
      box-shadow: 2px 0 4px 0 #0861bb;

    }
    &:after{
      right: 12px;
      box-shadow: -2px 0 4px 0 #0861bb;
    }
  }

  :deep(.dot){
    display: inline-flex;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 8px;
    vertical-align: middle;
  }
</style>
