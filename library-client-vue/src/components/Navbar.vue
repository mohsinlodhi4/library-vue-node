<script setup>

import { logout, getUser } from '@/utils/functions';

const user = getUser();

</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-2">
        <a class="navbar-brand" href="#">Library Management</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      
        <div class="collapse navbar-collapse d-flex justify-content-between" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
          </ul>
          <form v-on:submit="logout" class="form-inline my-2 my-lg-0">
            <span class="text-white mx-3"> Hello,  {{ user.name }} </span>
            <button class="btn btn-outline-light my-2 my-sm-0" type="submit"><strong> Logout </strong></button>
          </form>
        </div>
      </nav>
</template>