import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getUser } from '../../urls';
import { jwtDecode } from 'jwt-decode'; 

export function useAuth() {
  const username = ref(null);
  const router = useRouter();

  async function fetchUserInfo() {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      const response = await fetch(getUser.replace(':id', userId), {
        headers: {
          'auth-token': token
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user information');
      }

      const userData = await response.json();
      username.value = userData.name;
    } catch (error) {
      console.error('Error fetching user information:', error);
    }
  }

  function logout() {
    localStorage.removeItem('token');
    router.push('/login');
  }

  return { username, fetchUserInfo, logout };
}
