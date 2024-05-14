<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="register" v-if="!loading">
      <input type="text" v-model="name" placeholder="Name" required>
      <input type="email" v-model="email" placeholder="Email" required>
      <input type="password" v-model="password" placeholder="Password" required>
      <button type="submit" :disabled="loading">Register</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    </form>
    <div v-if="loading">Registering...</div>
  </div>
</template>

<script>
import urls from '../../urls';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      errorMessage: '',
      successMessage: '', // Add success message state
      loading: false
    }
  },
  methods: {
    async register() {
      this.loading = true;
      try {
        const response = await fetch(urls.register, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: this.name,
            email: this.email,
            password: this.password
          })
        });
        const responseData = await response.json(); // Parse response JSON
        if (responseData.error) {
          throw new Error(responseData.error);
        }
        // Registration successful
        this.successMessage = 'Registration successful'; // Display success message
        // Clear form fields
        this.name = '';
        this.email = '';
        this.password = '';
        // Redirect to login page after a brief delay
        setTimeout(() => {
          this.$router.push('/login');
        }, 2000); // Redirect after 2 seconds
      } catch (error) {
        this.errorMessage = error.message || 'Registration failed';
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
.error-message {
  color: red;
}
.success-message {
  color: green;
}
</style>
