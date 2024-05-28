<template>
  <div class="dashboard">
    <h1>{{ username }}'s Project List:</h1>
    <button class="create-project-button" @click="createNewProject">Create New Project</button>
    <ul class="project-list">
      <li v-for="project in projects" :key="project._id" class="project-item">
        <router-link :to="'/board/' + project._id">{{ project.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { useAuth } from '../composables/auth';
import { useProjects } from '../composables/useProjects';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const { username, fetchUserInfo, logout } = useAuth();
    const { projects, fetchUserProjects } = useProjects();
    const router = useRouter();
    
    fetchUserInfo();
    fetchUserProjects();
    
    const createNewProject = () => {
      
      router.push('/newProject');
    };

    return { username, logout, projects,createNewProject };
  }
};
</script>
<style scoped>
.dashboard {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.create-project-button {
  display: inline-block;
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.create-project-button:hover {
  background-color: #0056b3;
}

.project-list {
  list-style-type: none;
  padding: 0;
}

.project-item {
  margin-bottom: 10px;
}

.project-item a {
  text-decoration: none;
  color: #007bff;
  font-size: 18px;
  transition: color 0.3s;
}

.project-item a:hover {
  color: #0056b3;
}
</style>
