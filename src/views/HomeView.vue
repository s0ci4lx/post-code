<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <div class="mockup-browser h-64 m-8 bg-base-300 border ">
        <div class="mockup-browser-toolbar">
          <div class="input">https://post-code-vue.netlify.app</div>
        </div>
        <div class="join join-vertical lg:join-horizontal flex items-center justify-center mt-5">
            <RouterLink
            :to="{ name: 'code' } "
            >

                <button class="btn btn-success join-item"><font-awesome-icon icon="fa-solid fa-code" /> Get Code</button>
            </RouterLink>
            <RouterLink
            :to="{ name: 'CreateCode' } "
            >

                <button class="btn btn-warning join-item"><font-awesome-icon icon="fa-regular fa-floppy-disk" /> Save Code</button>
            </RouterLink>

          </div>
      </div>
</template>