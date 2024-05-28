<template>
  <div class="new-column">
    <h1>Create New Column</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Column Name:</label>
        <input type="text" v-model="form.name" id="name" required />
      </div>
      <input type="hidden" v-model="form.project" id="project" />
      <div>
        <label for="position">Position:</label>
        <input type="number" v-model="form.position" id="position" />
      </div>
      <div class="buttons">
        <button type="submit">Create Column</button>
        <button type="button" @click="createAnotherColumn">Create Another Column</button>
        <button type="button" @click="redirectToDashboard">Finish</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useBoard } from '../composables/project';

export default {
  setup() {
    const form = ref({
      name: '',
      project: '',
      position: 0,
    });

    const router = useRouter();
    const route = useRoute();
    const { createColumn } = useBoard();

    // Set the project ID from the route parameters when the component is mounted
    onMounted(() => {
      form.value.project = route.params.projectID;
      console.log(route.params.projectID);
    });

    const submitForm = async () => {
      try {
        // Create the new column object
        const newColumn = {
          name: form.value.name,
          project: form.value.project,
          position: form.value.position,
        };

        // Call the createColumn function to create the column
        await createColumn(newColumn);

        // Redirect to the desired route after successful creation
        router.push('/dashboard'); // Change this to your desired route
      } catch (error) {
        console.error('Error creating column:', error);
      }
    };

    const createAnotherColumn = async () => {
      try {
        // Create the new column object
        const newColumn = {
          name: form.value.name,
          project: form.value.project,
          position: form.value.position,
        };

        // Call the createColumn function to create the column
        await createColumn(newColumn);

        // Clear the form for the next column
        form.value.name = '';
        form.value.position = 0;
      } catch (error) {
        console.error('Error creating column:', error);
      }
    };

    const redirectToDashboard = () => {
      router.push('/dashboard');
    };

    return {
      form,
      submitForm,
      createAnotherColumn,
      redirectToDashboard,
    };
  },
};
</script>

<style scoped>
.new-column {
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

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
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
