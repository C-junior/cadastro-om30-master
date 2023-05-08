<template>
  <div >
    <header>
      <div class="wrapper">
        <nav>
          <!-- Conditional rendering based on the authentication status and current route -->
          <template v-if="isAuthenticated">
            <!-- Navigation links -->
            <router-link to="/patient"></router-link>
            <button @click="logout" class="log">Logout</button>
          </template>
          <template v-else-if="isRootPath">
            <router-link to="/login" class="log">Login</router-link>
          </template>
        </nav>
      </div>
    </header>
   <div class="bg"> </div>
    <router-view :is-authenticated="isAuthenticated" @authenticated="authenticated" />
  </div>
</template>
<script>
import { ref, onMounted} from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'App',
  computed: {
  isRootPath() {
    return this.$route.path === '/';
  }
},
  setup() {
    const isAuthenticated = ref(false);
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

.bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(226, 226, 226);
  background-image: url(../src/assets/bg-om30.png);
  background-size: cover;
  background-position: center;
  opacity: 0.8;
  z-index: -1;
}
.log{
  padding: 10px 20px;
  background-color: #9f002b;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  position: relative;
  
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 1rem;
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
