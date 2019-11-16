<template>
  <div id="app">
    <b-modal
      id="plus-list"
      ref="modal"
      title="Add a new list"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="createNewList">
        <b-form-group
          :state="nameState"
          label="Enter name of list"
          label-for="name-input"
          invalid-feedback="Name is required"
        >
          <b-form-input
            id="name-input"
            v-model="name"
            :state="nameState"
            required
            placeholder=''
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
    <b-modal
      id="plus-case"
      ref="modal"
      title="Add a new case"
      @show="resetModalCase"
      @hidden="resetModalCase"
      @ok="handleOkCase"
    >
      <form ref="form" @submit.stop.prevent="createNewCase">
        <b-form-group
          :state="nameStateCase"
          label="Enter name of case"
          label-for="name-input"
          invalid-feedback="Name is required"
          placeholder=''
        >
          <b-form-input
            id="name-input"
            v-model="nameCase"
            :state="nameStateCase"
            required
          ></b-form-input>
          <b-form-checkbox
            id="checkbox-1"
            v-model="urgency"
            name="checkbox-1""
          >
            <b-form-label>
              Urgency
            </b-form-label>
          </b-form-checkbox>
        </b-form-group>
      </form>
    </b-modal>
    <div class="interface">
      <div class="todo-list">
        <div class="top">
          <div class="form-group">
              <select class="form-control" id="exampleFormControlSelect1"
                      v-model="Filter">
                <option value="">Все</option>
                <option value="false">Неисполненные</option>
                <option value="true">Исполненные</option>
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
                <button class="edit" @click="editList(index)"><img src="./icons/edit_icon.png"></button>
                <button class="edit" @click="deleteList(index)"><img src="./icons/delete_icon.png"></button>
              </div>
            </li>
          </ul>
        </div>
        <b-button class="plus-list" v-b-modal.plus-list>
          <h3>+</h3>
        </b-button>
      </div>
      <div class="details">
        <div class="details-top">
          <h3>{{ listName }}</h3>
          <hr>
          <ul class="list-group">
            <li class="list-group-item"
              v-for="(result, index) in arrayList[indexList].arrayCase">
              <input v-model="result.doneStatus"
                     class="check-case" type="checkbox" name="done" 
                     @click="checkCase(index)">
                <img class="urgency-ico" src="./icons/urgency.png" 
                     v-show="result.urgencyStatus">
                <p>{{ result.name }}</p>
              <div class="btns-edit">
                <button class="edit" @click="editCase(index)"><img src="./icons/edit_icon.png"></button>
                <button class="edit" @click="deleteCase(index)"><img src="./icons/delete_icon.png"></button>
              </div>
            </li>
          </ul>
        </div>
        <b-button class="plus-case" v-b-modal.plus-case>
          <h3>+</h3>
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    name: 'todo-list',
    data() {
      return {
        name: '',
        nameState: null,
        nameCase: '',
        nameStateCase: null,
        urgency: false,
        Filter: '',
        listName: 'Go to the shop',
        indexList: 0,
        indexCase: 0,
        arrayList: [
        {
          name: 'Go to the shop',
          selected: false,
          arrayCase: [
          {
            name: 'Buy milk',
            date: '',
            doneStatus: false,
            urgencyStatus: false
          },
          {
            name: 'Buy sugar',
            date: '',
            doneStatus: false,
            urgencyStatus: false
          },
          {
            name: 'Buy bread',
            date: '',
            doneStatus: false,
            urgencyStatus: false
          },
          ]
        },
        {
          name: 'Make a homework',
          selected: false,
          arrayCase: [
          {
            name: 'Math',
            date: '',
            doneStatus: false,
            urgencyStatus: false
          },
          {
            name: 'History',
            date: '',
            doneStatus: false,
            urgencyStatus: false
          },
          ]
        },
        ]
      }
    },
    computed: {
      filtredLists() {
        return this.arrayList.filter((list) => {
          return String(list.selected).match(this.Filter);
        });
      }
    },
    methods: {
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid ? 'valid' : 'invalid'
        return valid
      },
      resetModal() {
        this.name = ''
        this.nameState = null
      },
      handleOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.createNewList()
      },
      resetModalCase() {
        this.name = ''
        this.nameStateCase = null
      },
      handleOkCase(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.createNewCase()
      },
      handleSubmit() {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }
        // Push the name to submitted names
        this.arrayList.push({name: this.name})
        // Hide the modal manually
        this.$nextTick(() => {
          this.$refs.modal.hide()
        })
      },
      checkCase(index) {// чтобы изменялись состояния в объекте
        this.indexCase = index;
        if (this.arrayList[this.indexList].arrayCase[index].doneStatus  == false) {
          this.arrayList[this.indexList].arrayCase[index].doneStatus = true;
        }
        else {
          this.arrayList[this.indexList].arrayCase[index].doneStatus = false;
        }
        let countCheked = 0;
        for (let i = 0; i < this.arrayList[this.indexList].arrayCase.length; i++) {
          if (this.arrayList[this.indexList].arrayCase[i].doneStatus) {
            countCheked++;          
          }
        }
        if (countCheked == this.arrayList[this.indexList].arrayCase.length) {
          console.log('return true');
          this.arrayList[this.indexList].selected = true;
        }
        else {
          console.log('return false');
          this.arrayList[this.indexList].selected = false;
        }
      },
      createNewCase() {
        for (let i = 0; i < this.arrayList[this.indexList].arrayCase.length; i++)
          if (this.nameCase == this.arrayList[this.indexList].arrayCase[i].name) {
            toastr.error('This name is already exist');
            return false;
          }
        if (this.nameCase.length > 30) 
          toastr.error('Length of name must be lower than 30 symbols!');
        else if (!this.nameCase.length)
          toastr.error('Enter name of list!');
        else {
          this.arrayList[this.indexList].selected = false;
          if (this.urgency) {
            this.arrayList[this.indexList].arrayCase.push({
              name: this.nameCase,
              date: '12',
              urgencyStatus: true,
              doneStatus: false
            });
          }
          else {
            this.arrayList[this.indexList].arrayCase.push({
              name: this.nameCase,
              date: '12',
              urgencyStatus: false,
              doneStatus: false
            });
          }
          toastr.success('Case "'+ this.nameCase + '" was added');
          this.$nextTick(() => {
            this.$refs.modal.hide()
          });
          this.nameCase = '';
        }
      },
      createNewList() {
        if (!this.checkFormValidity()) {
          return
        }
        for (let i = 0; i < this.arrayList.length; i++)
          if (this.name == this.arrayList[i].name) {
            toastr.error('This name is already exist');
            return false;
          }
        if (this.name.length > 30)
          toastr.error('Length of name must be lower than 30 symbols!');
        else if (!this.name.length)
          toastr.error('Enter name of list!');
        else {
          this.arrayList.push({name: this.name, arrayCase: []});
          toastr.success('To do list "'+ this.name + '" was added');
          this.$nextTick(() => {
            this.$refs.modal.hide()
          })
        }
      },
      deleteList(index) {
        if (confirm('Delete list "' + this.arrayList[index].name + '"?')) {
          this.$delete(this.arrayList, index);
        }
      },
      editList(index) {
        let listName = prompt('Edit a name of case', this.arrayList[index].name);
        this.arrayList[index].name = listName;
      },
      deleteCase(index) {
        if (confirm('Delete case "' + this.arrayList[this.indexList].arrayCase[index].name 
                      + '" from "' + this.arrayList[this.indexList].name + '"?')) {
          this.$delete(this.arrayList[this.indexList].arrayCase, index);
        }
      },
      editCase(index) {
        let caseName = prompt('Edit a name of case', this.arrayList[this.indexList].arrayCase[index].name);
        this.arrayList[this.indexList].arrayCase[index].name = caseName;
      },
      openList(index) {
        this.listName = this.arrayList[index].name;
        this.visibleBtnPlusCase = true;
        this.indexList = index;
      }
    }
  }
