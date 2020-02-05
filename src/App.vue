<template>
  <div id="app">
    <button @click.prevent="update_repos()">refresh</button>
    <input v-model="year" type="number">
    <div v-for="(repo , index) in repos"  :key="index">
    <h1>Repo Name: {{repo.full_name}}</h1>
    <p>Repo Description:{{repo.description}}</p>
    <h1>{{index}}</h1>
    <h6>Staaaars: {{repo.stargazers_count}}</h6>
    <h6>Isuuuwwwwz: {{repo.open_issues}}</h6>
    <h4>OwOner: {{repo.owner.login}}</h4>
    <h6>{{repo.created_at}}</h6>
  </div>
  <infinite-loading :identifier="infiniteId" spinner="waveDots" @infinite="infiniteHandler">
    <div slot="no-more">No more message</div>
    <div slot="no-results">No results message</div>
  </infinite-loading>

  </div>
</template>

<script>
const axios = require('axios');
import Paginate from 'vuejs-paginate'
import InfiniteLoading from 'vue-infinite-loading';

export default {
  components: {
    Paginate,
    InfiniteLoading
  },
  name: 'app',
  data(){
    return{   
      repos:[],
      day:0,
      month:-1,
      year:0,
      page:0,
      infiniteId: +new Date(),
    }
  },
  methods:{
    get_repos(da=this.day,mo=this.month,ye=this.year){
      axios.get(`https://api.github.com/search/repositories?q=created:>${this.getdate(da,mo,ye)}&sort=stars&order=desc`).then(r=>{this.repos = r.data})
    },
    //made this function so i can get most starred repos at any past date -- bonus feature :D
    getdate(da=0,mo=0,ye=0){//if given da=0 returns current today , da=1 returns following day , da=-1 past day , same for month and year
      let today = new Date() 
      let day = this.formatDnM(today.getDate() + da) 
      let month = this.formatDnM(today.getMonth() + 1 + mo)  // +1 because getMonth returns jan as 0 and feb as 1 ...
      // formatDnM: if input is single digit add 0 to the left, eg: formatDnM(6) = 06
      let year = today.getFullYear() + ye
      let fulldate = `${year}-${month}-${day}`
      return fulldate
    },
    formatDnM(num){
      let formated_num = num > 10 ? num : '0' + num
      return formated_num
    },
    update_repos(){
      
      
    },
    infiniteHandler($state,da=this.day,mo=this.month,ye=this.year) {
      axios.get(`https://api.github.com/search/repositories?q=created:>${this.getdate(da,mo,ye)}&sort=stars&order=desc`, {
        params: {
          page: this.page,
        },
      }).then(({ data }) => {
        if (data.items.length) {
          this.page += 1;
          this.repos.push(...data.items);
          $state.loaded();
        } else {
          $state.complete();
        }
      });
    },
    update_list(){
      this.page = 1;
      this.repos = [];
      this.infiniteId += 1;
    }
  },
  created(){    
  
  },
  mounted(){
    
  },
  computed:{
    refreshrepos(){  
      axios.get(`https://api.github.com/search/repositories?q=created:>${this.getdate(this.year,this.month,this.day)}&sort=stars&order=desc&page=${this.page_number}`)
      .then(r=>{
        this.repos =  r.data})
    },
  }
}
</script>

<style>

</style>
