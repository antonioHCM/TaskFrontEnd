<template>
    <header>
      <nav>
        <router-link to="/login">Login</router-link> |
        <router-link to="/register">Register</router-link> |
        <router-link to="/about">About</router-link>
      </nav>
    </header>
  </template>
  
  <script>
  export default {
    name: 'MainHeader' 
  }
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
  