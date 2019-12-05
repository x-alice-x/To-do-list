import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

let defaultUserLists = {
	Lists: [
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
    ]
}

export default new Vuex.Store({
	state: {
		processing: false,
		error: null,
		user: {
			isAuthenticated: false,
			uid: null
		},
		arrayList: [],
		userLists: defaultUserLists
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
			state.user.uid = payload
		},
		UNSET_USER(state) {
			state.user = {
				isAuthenticated: false,
				uid: null
			}
			state.error = null
		},
		SET_LISTS(state, payload) {
			state.arrayList = payload
		},
		SET_USER_LISTS(state, payload) {
			// console.log('ser users ' + state.userLists)
			state.userLists = payload
		},
		ADD_USER_LISTS(state, payload) {
			Vue.set(state.userLists.lists, payload.listId, payload.list)
		}
	},
	actions: {
		SIGNIN({commit}, payload) {
			commit('SET_PROCESSING', true)
			commit('CLEAR_ERROR')
			firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
			.then(user => {
				state.user.isAuthenticated = true
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
		STATE_CHANGED({commit, dispatch}, payload) {
			if(payload) {
				commit('SET_USER', payload.uid)
				dispatch('LOAD_LISTS', payload.uid)
			}
			else {
				commit('UNSET_USER')
			}
		},
		// LOAD_LISTS({commit}, payload) {
			// Vue.$db.collection('userLists').doc(payload)
			// .get()
			// .then(querySnapshot => {
			// 	let arrayList = []
			// 	querySnapshot.forEach(s => {
			// 		const data = s.data()
			// 		let list = {
			// 			name: data.name,
			// 			listId: data.list_id,
			// 			selected: data.selected
			// 		}
			// 		console.log(list.name)
			// 		let arrayCase = []
			// 		if(data.arrayCase) {
			// 			data.arrayCase.forEach(c => {
			// 				let cases = {
			// 					name: c.name,
			// 					date: c.date,
			// 					doneStatus: c.doneStatus,
			// 					urgencyStatus: c.urgencyStatus
			// 				}
			// 				arrayCase.push(cases)
			// 			})
			// 		}
			// 		list.arrayCase = arrayCase

			// 		arrayList.push(list)
			// 		console.log('arr' + arrayList)
			// 	})
			// 	commit('SET_LISTS', arrayList)
			// })

			// .catch(function(error){
			// 	commit('SET_ERROR', error.message)
			// 	console.log(error.message)
			// });
		// },
		LOAD_LISTS({commit}, payload) {
			let userListsRef = Vue.$db.collection('userLists').doc(payload)
			userListsRef.get()
			.then((data) => {
				let userLists = data.exists ? data.data() : defaultUserLists
				for (let key in userLists.lists) {
					if (userLists.lists.hasOwnProperty(key)) {
						userLists.lists[key].addedDate = userLists.lists[key].addedDate.toDate()
					}
				}
				this.userLists = userLists
				console.log(this.userLists)
				console.log(defaultUserLists)
				commit('SET_USER_LISTS', userLists)
				commit('SET_PROCESSING', false)
			})
			.catch((error) => {
				commit('SET_ERROR', error.message)
				console.log(error.message)
			})
		},
		ADD_USER_LISTS({commit, getters}, payload) {
			commit('SET_PROCESSING', true)
			let userListsRef = Vue.$db.collection('userLists').doc(getters.getUserId)
			for (let i = 0; i < payload.length; i++) {
				userListsRef.set({
					Lists: payload //set(List: payload)
				}, {merge : true})
				// let userCasesRef = Nue.$db.collection('userLists')
				// for (let j = 0; j < payload[i].arrayCase.length; j++) {
				// 	userListsRef.set({
				// 		arrayCase.name: payload[j].arrayCase.name
				// 	})
				// }
			}
		}
	},
	getters: {
		getProcessing: (state) => state.processing,
		getError: (state) => state.error,
		isUserAuthenticated: (state) => state.user.isAuthenticated,
		getEmail: () => firebase.auth().currentUser.email,
		getArrayList: (state) => state.userLists.Lists,
		getUserId: (state) =>  state.user.uid
	}
})