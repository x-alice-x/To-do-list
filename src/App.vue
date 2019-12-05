<template>
  <div class="container">
    <header v-show="userAuth">
      <div class="header-right">
        <a href="#">ToDo-list</a>
        <p>{{userName}}</p>
      </div>
      <a href="#" @click="exit">Выйти</a>
    </header>
    <auth v-if="!userAuth"></auth>
    <todo-list v-else-if="userAuth"></todo-list>
    
  </div>
</template>

<script>
import todoList from './components/todo-list.vue'
import auth from './components/authorization.vue'

export default {
  name: 'app',
  components: {
    todoList,
    auth
  },
  data() {
    return {
      userName: null
    }
  },
  computed: {
    userAuth() {
      return this.$store.getters.isUserAuthenticated
    }
    // getUser() {
    //   console.log(this.$store.getters.getEmail)
    //   return this.$store.getters.getEmail
    // }
  },
  watch: {
    userAuth(newValue, oldValue) {
      console.log(this.userAuth)
      console.log('get Email wtach')
      this.userName = this.$store.getters.getEmail
    }
  },
  methods: {
    exit() {
      this.$store.dispatch('SIGNOUT')
    }
  }
}
</script>

<style scoped>
  header {
    display: flex;
    justify-content: space-around;
    background-color: #333333;
    background-size: 500px;
    color: #fff;
    padding-top: 15px;
  }
  .header-right p {
    margin-left: 15px;
  }  

  .header-right {
    display: flex;
    justify-content: flex-start;
  }

  .header-right a{
    margin-right: 20px;  
  }
</style>
