import Vue from 'vue'
import App from './App.vue'
import Paginate from 'vuejs-paginate'
import Repo from './components/Repo'


Vue.config.productionTip = false

Vue.component('paginate', Paginate)
Vue.component('Repo', Repo)

new Vue({
  render: h => h(App),
}).$mount('#app')
