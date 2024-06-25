<script setup lang="ts">
  defineOptions({
    name: 'BatteryInfo',
  })

  const priceList = [{
    time: '0:00-07:00',
    price: 0.3125,
  }, {
    time: '07:00-10:00',
    price: 0.7003,
  }, {
    time: '10:00-14:00',
    price: 1.2135,
  }, {
    time: '14:00-24:00',
    isDanger: true,
    price: 0.7033,
  }]
  const rowCls = (row) => {
    if (row.isDanger) {
      return 'danger-row';
    }
    return '';
  }
</script>

<template>
  <section class="battery-box">
    <header class="flex flex-items-center battery-box_header">
      <div>电池状态</div>
      <div class="battery-info-block">充电</div>
      <div class="battery-info-block">soc %</div>
    </header>
    <div class="flex">
      <div class="p-[12px] battery-info-list">
        <div class="flex">
          <div class="battery-info-block">
            <div class="battery-info_value">
              <span>xxxkWh</span>
            </div>
            <div class="battery-info_name">电池剩余电量</div>
          </div>
          <div class="battery-info-block">
            <div class="battery-info_value">
              <span>xxxkWh</span>
            </div>
            <div class="battery-info_name">可离网运行时间</div>
          </div>
        </div>
        <div class="battery-info-block">
          <div class="battery-info_value">
            <span>xxxkWh</span>
          </div>
          <div class="battery-info_name">电池充放电功率</div>
        </div>
        <div class="battery-info-block">
          <div class="battery-info_value">
            <span>xxx h</span>
          </div>
          <div class="battery-info_name">充放电截止时间</div>
        </div>
      </div>
      <div>
        <ElTable
          :data="priceList"
          row-key="time"
          border
          :row-class-name="rowCls"
        >
          <ElTableColumn width="120" prop="time" label="时段" />
          <ElTableColumn width="80" prop="price" label="电价" />
        </ElTable>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.battery-box{
  background-color: #2d4476;
  padding: 8px;
  flex: 1;
  &_header{
    padding-left: 12px;
    font-size: 18px;
  }
}
.battery-info-list{
  display: flex;
  flex-direction: column;
  align-items: start;

}
.battery-info_value{
  font-size: 18px;
}
.battery-info_name{
  font-size: 16px;
}
.battery-info-block{
  background-color: #253861;
  padding: 6px 12px;
  text-align: center;
}
.el-table{
  --el-table-header-bg-color: #4f73bd;
  --el-table-header-text-color: #fff;
  --el-table-tr-bg-color: #d0d5e8;
  --el-fill-color-lighter: #eaebf4;
  --el-table-border-color: #fff;
  color: #333;
}
</style>
