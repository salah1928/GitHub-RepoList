<template>
    <div>
        <div class="content gridcenter" id="stars">
            <p>Some people who liked this:</p>
        <ul>
            <li v-for="gazer in stargazers" :key="gazer.id">
                <img :src="gazer.avatar_url" alt="">
                <div class="name">{{gazer.login}}</div>
            </li>
        </ul>
        </div>
    </div>
</template>
<script>
const axios = require('axios');
export default {
    props:['repo'],
    data(){
        return{
            stargazers:[]
        }
    },
    methods:{
        getStargazers(){
            axios.get(`${this.repo.stargazers_url}`)
            .then(res => {
                let rand = Math.floor(Math.random() *res.data.length)
                for (let i = 0; i < 4; i++) {
                   this.stargazers.push(res.data[rand + i])
                }
            })
        },
    },
    mounted(){
        this.getStargazers()
    }
}
</script>
