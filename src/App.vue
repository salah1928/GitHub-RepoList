<template>
  <div id="app">
    <h1>Generating github repositories created from {{generateLastMonthDate()}} to now.</h1>
    <div id="wrapper">
        <div id="repos_Container">
            <div v-for="(repo , index) in repos"  :key="index" class="repo">
                <div class="gridcenter img"><img class="repo_Image" :src="repo.owner.avatar_url" alt=""></div>
               <div class="gridcenter information">
                   <div class="gridcenter repo_Name">{{repo.full_name}}</div>
                   <div class="gridcenter repo_Description">{{repo.description}}</div>
                   <div class="gridcenter repo_Stats">
                       <div class="btns">
                          <div class="gridcenter repo_Stars">stars:{{repo.stargazers_count}}</div>
                          <div class="gridcenter repo_Issues">issues:{{repo.open_issues}}</div>
                       </div>
                       <div class="gridcenter repo_Created_atby">Submitted 30 days ago by {{repo.owner.login}}.</div>
                   </div>
               </div>
            </div><!-- repo -->
            <infinite-loading :identifier="infiniteId" spinner="waveDots" @infinite="infiniteHandler">
                <div slot="no-more">Wow, looks like you saw all repositories!</div>
                <div slot="no-results">Nothing results to see here.</div>
            </infinite-loading>
        </div>
    </div>
  </div>
</template>

<script>
const axios = require('axios');
import InfiniteLoading from 'vue-infinite-loading';
export default {
  components: {
    InfiniteLoading
  },
  name: 'app',
  data(){
    return{   
      repos: [],
      infiniteId: +new Date()
    }
  },
  methods:{
    generateLastMonthDate(){
        let today = new Date();
        let last_month = new Date();
        last_month.setDate(today.getDate() - 30);   
        let day = this.formatDate(last_month.getDate());
        let month = this.formatDate(last_month.getMonth() + 1);
        let year = last_month.getFullYear();
      return `${year}-${month}-${day}`
    },
     /*
    *  prepend 0 to number if it's single digit
    *  @returns {integer} 
    */
    formatDate(num){
      let formated_num = num > 10 ? num : '0' + num;
      return formated_num;
    },
    infiniteHandler($state) {
      axios.get(`https://api.github.com/search/repositories`, {
        params: {
          page: this.page,
          q: 'created:>' + this.generateLastMonthDate(),
          sort: 'stars',
          order: 'desc'
        },
        }).then(({ data }) => {
          if (data.items.length) {
            this.page++;
            this.repos.push(...data.items);
            $state.loaded();
          } else {
            $state.complete();
          }
        }
      );
    },
  },
};
</script>
<style>
@import './assets/style/style.css';
</style>