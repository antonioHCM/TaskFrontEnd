<template>
  <div v-if="project" class="board-container">
    <h1 class="board-title">{{ project.name }}</h1>
    <div class="board">
      <ColumnComponent
        v-for="column in columns"
        :key="column._id"
        :column="column"
        :rows="rows[column._id]"
        @fetchRows="handleFetchRows"
        @moveRow="handleMoveRow"
        @removeRow="handleRemoveRow"
        class="column"
        
      

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
    const { project, columns, rows, fetchProject, fetchColumns, fetchRows, updateRow, deleteRow} = useBoard(projectId);
    
    onMounted(() => {
      fetchProject();
      fetchColumns();
      
      
    });

    const handleFetchRows = async (columnId) => {
      await fetchRows(columnId);
    };
    const handleRemoveRow = async (rowId) => {
      await deleteRow(rowId);
    };

    const handleMoveRow = async (rowData, movement) => {
      console.log(columns.value);
      let oldColumn = columns.value.find((c) =>{
        return c._id == rowData.column;
      });

      if (oldColumn.position == 0 && movement == 'left') {
        return false;
      }
      else if (oldColumn.position == columns.value.length - 1 && movement == 'right'){
        return false;
      }
      if (movement == 'right') {
        rowData.column = columns.value.find((c) => {
          return c.position == oldColumn.position +1;
        })
      }
      else if(movement == 'left') {
        rowData.column = columns.value.find((c) => {
          return c.position == oldColumn.position -1;
        })
      }
      updateRow(rowData);
      fetchColumns();
    };

    return {
      project,
      columns,
      rows,
      handleFetchRows,
      handleMoveRow,
      handleRemoveRow,
      
    };
  },
};
</script>

<style scoped>
.board-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f4f5f7;
  min-height: 100vh;
}

.board-title {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.board {
  display: flex;
  justify-content: center;
  gap: 15px;
  width: 100%;
  max-width: 1200px;
  overflow-x: auto;
}

.column {
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  width: 300px;
  display: flex;
  flex-direction: column;
}

.column-header {
  font-weight: bold;
  margin-bottom: 10px;
}

.column-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.task-card {
  background-color: #e2e4e6;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}
</style>
