<script setup lang="ts">
import {defineModel} from "vue";
import dayjs from "dayjs";
import InputWarp from "@/views/screen/components/InputWarp.vue";

const startTime = defineModel<string>('start');
const endTime = defineModel<string>('end');
function disabledEndDate(date) {
  if (!startTime.value) {
    return false;
  }
  if (dayjs(date).isBefore(startTime.value, 'date')) {

    return true;
  }
  return false;
}
function changeStartTime (time) {
  if (!endTime.value) {
    return
  }
  if (dayjs(time).isAfter(endTime.value)) {
    endTime.value = undefined;
  }
}

function changeEndTime(time) {
  console.log(dayjs.isDayjs(time));

  if (!startTime.value) {
    return
  }
  const val = dayjs(time)
  if (val.isBefore(startTime.value, 'hour')) {
    startTime.value = dayjs(startTime.value).set('hour', val.get('hour') - 1).toString();
    return;
  }
  if (val.isBefore(startTime.value, 'minute')) {
    startTime.value = dayjs(startTime.value).set('minute', val.get('minute') - 1).toString();
    return;
  }
}
defineOptions({
  name: 'SelectDateRage'
})
</script>

<template>
  <ElFormItem prop="startTime" label="开始时间" >
    <InputWarp>
      <ElDatePicker
        type="datetime"
        clearable
        format="YYYY-MM-DD HH:mm"
        placeholder="开始时间"
        :default-time="new Date()"
        @change="changeStartTime"
        v-model="startTime"
      />
    </InputWarp>

  </ElFormItem>
  <ElFormItem prop="endTime" label="结束时间" >
    <InputWarp>
      <ElDatePicker
        type="datetime"
        clearable
        format="YYYY-MM-DD HH:mm"
        time-format="HH:mm"
        placeholder="结束时间"
        :default-time="new Date()"
        :disabled-date="disabledEndDate"
        @change="changeEndTime"
        v-model="endTime"
      />
    </InputWarp>

  </ElFormItem>
</template>

<style scoped lang="scss">

</style>
