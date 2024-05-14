<template>
  <div>
    <h1>
      Hello, {{ username }}
      <button @click="logout" style="color: red;">Logout</button>
      
    </h1>
    <!-- Your other page content goes here -->
  </div>
</template>
<script>
import { getUser } from '../../urls';
import { jwtDecode } from 'jwt-decode';

export default {
  data() {
    return {
      username: null
    };
  },
  created() {
    // Fetch user information when the component is created
    this.fetchUserInfo();
  },
  methods: {
    async fetchUserInfo() {
      const token = localStorage.getItem('token');
      if (!token) {
        this.$router.push('/login');
        return;
      }

      try {
        // Decode JWT token to extract user ID
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        // Fetch user information using the user ID
        const response = await fetch(getUser.replace(':id', userId), {
          headers: {
            'auth-token': token
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user information');
        }

        const userData = await response.json();
        this.username = userData.name;
        console.log(this.username);
      } catch (error) {
        console.error('Error fetching user information:', error);
        // Handle error (e.g., display error message)
      }
    }
  }
};
</script>
