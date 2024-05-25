<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="handleLogin" v-if="!loading">
      <input type="email" v-model="email" placeholder="Email" required>
      <input type="password" v-model="password" placeholder="Password" required>
      <button type="submit" :disabled="loading">Login</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
    <div v-if="loading">Logging in...(Render might be slow)</div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useAuth } from '../composables/auth';

export default {
  setup() {
    const { login } = useAuth();
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');
    const loading = ref(false);

    const handleLogin = async () => {
      loading.value = true;
      errorMessage.value = '';
      try {
        await login({ email: email.value, password: password.value });
      } catch (error) {
        errorMessage.value = error.message || 'Login failed';
      } finally {
        loading.value = false;
      }
    };

    return {
      email,
      password,
      errorMessage,
      loading,
      handleLogin
    };
  }
}
</script>

<style scoped>
.error-message {
  color: red;
}
</style>
