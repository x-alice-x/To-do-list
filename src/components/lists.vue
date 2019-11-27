<template>
	<div class="todo-list">
    <div class="top">
      <div class="form-group">
          <select class="form-control" 
                  id="exampleFormControlSelect1"
                  v-model="Filter">
            <option value="">All</option>
            <option value="false">Not done</option>
            <option value="true">Done</option>
          </select>
      </div>
      <hr>
      <ul class="list-group">
        <li class="list-group-item"
          v-for="(result, index) in filtredLists"
          :class="{white: !result.arrayCase.length,
                  green: !result.selected, 
                  grey: result.selected}" 
          v-on:click="openList(index)">
          <p>{{ result.name }}</p>
          <div class="btns-edit">
            <button class="edit" v-b-modal.edit-list><img src="./icons/edit_icon.png"></button>
            <button class="edit" @click="deleteList(index)"><img id="icon_del" src="./icons/delete_icon.png"></button>
          </div>
        </li>
      </ul>
    </div>
    <b-button class="plus-list" v-b-modal.plus-list>
      <h3>+</h3>
    </b-button>
  </div>
</template>

<script>
  import $ from 'jquery'
	export default {
		name: 'lists',
		props: {
      arrayList: Array
    },
    data() {
      return {
        Filter: '',
        filtred: []
      }
    },
    computed: {
      filtredLists() {
        return this.arrayList.filter((list) => {
          return String(list.selected).match(this.Filter);
        });
      }
    },
    watch: {      
      filtredLists(newValue, oldValue) {
        this.filtred = this.filtredLists
        console.log(this.filtred)
        this.$emit('getFiltred', this.filtred)
        // this.$parent.$arrayList;
      }
    },
    methods: {
      deleteList(index) {
        this.$emit('deleteList', index)
      },
      openList(index) {
        this.$emit('openList', index)
      }
    }
	}
</script>