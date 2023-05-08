
<template>
  <div v-if="!isAuthenticated" class="login-container">
    <h1 class="login-title">Login</h1>
    <form @submit.prevent="login" class="login-form">
      <span class="hint"> Usuario = admin, Senha = 123</span>
      <div class="form-field">
        <input type="text" placeholder="Usuario" id="username" v-model="username" class="form-input" required>
      </div>
      <div class="form-field">
        <input type="password" placeholder="Senha" id="password" v-model="password" class="form-input" required>
      </div>
      <button type="submit" class="login-button">Login</button>
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

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px;
  margin: auto;
  margin-top: 15%;
  background-color: rgb(223, 223, 223);
  transition: box-shadow .3s;
  border-radius:10px;
  border: 2px solid #b40707;
  float: left;
}

.login-container:hover{
  box-shadow: 0 2px 11px rgba(20, 20, 20, 0.2);
}
.hint{
  color: rgb(27, 27, 27);
  padding-bottom: 16px;
}
.login-title {
  font-size: 24px;
  color: #b40707;
  margin-bottom: 20px;
  font-weight: 800;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-field {
  margin-bottom: 20px;
}

.form-input {
  padding: 10px;
  border: 1px solid red;
  border-radius: 4px;
}

.login-button {
  padding: 10px 20px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}
</style>