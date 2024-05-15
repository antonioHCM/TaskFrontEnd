<template>
  <div>
    <h1>
      Hello, {{ username }}
      <button @click="logout" style="color: red;">Logout</button>
    </h1>
    <h2>Projects:</h2>
    <ul>
      <li v-for="project in projects" :key="project._id">
        {{ project.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { useAuth } from '../composables/auth';
import { useProjects } from '../composables/useProjects';

export default {
  setup() {
    const { username, fetchUserInfo, logout } = useAuth();
    const { projects, fetchUserProjects } = useProjects();

    // Fetch user information and projects when the component is created
    fetchUserInfo();
    fetchUserProjects();

    return { username, logout, projects };
  }
};
</script>
