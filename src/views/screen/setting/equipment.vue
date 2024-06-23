<script setup lang="tsx">
import InputWarp from "@/views/screen/components/InputWarp.vue";
import {useTable} from "@/hooks/web/useTable";
import CardHeader from "@/views/screen/components/CardHeader.vue";
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
const {  tableObject, tableMethods } = useTable<RecordItem>({
  async getListApi(option: any) {
    console.log(option);
    return {
      list: [{id: 1, name: '光伏模型      ',  status : '经济模式', person: 'xxxx'},
        { id: 2, name: '储能模型', status : '经济模式', person: 'xxxx'},
        { id: 3, name: '负荷模型 ', status : '经济模式', person: 'xxxx'},
        {id: 11, name: '电网模型', status : '经济模式', person: 'xxxx'},
        { id: 21, name: '光伏模型1', status : '经济模式', person: 'xxxx'},
        { id: 31, name: '储能模型', status : '经济模式', person: 'xxxx'}
      ] as RecordItem[],
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
</script>

<template>
  <ElForm
    ref="queryFormRef"
    :inline="true"
    :model="queryParams"
    class="-mb-15px form"
  >
    <ElFormItem prop="d" >
      <InputWarp>
        <ElSelect placeholder="参数名称" >
          <ElOption value="a">所有设备</ElOption>
        </ElSelect>
      </InputWarp>
    </ElFormItem>
    <ElFormItem prop="12" >
      <InputWarp>
        <ElSelect placeholder="参数用途" >
          <ElOption value="a">所有设备</ElOption>
        </ElSelect>
      </InputWarp>

    </ElFormItem>

    <ElFormItem>
      <ElButton type="primary">查询</ElButton>
    </ElFormItem>
  </ElForm>
  <ContentWrap
    title="设备配置列表"
  >
    <ElTable
      v-loading="tableObject.loading"
      :data="tableObject.tableList"
      stripe
    >
      <ElTableColumn width="80" label="序号" type="index" :index="index => index + 1" />
      <ElTableColumn prop="name" label="参数名称" />
      <ElTableColumn prop="status" label="参数用途"  />
      <ElTableColumn prop="3" label="默认值" />
      <ElTableColumn prop="4" label="设置值" />
      <ElTableColumn prop="person" label="回传值" />
      <ElTableColumn prop="7" label="回传时间" />
      <ElTableColumn prop="6" label="操作" >
        <template #default="scope">
          <a @click="handleEdit(scope.row)">招采</a>
          <a @click="handleEdit(scope.row)">下发</a>
        </template>
      </ElTableColumn>
    </ElTable>

  </ContentWrap>
  <CardHeader title="环控设备" />
  <section class="flex  gap-[40px] mt-[30px]">
    <article class="flex-[1] module-item">
      <h3>运行状态</h3>
      <div class="row-list">
        <div class="row-item border">
          <div class="row-item_col_1">
            整机状态
          </div>
          <div class="row-item_col_2">
            <div class="status status-success">运行</div>
          </div>
        </div>
        <div class="row-item border">
          <div class="row-item_col_1">
            内风机
          </div>
          <div class="row-item_col_2">
            <div class="status status-stop">暂停</div>
          </div>
        </div>
        <div class="row-item border">
          <div class="row-item_col_1">
            外风机
          </div>
          <div class="row-item_col_2">
            <div class="status status-success">运行</div>
          </div>
        </div>
        <div class="row-item border">
          <div class="row-item_col_1">
            压缩比
          </div>
          <div class="row-item_col_2">
            <div class="status status-success">运行</div>
          </div>
        </div>
        <div class="row-item border">
          <div class="row-item_col_1">
            电加热
          </div>
          <div class="row-item_col_2">
            <div class="status status-success">运行</div>
          </div>
        </div>
        <div class="row-item border">
          <div class="row-item_col_1">
            应急风机
          </div>
          <div class="row-item_col_2">
            <div class="status status-stop">暂停</div>
          </div>
        </div>
      </div>
    </article>
    <article class="flex-[1] module-item">
      <h3>柜体状态</h3>
      <div class="row-list">
        <div class="row-item border">
          <div class="row-item_col_1">
            温度
          </div>
          <div class="row-item_col_2">
          </div>
        </div>
        <div class="row-item border">
          <div class="row-item_col_1">
            湿度
          </div>
          <div class="row-item_col_2">
          </div>
        </div>
      </div>
      <h3>模式状态</h3>
      <div class="row-list">
        <div class="row-item border">
          <div class="row-item_col_1">
            模式状态
          </div>
          <div class="row-item_col_2">
            <div class="status status-success">待机</div>
          </div>
        </div>
      </div>
    </article>
    <article class="flex-[2] module-item">
      <h3>遥控参数</h3>
      <div class="flex gap-[40px]">
        <div class="row-list flex-[1]">
          <div class="row-item border">
            <div class="row-item_col_1">
              监控开关机
            </div>
            <div class="row-item_col_2">
              <div class="status status-success">开机</div>
            </div>
          </div>
          <div class="row-item border">
            <div class="row-item_col_1">
              下发最高控制温度
            </div>
            <div class="row-item_col_2">
              <div class="status status-stop">失效</div>
            </div>
          </div>
          <div class="row-item border">
            <div class="row-item_col_1">
              下发最低控制温度
            </div>
            <div class="row-item_col_2">
              <div class="status status-stop">失效</div>
            </div>
          </div>
          <div class="row-item border">
            <div class="row-item_col_1">
              保留
            </div>
            <div class="row-item_col_2">
            </div>
          </div>
          <div class="row-item border">
            <div class="row-item_col_1">
              下发控制湿度
            </div>
            <div class="row-item_col_2">
              <div class="status status-success">正常</div>
            </div>
          </div>
        </div>
        <div class="row-list flex-[1]">
          <div class="row-item border">
            <div class="row-item_col_1">
              启动制冷
            </div>
            <div class="row-item_col_2">
              <div class="status status-success">开机</div>
            </div>
          </div>
          <div class="row-item border">
            <div class="row-item_col_1">
              启动送风
            </div>
            <div class="row-item_col_2">
              <div class="status status-stop">失效</div>
            </div>
          </div>
          <div class="row-item border">
            <div class="row-item_col_1">
              启动待机
            </div>
            <div class="row-item_col_2">
              <div class="status status-stop">失效</div>
            </div>
          </div>
          <div class="row-item border">
            <div class="row-item_col_1">
              启动加热
            </div>
            <div class="row-item_col_2">
              <div class="status status-stop">失效</div>
            </div>
          </div>
        </div>
      </div>

    </article>
  </section>
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
  a{
    color: #fff;
    text-decoration: none;
  }
  .module-item{

    h3{
      margin: 0;
      background-color: #102e4e;
      display: inline-block;
      padding: 3px 100px 3px 8px;
      font-weight: bolder;
    }

  }
  .row-list{
    padding: 12px 0;
  }
  .row-item{
    background-color: #183b5f;
    display: flex;
    align-items: stretch;
    border: 2px solid #29616d;
    border-bottom: none;
    &.border{
      > div{
        border-right: 1px solid #29616d;
        &:last-child{
          border-right: none;
        }
      }
    }
    &_col_header{
      flex: 1;
      text-align: center;
    }
    &_col_1{
      flex: 1.2;
      min-width: 60px;
    }
    &_col_2{
      flex: 1;
      min-width: 60px;
    }
    &:last-child{
      border-bottom: 2px solid #29616d;
    }
    > div{
      width: 0;
      padding: 3px 8px;
    }
  }


  .status{
    &:before{
      content: '';
      display: inline-block;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 1px solid #fff;
      margin-right: 8px;
      vertical-align: middle;
    }
    &.status-success:before{
      background-color: var(--el-color-success);
    }
    &.status-stop:before{
      background-color: var(--el-color-danger);
    }
  }
</style>
