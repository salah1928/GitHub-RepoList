import Vue from 'vue'
import App from './App.vue'
import Paginate from 'vuejs-paginate'
import Repo from './components/Repo'
import Stars from './components/Stars'
import Issue from './components/Issue'


Vue.config.productionTip = false

Vue.component('paginate', Paginate)
Vue.component('Repo', Repo)
Vue.component('Stars', Stars)
Vue.component('Issue', Issue)

new Vue({
  render: h => h(App),
}).$mount('#app')
