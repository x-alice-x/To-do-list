import Vue from 'vue'
import Vuex from 'vuex'
import store from './store'
import App from './App.vue'
import VueToastr2 from 'vue-toastr-2'
import 'vue-toastr-2/dist/vue-toastr-2.min.css'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import firebaseConfig from './config/firebase'
import firebase from 'firebase'
import "firebase/firestore"
 
window.toastr = require('toastr')
 
Vue.use(VueToastr2)
Vue.use(BootstrapVue)

Vue.config.productionTip = false

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
db.settings({
	timestampsInSnapshots: true
});

Vue.$db = db

new Vue({
  store,
  render: h => h(App),
  created() {
  	let vm = this
  	firebase.auth().onAuthStateChanged(function(user) {
  		vm.$store.dispatch('STATE_CHANGED', user)
  	});
  	// this.$store.dispatch('LOAD_LISTS')
  }
}).$mount('#app')