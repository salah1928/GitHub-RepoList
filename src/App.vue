<template>
  <div id="app">
    <div id="title" class="gridcenter">
      <h1>Top github repositories created from {{getLastMonthDate()}} to now.</h1><h3>Press<span @click="reset()" id="key">R</span> to refresh.</h3>
    </div>
    <div id="wrapper">
        <div id="repos_Container">
            <Repo :repos="repos"></Repo>
            <infinite-loading ref="infiniteLoading" :identifier="infiniteId" spinner="waveDots" @infinite="infiniteHandler">
                <div slot="no-more">Wow, looks like you saw all the repositories!</div>
                <div slot="no-results">Nothing to see here.</div>
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
      page:1,
      infiniteId: +new Date(),
    }
  },
  methods:{
    reset(){
      this.repos =  [],
      this.page = 1,
      this.infiniteId += 1
    },
    getLastMonthDate(){
        let today = new Date();
        let last_month = new Date();
        last_month.setDate(today.getDate() - 30);   
        let day = this.formatNumber(last_month.getDate() - 1);
        let month = this.formatNumber(last_month.getMonth() + 1);
        let year = last_month.getFullYear();
      return `${year}-${month}-${day}`
    },
     /*
    *  prepend 0 to number if it's single digit
    *  @returns {integer} 
    */
    formatNumber(num){                                        
      let formated_num = num > 10 ? num : '0' + num;
      return formated_num;
    },
    infiniteHandler($state) {
      axios.get(`https://api.github.com/search/repositories`, {
        params: {
          page: this.page,
          q: 'created:>' + this.getLastMonthDate(),
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
  created(){
    window.addEventListener('keydown', (e)=>{
      if (e.key == 'r'){
        this.reset()
      }
    })
  }
};
</script>
<style>
@import './assets/style/style.css';
</style>