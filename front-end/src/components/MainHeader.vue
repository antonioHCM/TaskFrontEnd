<template>
  <header>
    <nav>
      <router-link to="/about">About</router-link>
      <template v-if="username">
        <span>Welcome, {{ username }}</span> |
        <button @click="logout" style="color: red;">Logout</button>
      </template>
      <template v-else>
        <router-link v-if="!isLoggedIn" to="/login">Login</router-link> |
        <router-link v-if="!isLoggedIn" to="/register">Register</router-link> 
        
      </template>
    </nav>
  </header>
</template>

<script>
import { onMounted, computed } from 'vue';
import { useAuth } from '../composables/auth';

export default {
  name: 'MainHeader',
  setup() {
    const { username, fetchUserInfo, logout } = useAuth();

    const isLoggedIn = computed(() => !!username.value);
    console.log(isLoggedIn);
    onMounted(() => {
      fetchUserInfo();
    });

    return {
      username,
      logout
    };
  }
};
</script>

<style scoped>
header {
  background-color: #f0f0f0;
  padding: 10px;
}

nav {
  font-size: 18px;
}
</style>
