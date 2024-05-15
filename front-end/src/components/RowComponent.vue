<template>
    <div class="row">
      <p>{{ row.description }}</p>
      <p>{{ row.content }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      row: Object,
    },
  };
  </script>
  
  <style>
  .row {
    margin-bottom: 8px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  </style>
  