<template>
  <div id="app">
    <modal 
      :label="labelCreateList"
      :title="titleCreateList"
      :modalId="modalIdCreateList"
      :visibleCheckbox='0'
      @action="createNewList" 
      @handleAction="createNewList">  
    </modal>
    <modal 
      :label="labelCreateCase"
      :title="titleCreateCase"
      :modalId="modalIdCreateCase"
      :visibleCheckbox='1'
      @action="createNewCase" 
      @handleAction="createNewCase">  
    </modal>
    <modal 
      :label="labelEditList"
      :title="titleEditList"
      :modalId="modalIdEditList"
      :visibleCheckbox='0'
      @action="editList" 
      @handleAction="editList">  
    </modal>
    <modal 
      :label="labelEditCase"
      :title="titleEditCase"
      :modalId="modalIdEditCase"
      :visibleCheckbox='0'
      @action="editCase" 
      @handleAction="editCase">  
    </modal>
    <div class="interface">
      <lists 
        :arrayList="arrayList"
        @getFiltred="existList"
        @deleteList="deleteList"
        @openList="openList">
      </lists>
      <cases
        :existList="existListAr"
        :existNameList="existNameListAr"
        :noList="noList"
        :visiblePlusCase="visiblePlusCase"
        @deleteCase="deleteCase"
        @openCase="openCase"
        @checkCase="checkCase">
      </cases>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import modal from './modal.vue'
  import lists from './lists.vue'
  import cases from './cases.vue'
  export default {
    name: 'todo-list',
    components: {
      modal,
      lists,
      cases
    },
    data() {
      return {
        modalIdCreateList: 'plus-list',
        titleCreateList: 'Add the new list',
        labelCreateList: 'Enter the name of the new list',
        modalIdCreateCase: 'plus-case',
        titleCreateCase: 'Add the new case',
        labelCreateCase: 'Enter the name of the new case',
        modalIdEditList: 'edit-list',
        titleEditList: 'Edit the list',
        labelEditList: 'Enter the new name of the list',
        modalIdEditCase: 'edit-case',
        titleEditCase: 'Edit the case',
        labelEditCase: 'Enter the new name of the case',
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
          listId: 0,
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
          listId: 1,
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
        ],
        emptyList: {
          name: 'You have no list here'
        },
        noList: false,
        visiblePlusCase: true,
        filtredLists: [],
        existListAr: [],
        existNameListAr: []
      }
    },
    methods: {
      existList(filtredLists) {
        this.filtredLists = filtredLists;
        console.log('exist ' + this.filtredLists);
        if (this.filtredLists.length) {
          this.noList = false;
          this.visiblePlusCase = true;
          this.existListAr = this.filtredLists[this.indexList].arrayCase;
          this.existNameListAr = this.filtredLists[this.indexList];
        }
        else {
          this.noList = true;
          this.visiblePlusCase = false;
          this.existListAr = this.emptyList;
          this.existNameListAr = this.emptyList;
        }
      },
      checkCase(index) {
        this.indexCase = index;
        if (this.filtredLists[this.indexList].arrayCase[index].doneStatus  == false) {
          this.filtredLists[this.indexList].arrayCase[index].doneStatus = true;
        }
        else {
          this.filtredLists[this.indexList].arrayCase[index].doneStatus = false;
        }
        let countCheked = 0;
        for (let i = 0; i < this.filtredLists[this.indexList].arrayCase.length; i++) {
          if (this.filtredLists[this.indexList].arrayCase[i].doneStatus) {
            countCheked++;          
          }
        }
        if (countCheked == this.filtredLists[this.indexList].arrayCase.length) {
          this.filtredLists[this.indexList].selected = true;
        }
        else {
          this.filtredLists[this.indexList].selected = false;
        }
      },
      createNewCase(name, urgency) {
        this.nameCase = name;
        this.urgency = urgency;
        for (let i = 0; i < this.filtredLists[this.indexList].arrayCase.length; i++)
          if (this.nameCase == this.filtredLists[this.indexList].arrayCase[i].name) {
            toastr.error('This name is already exist');
            return false;
          }
        if (this.nameCase.length > 30) 
          toastr.error('Length of the name must be lower than 30 symbols!');
        else if (!this.nameCase.length)
          toastr.error('Enter the name of the list!');
        else {
          this.filtredLists[this.indexList].selected = false;
          let dateCase = new Date();
          dateCase = dateCase.getDate() + '.' + (dateCase.getMonth()+1) + '.' 
                    + dateCase.getFullYear() + ', ' 
                    + dateCase.getHours() + ':' + dateCase.getMinutes();
          console.log(dateCase);
          if (this.urgency) {
            this.filtredLists[this.indexList].arrayCase.push({
              name: this.nameCase,
              date: dateCase,
              urgencyStatus: true,
              doneStatus: false
            });
          }
          else {
            this.filtredLists[this.indexList].arrayCase.push({
              name: this.nameCase,
              date: dateCase,
              urgencyStatus: false,
              doneStatus: false
            });
          }
          toastr.success('Case "'+ this.nameCase + '" was added');
          this.nameCase = '';
        }
      },
      createNewList(name) {
        this.name = name;
        for (let i = 0; i < this.arrayList.length; i++)
          if (this.name == this.arrayList[i].name) {
            toastr.error('This name is already exist');
            return false;
          }
        if (this.name.length > 30)
          toastr.error('Length of the name must be lower than 30 symbols!');
        else if (!this.name.length)
          toastr.error('Enter the name of the list!');
        else {
          let listId = this.arrayList.length;
          this.arrayList.push({name: this.name, selected: false, listId: listId,  arrayCase: []});
          this.indexList = this.arrayList.length - 1;
          this.listName = this.arrayList[this.indexList].name;
          toastr.success('To do list "'+ this.name + '" was added');
        }
      },
      deleteList(index) {
        console.log(this.filtredLists)
        if (confirm('Delete list "' + this.filtredLists[index].name + '"?')) {
          let listId = this.filtredLists[index].listId;
          let indexList;
          this.indexList = index;
          for (let i = 0; i < this.arrayList.length; i++) {
            if (listId == this.arrayList[i].listId) {
              indexList = i;
            }
          }
          if (this.arrayList.length == 1) {
            this.$delete(this.arrayList, indexList);
          }
          else {
            if (this.indexList == index) {
              if (index > 0)
                this.indexList = index - 1;
            }
            this.$delete(this.arrayList, indexList);
          }
        }
      },
      editList(name) {
        let nameEditList = name;
        if (nameEditList.length)
          this.filtredLists[this.indexList].name = nameEditList;
      },
      deleteCase(index) {
        if (confirm('Delete case "' + this.filtredLists[this.indexList].arrayCase[index].name + '" from "' + this.filtredLists[this.indexList].name + '"?')) {
          this.$delete(this.filtredLists[this.indexList].arrayCase, index);
        }
      },
      editCase(name) {
        let nameEditCase = name;
        if (nameEditCase.length) {
          this.filtredLists[this.indexList].arrayCase[this.indexCase].name = nameEditCase;
        }

      },
      openList(index, filtredLists) {
        if (event.target.id == 'icon_del')
          return false;
        this.indexList = index;
        this.existList(filtredLists);
      },
      openCase(index) {
       if (event.target.id == 'icon_del')
          return false;
        
        this.indexCase = index; 
      }
    }
  }
</script>
<style>

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

