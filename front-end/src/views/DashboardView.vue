<template>
  <div>
    <h1>
       {{ username }}'s Project List:
      
    </h1>
    <h2>Projects:</h2>
    <ul>
      <li v-for="project in projects" :key="project._id">
        <router-link :to="'/board/' + project._id">{{ project.name }}</router-link>
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
