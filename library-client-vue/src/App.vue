<script setup>
import { RouterLink, RouterView } from 'vue-router'
import {userFromToken} from '@/utils/api/auth';
import { onBeforeMount } from 'vue';
import {logout} from '@/utils/functions';
import { setUser } from './utils/functions';


// remove invalid token of logged in user
onBeforeMount(()=>{
  const token = localStorage.getItem('user-token');
  if(token){
    userFromToken(token)
    .then(data=>{
      setUser(data.user)
    })
    .catch(err=>{
      console.log('err: ', err)
      logout();
    })
  }

});

</script>

<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div v-on:click="helloWorld" class="wrapper">
      <HelloWorld msg="You did it!"  />

      <nav>
        <RouterLink to="/">Home {{ hello }} </RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->

  <RouterView />
</template>
