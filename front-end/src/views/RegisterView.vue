<template>
    <div>
      <h2>Register</h2>
      <form @submit.prevent="login">
        <input type="email" v-model="email" placeholder="Email" required>
        <input type="password" v-model="password" placeholder="Password" required>
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      login() {
        // Handle login logic here (e.g., send login request to backend)
      }
    }
  }
  </script>
  
  <style scoped>
  /* Your component-specific styles here */
  </style>
  