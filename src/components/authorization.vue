<template>
	<div class="auth">
		<h3>Авторизация</h3>
		<div class="form">
			<input class="form-control" type="text" name="login" id="login" placeholder="E-mail" required v-model="userName">
			<input class="form-control" type="password" id="password" name="password" placeholder="Password" required v-model="password">
			<button class="btn btn-primary" @click.prevent="check">Войти</button>
			<span id="err" :value="error">{{error}}</span>
		</div>
	</div>
</template>

<script>
  export default {
    name: 'auth',
    data() {
    	return {
    		userName: null,
    		password: null
    	}
    },
    computed: {
    	error() {
    		return this.$store.getters.getError
    	},
    	processing() {
    		return this.$store.getters.getProcessing
    	},
    	isUserAuthenticated() {
    		return this.$store.getters.isUserAuthenticated
    	}
    },
    methods: {
    	check() {
    		this.$store.dispatch('SIGNIN', 
    			{email: this.userName, password: this.password})
    		if (this.isUserAuthenticated) {
    			this.$emit('authComplete', this.userName)
    		}
    	}
    }
}
</script>

<style scoped>
	.auth {
	  margin-top: 150px;
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	}
	#err {
		color: red;
		margin-top: 15px;
	}
	.form {
	  display: flex;
	  flex-direction: column;
	  margin-top: 15px;
	  width: 250px;
	}
	.btn {
		margin-top: 10px;
	}
</style>