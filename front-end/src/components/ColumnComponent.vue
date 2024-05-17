<template>
  <div class="column">
    <div class="column-header">{{ column.name }}</div>
    <div class="column-content">
      <div v-if="rows && rows.length" class="task-card">
        <div class="row-container">
          <div v-for="row in sortedRows" :key="row._id" class="row-item-container">
            <div class="row-item-content">{{ row.content }}</div>
            <div class="row-item-description">{{ row.description }}</div>
            <div class="row-item-buttons">
              <button @click="moveRowUp(row)">↑</button>
              <button @click="moveRowDown(row)">↓</button>
              <button @click="moveRowLeft(row)">←</button>
              <button @click="moveRowRight(row)">→</button>
              <button @click="removeRow(row._id)">X</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="add-row-button" @click="addRow">Add New Row</button>
  </div>
</template>

<script>
import { onMounted} from 'vue';
import { useBoard } from '../composables/project';


export default {
  props: {
    column: Object,
    rows: Array,
  },
  data(){
    return {
      sortedRows: []
    }
  },
  watch: {
    rows: {
      immediate: true,

      handler(newVal, oldVal) {
        console.log(this.rows);
        
        if (newVal !== oldVal) {
          this.sortRows();
        }
      }
    }
  },
    methods: {
      sortRows(){

        this.sortedRows = this.rows.slice().sort((a,b) => a.position - b.position);
        
        
        
      },
      moveRowUp(rowItem) {
      
      // Logic to move the row up in position
     
        if (rowItem.position == 0) {
          
          return false;
          
        }
        let newPos = rowItem.position -1;
        let otherRow = this.rows.find((row) => {
          return row.position == newPos;
        })
        otherRow.position += 1;
        rowItem.position = newPos;
        console.log('updated');
        this.sortRows();
        this.putRow(rowItem);
        this.putRow(otherRow);
      
      
    },
    moveRowDown(rowItem) {
      
      // Logic to move the row up in position
     
        if (rowItem.position == this.rows.length -1) {
          
          return false;
          
        }
        let newPos = rowItem.position +1;
        let otherRow = this.rows.find((row) => {
          return row.position == newPos;
        })
        otherRow.position -= 1;
        rowItem.position = newPos;
        console.log('updated');
        this.sortRows();
        this.putRow(rowItem);
        this.putRow(otherRow);
        
      
      
    },
    
    },

  emits: ['fetchRows', 'moveRow', 'removeRow'], 
  setup(props, { emit }) {
    onMounted(() => {
      emit('fetchRows', props.column._id);
    });
    const { addRowToColumn, updateRow } = useBoard();
    
    const putRow = async (rowData) => {
      try {
        await updateRow(rowData);
      } catch (error) {
        console.error('Error updating row:', error);
      }
    }
    const removeRow = (rowId) => {

emit('removeRow', rowId);
}
    const moveRowLeft = (rowItem) => {

      emit('moveRow', rowItem, 'left');
    }
    const moveRowRight =(rowItem) => {
      emit('moveRow', rowItem, 'right');
}
    // Import addRowToColumn from your composable file
    const addRow = async () => {
      
      try {
        const description = prompt('Enter the description for the new row:');
        const position = prompt('Enter the position for the new row:');
        const content = prompt('Enter the content for the new row:');

        if (description === null || position === null || content === null || 
            description.trim() === '' || position.trim() === '' || content.trim() === '') {
          console.log('Adding row canceled or input left blank.');
          return;
        }

        const rowData = {
          description: description.trim(),
          position: position.trim(),
          content: content.trim(),
        };
        
        
        await addRowToColumn(props.column._id, rowData); // Await the promise

        // Emit the 'addRow' event with columnId and rowData
        
        emit('fetchRows', props.column._id);
      } catch (error) {
        console.error('Error adding row:', error);
      }
    }
    
    return {
      addRowToColumn,
      addRow,
      putRow,
      moveRowLeft,
      moveRowRight,
      removeRow,
      
       // Export addRowToColumn from composable file
    };
  },
};
</script>

<style scoped>
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

.row-item-container {
  background-color: #f9f9f9;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
}

.row-item-content {
  font-weight: bold;
}

.row-item-description {
  color: #666;
}

.row-item-buttons {
  display: flex;
  gap: 5px;
  margin-top: 10px;
}

.row-item-buttons button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px;
  border-radius: 4px;
  cursor: pointer;
}

.row-item-buttons button:hover {
  background-color: #0056b3;
}

.add-row-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: auto; /* Ensure the button is always at the bottom */
}

.add-row-button:hover {
  background-color: #0056b3;
}
</style>

