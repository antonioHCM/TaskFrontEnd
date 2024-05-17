import { ref } from 'vue';
import { getProjectById, getColumnsByProject, getRowsByColumn, addRowApi, updateRowData, deleteRowData } from '../../urls';
import { useAuth } from '../composables/auth';

export function useBoard(projectId) {
  const project = ref(null);
  const columns = ref([]);
  const rows = ref([]);
  const { checkToken } = useAuth(); // Destructure checkToken from useAuth

  async function fetchProject() {
    try {
      const token = checkToken();
      const response = await fetch(getProjectById.replace(':id', projectId), {
        headers: {
          'auth-token': token 
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch project');
      }
      project.value = await response.json();
    } catch (error) {
      console.error('Error fetching project:', error);
    }
  }

  async function fetchColumns() {
    columns.value = [];
    rows.value = [];
    const token = checkToken();

    try {
      const response = await fetch(getColumnsByProject.replace(':id', projectId), {
        headers: {
          'auth-token': token
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch columns');
      }
      columns.value = await response.json();
    } catch (error) {
      console.error('Error fetching columns:', error);
    }
  }

  async function fetchRows(columnId) {
    const token = checkToken();
    
    try {
      const response = await fetch(getRowsByColumn.replace(':id', columnId), {
        headers: {
          'auth-token': token
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch rows');
      }
      rows.value[columnId] = await response.json();
    } catch (error) {
      console.error('Error fetching rows:', error);
    }
  }

  // ADD new row to column id
  async function addRowToColumn(columnId, rowData) {
    const token = checkToken();
    console.log('antes do try');
    try {
      const response = await fetch(addRowApi.replace(':id', columnId), {
        
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token
        },
        body: JSON.stringify(rowData)
      });
      
      if (!response.ok) {
          throw new Error('Failed to add row');
      }
      // Optionally handle success response
      console.log('Row added successfully');
     
    } catch (error) {
      console.error('Error adding row:', error);
    }
  }
  //Update row
  async function updateRow(rowData) {
    const token = checkToken();
    try {
      const response = await fetch(updateRowData.replace(':id', rowData._id), {
        
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token
        },
        body: JSON.stringify(rowData)
      });
      
      if (!response.ok) {
          throw new Error('Failed to update row');
      }
      // Optionally handle success response
      console.log('Row updated successfully');
     
    } catch (error) {
      console.error('Error updating row:', error);
    }
  }
  //Delete row
  async function deleteRow(rowId) {
    const token = checkToken();
    try {
      const response = await fetch(deleteRowData.replace(':id', rowId), {
        
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token
        },
      });
      
      if (!response.ok) {
          throw new Error('Failed to delete row');
      }
      // Optionally handle success response
      console.log('Row deleted successfully');
      rows.value = rows.value.filter((r) => {return r._id != rowId})
      console.log(rowId);
      console.log(rows.value);
      
      
    } catch (error) {
      console.error('Error deleting row:', error);
    }
  }

  return {
    project,
    columns,
    rows,
    fetchProject,
    fetchColumns,
    fetchRows,
    addRowToColumn,
    updateRow,
    deleteRow,
  };
}
