<script setup lang="ts">

  defineOptions({
    name: 'ScreenInfoPrices',
  })
  const price = [{
    price1: 0.3,
    price2: 0.3,
    price3: 0.3,
    price4: 0.3,
    price5: 0.3,
    price6: 0.3,
  }]
  const messInfo = Array(12).fill(1).map((_, index) => ({
    month: index + 1 + '月',
    prices: [1, 1, 1, 1, 1, 1,1, 1, 1, 1, 1, 1,1, 1, 1, 1, 1, 1,1, 1, 1, 1, 1, 1,],
  }));
  console.log(messInfo);

</script>

<template>
  <header class="header">
    <h3>电价信息</h3>
  </header>
  <div class="price-list">
    <ElTable
      :data="price"
      border
      table-layout="fixed"
    >
      <ElTableColumn :min-width="100" align="center" prop="price1" label="尖峰电价" key="price1" />
      <ElTableColumn :min-width="100" align="center"  prop="price2" label="普峰电价" key="price2" />
      <ElTableColumn :min-width="100" align="center"  prop="price4" label="平时电价" key="price4" />
      <ElTableColumn :min-width="100" align="center" prop="price4" label="谷时电价" key="price4" />
      <ElTableColumn :min-width="100" align="center" prop="price5" label="深谷电价" key="price5" />
      <ElTableColumn :min-width="100" align="center" prop="price6" label="容量电价" key="price6" />
    </ElTable>
  </div>

  <header class="header">
    <h3>时段信息</h3>
  </header>
  <ElTable
    border
    stripe
    table-layout="fixed"
    :data="messInfo"
  >
    <ElTableColumn width="60" prop="month" label="" key="month" align="center" />
    <ElTableColumn min-width="60" v-for="i in 24" align="center" :label="(i) + ''" :prop="'prices['+i + ']'" :key="i">
      <template #default>
        <span>1</span>
      </template>
    </ElTableColumn>
  </ElTable>
</template>

<style scoped lang="scss">
  .price-list{
    width: 800px;
    margin: 0 auto;
  }
  .el-table{
    --el-table-header-bg-color: #4f73bd;
    --el-table-header-text-color: #fff;
    --el-table-tr-bg-color: #d0d5e8;
    --el-fill-color-lighter: #eaebf4;
    --el-table-border-color: #fff;
    color: #333;
  }

  .header{
    text-align: center;
    font-size: 20px;
  }
</style>
