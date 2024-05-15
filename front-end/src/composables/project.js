import { ref } from 'vue';
import { getProjectById, getColumnsByProject, getRowsByColumn } from '../../urls'; 
import { useRouter } from 'vue-router';



export function useBoard(projectId) {
  const project = ref(null);
  const columns = ref([]);
  const rows = ref({});
  const router = useRouter();

  async function fetchProject() {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const response = await fetch(getProjectById.replace(':id', projectId), {
        headers: {
          'auth-token': token
        }
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch project');
      }
      project.value = await response.json();
    } catch (error) {
      console.error('Error fetching project:', error);
    }
  }

  async function fetchColumns() {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const response = await fetch(getColumnsByProject.replace(':id', projectId), {
        headers: {
          'auth-token': token
        }
      })
    
      if (!response.ok) {
        throw new Error('Failed to fetch columns');
      }
      columns.value = await response.json();
    } catch (error) {
      console.error('Error fetching columns:', error);
    }
  }

  async function fetchRows(columnId) {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const response = await fetch(getRowsByColumn.replace(':id', columnId), {
        headers: {
          'auth-token': token
        }
      })
    
      
      if (!response.ok) {
        throw new Error('Failed to fetch rows');
      }
      rows.value[columnId] = await response.json();
    } catch (error) {
      console.error('Error fetching rows:', error);
    }
  }

  return {
    project,
    columns,
    rows,
    fetchProject,
    fetchColumns,
    fetchRows,
  };
}