<template>
	<div>
		<b-modal
      :id="modalId"
      ref="modal"
      :title="title"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="$emit('action', name, urgency)">
        <b-form-group
          :state="nameState"
          :label="label"
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
          <b-form-checkbox
            id="checkbox-1"
            v-model="urgency"
            name="checkbox-1"
            v-if="visibleCheckbox"
          >
            <b-form-label>
              Urgency
            </b-form-label>
          </b-form-checkbox>
        </b-form-group>
      </form>
    </b-modal>
	</div>
</template>

<script>
  import $ from 'jquery'
  export default {
    name: 'todo-list',
    props: {
    	modalId: String,
    	label: String,
    	title: String,
    	visibleCheckbox: Number
    },
    data() {
    	return { 
    		name: '',
    		nameState: null,
    		urgency: false
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
	        this.urgency = false
	        this.nameState = null
	    },
	    handleOk(bvModalEvt) {
	        bvModalEvt.preventDefault()
	        this.$emit('handleAction', this.name, this.urgency)
	        this.$nextTick(() => {
	            this.$refs.modal.hide()
	        })
	    }
	}

}
</script>