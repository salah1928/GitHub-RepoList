<template>
  <div id="app">
  <div v-for="itm in shit.items"  :key="itm.id">
    <h1>Repo Name: {{itm.full_name}}</h1>
    <p>Repo Description:{{itm.description}}</p>
    <h6>Staaaars: {{itm.stargazers_count}}</h6>
    <h6>Isuuuwwwwz: {{itm.open_issues}}</h6>
    <h4>OwOner: {{itm.owner.login}}</h4>
  </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
const axios = require('axios');
export default {
  name: 'app',
  data(){
    return{
       shit : ""
    }
  },
  // components: {
  //   HelloWorld
  // },
  created(){
    axios.get('https://api.github.com/search/repositories?q=created:>2020-01-04&sort=stars&order=desc').then(r=>{this.shit = r.data})
  }
}
</script>

<style>

</style>
