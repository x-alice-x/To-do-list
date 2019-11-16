<template>
  <div class="container">
    <header v-show="state == 'todo-list'">
      <div class="header-right">
        <a href="#">ToDo-list</a>
        <p>{{userName}}</p>
      </div>
      <a href="#" @click="exit">Выйти</a>
    </header>
    <auth v-if="state == 'start'"
          @authComplete="authComplete">        
    </auth>
    <todo-list v-else-if="state == 'todo-list'"></todo-list>
    
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
      state: 'start',
      userName: ''
    }
  },
  methods: {
    authComplete(userName) {
      this.state = 'todo-list';
      this.userName = userName;
    },
    exit() {
      this.state = 'start'
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
