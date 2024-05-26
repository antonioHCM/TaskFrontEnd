<template>
  <div class="header-wrapper">
    <header class="header">
      <div v-if="username !== null" class="header__user">
        <router-link to="/newProject" class="header__link">New Project</router-link>
        <span class="header__welcome">Welcome, {{ username }}</span>
        <button @click="logout" class="header__logout">Logout</button>
      </div>
      <div v-else class="header__guest">
        <router-link to="/login" class="header__link">Login</router-link>
        <router-link to="/register" class="header__link">Register</router-link>
      </div>
    </header>
  </div>
</template>

<script setup>
import { useAuth } from '../composables/auth';
import { onMounted } from 'vue';

const { username, logout, fetchUserInfo } = useAuth();

onMounted(async () => {
  await fetchUserInfo();
});
</script>

<style scoped>
.header-wrapper {
  display: flex;
  justify-content: center;
}

.header {
  background-color: #f0f0f0;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 960px; /* Optional: Limit the width of the header */
  width: 100%;
}

.header__content {
  display: flex;
  align-items: center;
}

.header__link {
  margin-right: 10px;
  text-decoration: none;
  color: #333;
}

.header__welcome {
  margin-right: 10px;
}

.header__logout {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}
</style>