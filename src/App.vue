<template>
  <div>
    <header>
      <div class="wrapper">
        <nav>
          <!-- Conditional rendering based on the authentication status -->
          <template v-if="isAuthenticated">
            <!-- Navigation links -->         
            <router-link to="/patient">Lista de Pacientes</router-link>
            <button @click="logout">Logout</button>
          </template>
          <template v-else>
            <router-link to="/login">Login</router-link>
          </template>
        </nav>
      </div>
    </header>
    <router-view :is-authenticated="isAuthenticated" @authenticated="authenticated" />
  </div>
</template>

<script>
import { ref, onMounted} from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'App',
  setup() {
    const isAuthenticated = ref(false); // Initially set to false
    const router = useRouter();

    // Function to simulate logout
    const logout = () => {
      // Reset the authentication status
      isAuthenticated.value = false;
      localStorage.removeItem('isAuthenticated'); // Remove from storage
      // Navigate back to the login route after logout
      router.push('/login');
    }

    // Check if user is already authenticated on page load
    onMounted(() => {
      const storedAuth = localStorage.getItem('isAuthenticated');
      if (storedAuth && storedAuth === 'true') {
        isAuthenticated.value = true;
      }
    });

    // Update authentication status and store it in localStorage
    const authenticated = () => {
      isAuthenticated.value = true;
      localStorage.setItem('isAuthenticated', 'true');
    };

    return {
      isAuthenticated,
      logout,
      authenticated,
    }
  }
};
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
