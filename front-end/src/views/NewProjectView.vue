<template>
  <div class="new-project">
    <h1>Create New Project</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Project Name:</label>
        <input type="text" v-model="form.name" id="name" required />
      </div>
      <div>
        <label for="contributors">Contributors (comma-separated IDs):</label>
        <input type="text" v-model="form.contributors" id="contributors" />
      </div>
      <!-- Add a hidden input field for owner -->
      <input type="hidden" v-model="form.owner" id="owner" />
      <button type="submit">Create Project</button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useBoard } from '../composables/project';
import { useAuth } from '../composables/auth'; 

export default {
  setup() {
    const form = ref({
      name: '',
      owner: '',
      contributors: '',
    });

    const router = useRouter();
    const { createProject } = useBoard();
    const { userId, fetchUserInfo } = useAuth(); 

    // Fetch user info when component is mounted
    onMounted(async () => {
      await fetchUserInfo();
      if (userId.value) {
        form.value.owner = userId.value; // Set owner to the logged-in user's ID
      }
    });

    const submitForm = async () => {
  try {
    // Handle contributors input if provided
    let contributorsArray = [];
    if (form.value.contributors) {
      contributorsArray = form.value.contributors
        .split(',')
        .filter(id => id.trim() !== '') // Filter out empty IDs
        .map(id => ({ user: id.trim() }));
    }

    // Create the new project object
    const newProject = {
      name: form.value.name,
      owner: form.value.owner,
      contributors: contributorsArray,
    };

    // Call the createProject function to create the project
    const data = await createProject(newProject);
    console.log('Response:', data);

    // Log the project ID
    console.log('Created project ID:', data.projectID);

    // Redirect to new column
    router.push({ name: 'NewColumn', params: { projectID: data.projectID } });
      
  } catch (error) {
    console.error('Error creating project:', error);
    console.log(error);
  }
};

    return {
      form,
      submitForm,
    };
  },
};
</script>

<style scoped>
.new-project {
  max-width: 600px;
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

form div {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
