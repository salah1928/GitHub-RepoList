import Vue from 'vue'
import App from './App.vue'
import Repo from './components/Repo'
import Stars from './components/Stars'
import Issue from './components/Issue'


Vue.config.productionTip = false

Vue.component('Repo', Repo)
Vue.component('Stars', Stars)
Vue.component('Issue', Issue)

new Vue({
  render: h => h(App),
}).$mount('#app')
