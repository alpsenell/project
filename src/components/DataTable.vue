<template>
  <div class="w-full">
    <div
      v-for="field in tableFields"
      :key="field.title"
    >

    </div>
    <div
      v-for="item in data"
      :key="item.imdbID"
    >
      {{ item.Title }}
      {{ item.Year }}
      {{ item.imdbID }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue';
import { TableData, TableField } from '@/types/types';

interface Props {
  tableFields?: TableField[];
  data?: TableData[];
}

const props = withDefaults(defineProps<Props>(), {
  tableFields: () => [],
  data: () => [],
})

console.log(props.tableFields);
console.log(props.data);
</script>

<style scoped>

</style>
