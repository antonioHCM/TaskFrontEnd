<template>
  <div id="app">
    <MainHeader />
    <router-view></router-view>
    <MainFooter />
  </div>
</template>

<script>
import MainHeader from './components/MainHeader.vue';
import MainFooter from './components/MainFooter.vue';
// import { provide } from 'vue';
// import { useAuth } from './composables/auth';

export default {
  setup() {
   // const auth = useAuth();
    //provide('auth', auth); // Providing auth object globally
    return {};
  },
  components: {
    MainHeader,
    MainFooter
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
