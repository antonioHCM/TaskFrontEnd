import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getUser, apiLogin } from '../../urls';
import { jwtDecode } from 'jwt-decode';


export function useAuth() {
  const username = ref(null);
  const router = useRouter();

  function checkToken() {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      throw new Error('No token found');
    }
    return token;
  }

  async function fetchUserInfo() {
    try {
      const token = checkToken(); // Call checkToken to ensure token existence
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

  async function login(credentials) {
    try {
      const response = await fetch(apiLogin, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      console.log(response);
      if (!response.ok) {
        throw new Error('Login failed');
      }

      const responseData = await response.json();
      const { token } = responseData.data;

      storeToken(token);
      await fetchUserInfo();
      router.push('/dashboard');
      console.log('Login successful');
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  }

  function storeToken(token) {
    localStorage.setItem('token', token);
  }

  function logout() {
    localStorage.removeItem('token');
    username.value = null; // Set username to null upon logout
    router.push('/login');
  }
  

  return { username, fetchUserInfo, checkToken, login, logout };
}
