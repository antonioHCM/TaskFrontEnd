import { useAuth } from '../composables/auth';
import { ref } from 'vue';
import { postColumn } from '../../urls';


const columns = ref([]);

export function useColumn() {
    
    const { checkToken } = useAuth();
  
    const createColumn = async (columnData) => {
      try {
        const token = checkToken();
        const response = await fetch(postColumn, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token,
          },
          body: JSON.stringify(columnData),
        });
  
        if (!response.ok) {
          throw new Error('Failed to create column');
        }
  
        const data = await response.json();
        columns.value.push(data); // Assuming the response returns the created column
  
        return data;
      } catch (error) {
        console.error('Error creating column:', error);
        throw error;
      }
    };
  
    return {
      columns,
      createColumn,
    };
  }