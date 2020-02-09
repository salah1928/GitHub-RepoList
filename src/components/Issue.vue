<template>
    <div>
        <div v-if="issue.title" id="mousefollower2">
            <div class="title">{{issue.title}}</div>
            <div class="info">
                <div class="status">{{issue.state}}</div>
                <div class="user">{{issue.user.login}} opened this {{timeSince(issue.created_at)}}. {{issue.comments}} comments</div>
            </div>
        </div>
        <div v-else id="mousefollower2">
            <div class="error">{{issue}}</div>
        </div>
    </div>
</template>
<script>
const axios = require('axios');
const moment = require('moment');
export default {
    props:['repo'],
    data(){
        return{
            issue:""
        }
    },
    methods:{
        getIssue(){
            axios.get(`https://api.github.com/repos/${this.repo.owner.login}/${this.repo.name}/issues?state=open`)
            .then(res => {
                if(res.data[0]){
                    this.issue = res.data[0];
                }else{
                    this.issue = "No open issues found."
                }
            })
        },
        timeSince(date){
        return moment(new Date(date), "YYYYMMDD").fromNow();
    },
    },
    mounted(){
        this.getIssue()
    }
}
</script>
<style>
@import '../assets/style/mousefollower.css';
</style>