import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getProjectByUser } from '../../urls'; 
import { jwtDecode } from 'jwt-decode'; 

export function useProjects() {
  const projects = ref([]);
  const router = useRouter();

  async function fetchUserProjects() {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      const response = await fetch(getProjectByUser.replace(':id', userId), {
        headers: {
          'auth-token': token
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user projects');
      }

      const projectsData = await response.json();
      projects.value = projectsData;
    } catch (error) {
      console.error('Error fetching user projects:', error);
    }
    
  }

  return { projects, fetchUserProjects };
}
