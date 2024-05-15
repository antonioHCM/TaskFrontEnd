<template>
  <div v-if="project">
    <h1>{{ project.name }}</h1>
    <div class="board">
      <ColumnComponent
        v-for="column in columns"
        :key="column._id"
        :column="column"
        :rows="rows[column._id]"
        @fetchRows="fetchRows"
      />
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { useBoard } from '../composables/project';
import ColumnComponent from '../components/ColumnComponent.vue';
import { useRoute } from 'vue-router'; 

export default {
  components: {
    ColumnComponent,
  },
  setup() {
    const route = useRoute(); 
    const projectId = route.params.id; 
    const { project, columns, rows, fetchProject, fetchColumns, fetchRows } = useBoard(projectId);

    onMounted(() => {
      fetchProject();
      fetchColumns();
    });

    return {
      project,
      columns,
      rows,
      fetchRows,
    };
  },
};
</script>

<style>
.board {
  display: flex;
}
</style>
