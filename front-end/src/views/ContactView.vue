<template>
    <div class="contact-page">
      <h1>Contact Us</h1>
      <div class="contact-info">
        <p><strong>Email:</strong> info@example.com</p>
        <p><strong>Phone:</strong> +1234567890</p>
        <p><strong>Address:</strong> 123 Main Street, City, Country</p>
      </div>
      <form @submit.prevent="submitForm">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name" required>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
        <label for="message">Message:</label>
        <textarea id="message" v-model="message" required></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        email: '',
        message: ''
      };
    },
    methods: {
      submitForm() {
        // Simulate form submission (you can replace this with actual API call)
        console.log('Form submitted!');
        console.log('Name:', this.name);
        console.log('Email:', this.email);
        console.log('Message:', this.message);
        // Reset form fields after submission
        this.name = '';
        this.email = '';
        this.message = '';
      }
    }
  };
  </script>
  
  <style scoped>
  .contact-page {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  .contact-info {
    margin-bottom: 20px;
  }
  
  .contact-info p {
    margin: 5px 0;
  }
  
  form label {
    display: block;
    margin-bottom: 5px;
  }
  
  form input,
  form textarea {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  form button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  form button:hover {
    background-color: #0056b3;
  }
  </style>
  