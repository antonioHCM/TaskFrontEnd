<template>
    <div class="column">
      <h2>{{ column.name }}</h2>
      <div class="rows">
        <RowComponent
          v-for="row in rows"
          :key="row._id"
          :row="row"
        />
      </div>
    </div>
  </template>
  
  <script>
  import { onMounted } from 'vue';
  import RowComponent from './RowComponent.vue';
  
  export default {
    props: {
      column: Object,
      rows: Array,
    },
    components: {
      RowComponent,
    },
    emits: ['fetchRows'],
    setup(props, { emit }) {
      onMounted(() => {
        emit('fetchRows', props.column._id);
      });
    },
  };
  </script>
  
  <style>
  .column {
    margin-right: 16px;
  }
  </style>
  