</script>
<style scoped>

  .urgency-ico {
    margin-right: 10px;
  }

  .green {
    background-color: #A5D6A7;    
  }
  .grey {
    background-color: #ECF0F1;    
  }
  .white {
    background-color: #fff;
  }

  .check-case {
    margin-right: 10px;
    width: 25px;
    height: 25px;
    background-color: #A5D6A7;
  }

  .check-case:after {
    background-color: #A5D6A7;
  }

  .list-group {
    margin-bottom: 30px;
  }

  .list-group-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .list-group-item p {
    padding-top: 15px;
  }

  .btns-edit {
    margin-left: 20px;
  }

  .edit:focus {
    outline: none;
  }
  
  .edit {
    width: 35px;
    height: 35px;
    margin-left: 5px;
    border-radius: 50px;
    border-color: #333;
    background-color: #fff;
  }
  .edit img {
    width: 20px;
    width: 20px;
    padding-bottom: 2px;
  }
  .edit h3 {
    margin-top: -8px;
  }

  /*header {
    display: flex;
    justify-content: space-around;
    background-color: #333333;
    background-size: 500px;
    color: #fff;
    padding-top: 15px;
  }

  .header-right {
    display: flex;
    justify-content: flex-start;
  }

  .header-right a{
    margin-right: 20px;  
  }*/

  .form-control {
    margin-bottom: 5px;
  }

  .interface {
    margin-top: 60px;
    display: flex;
    justify-content: center;
    min-height: 500px;
  }

  .todo-list {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 2px solid #333;
    padding: 30px;
    min-width: 350px;
  }

  .top li {
    cursor: pointer;
  }

  .plus-case {
    border-radius: 50px;
    border: 2px solid;
    color: #333;
    border-color: #333;
    background-color: #fff;
    width: 47px;
    height: 47px;
  }
  .plus-case h3{
    margin-top: -5px;
  }

  .plus-list {
    border-radius: 50px;
    border: 2px solid;
    color: #333;
    border-color: #333;
    background-color: #fff;
    width: 47px;
    height: 47px;
  }
  .plus-list h3{
    margin-top: -5px;
  }

  .details {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 2px solid #333;
    padding: 30px;
    min-width: 350px;
  }

  .details-top {
    display: flex;
    flex-direction: column;
  }
  .details-top hr {
    margin-top: 13px;
    min-width: 280px;
  }
  .details-top h3 {
    text-align: center;
  }

</style>

