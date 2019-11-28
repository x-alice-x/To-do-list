import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		processing: false,
		error: null,
		user: {
			isAuthenticated: false,
			userId: null
		}
	},
	mutations: {
		SET_PROCESSING(state, payload) {
			state.processing = payload
		},
		SET_ERROR(state, payload) {
			state.error = payload
		},
		CLEAR_ERROR(state) {
			state.error = null
		},
		SET_USER(state, payload) {
			state.user.isAuthenticated = true
			state.user.userId = payload
		},
		UNSET_USER(state) {
			state.user = {
				isAuthenticated: false,
				userId: null
			}
		}
	},
	actions: {
		SIGNIN({commit}, payload) {
			commit('SET_PROCESSING', true)
			commit('CLEAR_ERROR')
			firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
			.then(user => {
				commit('SET_PROCESSING', false)
			})
			.catch(function(error){
				commit('SET_PROCESSING', false)
				commit('SET_ERROR', error.message)
			});
		},
		SIGNOUT() {
			firebase.auth().signOut()
		},
		STATE_CHANGED({commit}, payload) {
			if(payload) {
				commit('SET_USER', payload.userId)
			}
			else {
				commit('UNSET_USER')
			}
		}
	},
	getters: {
		getProcessing: (state) => state.processing,
		getError: (state) => state.error,
		isUserAuthenticated: (state) => state.user.isAuthenticated
	}
})