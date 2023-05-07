<template>
  <div v-if="!isAuthenticated">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'LoginForm',
  props: {
    isAuthenticated: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const username = ref('');
    const password = ref('');

    // Use the router instance
    const router = useRouter();

    const login = () => {
      if (username.value === 'admin' && password.value === '123') {
        // Successful login
        emit('authenticated');
        router.push('/patient'); // Redirect to PatientList.vue
      } else {
        // Failed login
        alert('Invalid username or password');
      }
    };

    // Clear username and password fields when component is mounted
    onMounted(() => {
      username.value = '';
      password.value = '';
    });

    // Clear username and password fields when component is unmounted
    onUnmounted(() => {
      username.value = '';
      password.value = '';
    });

    return {
      username,
      password,
      login,
    };
  },
};
</script>
