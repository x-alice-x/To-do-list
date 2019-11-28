<template>
  <div class="details">
    <div class="details-top">
      <h3 v-if="existNameList.length!=0">{{ existNameList.name }}</h3>
      <h3 v-if="existNameList.length==0">{{ chooseList }}</h3>
      <hr>
      <ul class="list-group">
        <li class="list-group-item"
            v-for="(result, index) in existList"
            v-if="!noList"
            @click="openCase(index)">
          <input v-model="result.doneStatus"
                 class="check-case" type="checkbox" name="done" 
                 @click="checkCase(index)">
            <img class="urgency-ico" src="./icons/urgency.png" 
                 v-show="result.urgencyStatus">
            <p>{{ result.name }}</p>
          <div class="btns-edit">
            <button class="edit" v-b-modal.edit-case><img src="./icons/edit_icon.png"></button>
            <button class="edit" @click="deleteCase(index)"><img id="icon_del" src="./icons/delete_icon.png"></button>
          </div>
        </li>
      </ul>
    </div>
    <b-button v-if="visiblePlusCase" class="plus-case" v-b-modal.plus-case>
      <h3>+</h3>
    </b-button>
  </div>
</template>
<script>
  import $ from 'jquery'
  export default {
    name: 'cases',
    props: {
      existList: Array,
      existNameList: Array,
      visiblePlusCase: Boolean,
      noList: Boolean
    },
    data() {
      return {
        chooseList: 'Choose the list'
      }
    },
    methods: {
      deleteCase(index) {
        this.$emit('deleteCase', index)
      },
      openCase(index) {
        this.$emit('openCase', index)
      },
      checkCase(index) {
        this.$emit('checkCase', index)
      }
    }
  }
</script>