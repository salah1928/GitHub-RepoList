<template>
    <div id="repos_Container">
        <div class="repo">
            <div class="gridcenter img"><img class="repo_Image" :src="repo.owner.avatar_url" alt=""></div>
            <div class="gridcenter information">
                <div class="gridcenter repo_Name">{{repo.name}}</div>
                <div class="gridcenter repo_Description">{{repo.description}}</div>
                <div class="gridcenter repo_Stats">
                    <div class="btns">
                        <div @mouseenter="showstats('stars', index, $event)" @mouseleave="hidestats('stars', index)" class="gridcenter repo_Stars"><span><i class="fas fa-star"></i>{{repo.stargazers_count}}</span></div>
                        <div @mouseenter="showstats('issues', index, $event)" @mouseleave="hidestats('issues', index)" class="gridcenter repo_Issues"><span><i class="fas fa-code-branch"></i>{{repo.open_issues}}</span></div>
                    </div>
                    <div class="gridcenter repo_Created_atby">Submitted {{timeSince(repo.created_at)}} by {{repo.owner.login}}.</div>
                </div>
            </div>
        <Stars class="stats stars_stats" :repo="repo"></Stars>
        <Issue class="stats issues_stats" :repo="repo"></Issue>
        </div>
    </div>
</template>
<script>
const moment = require('moment');
export default {
    props:['repo','index'],
    methods:{
    timeSince(date){
        return moment(new Date(date), "YYYYMMDD").fromNow();
    },
    /* 
    * This is for an extra feature that i added
    */
   showstats(menu, index, event){
       if(window.innerWidth < 600){
           return
       }
        this.hideall();
        let list = document.getElementsByClassName(`${menu}_stats`)[index]
        list.style.display = "block"
        window.onmousemove = (e)=>{
        list.style.left = e.clientX - 220 + 'px';
        list.style.top = e.clientY - 220 + 'px';
      }
    },
    hidestats(menu, index){
        document.getElementsByClassName(`${menu}_stats`)[index].style.display = 'none';
    },
    hideall(){
        document.getElementsByClassName('stars_stats').forEach(stat => {
                stat.style.display = "none" 
        });
        document.getElementsByClassName('issues_stats').forEach(stat => {
                stat.style.display = "none"   
        });
    }
    },
}
</script>