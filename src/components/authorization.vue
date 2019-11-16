<template>
	<div class="auth">
		<h3>Авторизация</h3>
		<form>
			<p id="err"></p>
			<input class="form-control" type="text" name="login" id="login" placeholder="Username">
			<input class="form-control" type="password" id="password" name="password" placeholder="Password">
			<button class="btn btn-primary" v-on:click="check">Войти</button>
		</form>
	</div>
</template>

<script>
  export default {
    name: 'auth',
    data() {
    	return {
    		userName: ''
    	}
    },
    methods: {
    	check() {
    		if (!document.getElementById('login').value) {
    			document.getElementById('err').innerHTML = 'Please, enter login'
    		}
    		else if (!document.getElementById('password').value) {
    			document.getElementById('err').innerHTML = 'Please, enter password'
    		}
    		else {
    			this.userName = document.getElementById('login').value;
    			this.$emit('authComplete', this.userName);
    		}
    	}
    }
}
</script>

<style scoped>
	.auth {
	  margin-top: 100px;
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	}
	#err {
		color: red;
	}

	form {
	  display: flex;
	  flex-direction: column;
	  margin-top: 15px;
	}
</style>