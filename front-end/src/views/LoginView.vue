<template>
    <div>
      <h2>Login</h2>
      <form @submit.prevent="login">
        <input type="email" v-model="email" placeholder="Email" required>
        <input type="password" v-model="password" placeholder="Password" required>
        <button type="submit">Login</button>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
    </div>
  </template>
  
  <script>
  import urls from '../../urls';
  console.log(urls);
  export default {
    data() {
      return {
        email: '',
        password: '',
        errorMessage: ''
      }
    },
    methods: {
      async login() {
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
          if (!response.ok) {
            throw new Error('Login failed');
          }
          // Handle successful login, e.g., redirect to dashboard
          console.log('Login successful');
        } catch (error) {
          // Handle login error
          this.errorMessage = 'Login failed';
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .error-message {
    color: red;
  }
  </style>
  