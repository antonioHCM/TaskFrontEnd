<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login" v-if="!loading">
      <input type="email" v-model="email" placeholder="Email" required>
      <input type="password" v-model="password" placeholder="Password" required>
      <button type="submit" :disabled="loading">Login</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
    <div v-if="loading">Logging in...</div>
  </div>
</template>

<script>
import urls from '../../urls';

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
      loading: false
    }
  },
  methods: {
    async login() {
  this.loading = true;
  try {
    const response = await fetch(urls.login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.email,
        password: this.password
      })
    });
    const responseData = await response.json(); // Parse response JSON
    const { token } = responseData.data; // Extract token from response data
    
    this.storeToken(token); // Store token securely
    // Redirect to dashboard or home page
    this.$router.push('/dashboard');
    console.log('Login successful');
  } catch (error) {
    this.errorMessage = error.message || 'Login failed';
  } finally {
    this.loading = false;
  }
},

    storeToken(token) {
      // Store token securely (e.g., in localStorage)
      localStorage.setItem('token', token);
    }
  }
}
</script>

<style scoped>
.error-message {
  color: red;
}
</style>
