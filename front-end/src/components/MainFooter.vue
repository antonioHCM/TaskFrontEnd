<template>
    <footer>
      <nav>
        <router-link to="/contact">Contact</router-link>
      </nav>
      <p>&copy; 2024 AntonioHCM. All rights reserved.</p>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'MainFooter'
  }
  </script>
  
  <style scoped>
  footer {
    background-color: #f0f0f0;
    padding: 10px;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
  }
  
  nav {
    font-size: 18px;
  }
  
  p {
    margin-top: 10px;
    font-size: 14px;
  }
  </style>
  