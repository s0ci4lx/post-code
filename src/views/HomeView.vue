<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
    <div class="mockup-browser bg-base-300 border">
        <div class="mockup-browser-toolbar">
          <div class="input">https://post-code-vue.netlify.app</div>
        </div>
        <div class="join flex items-center justify-center">
            <RouterLink
            :to="{ name: 'code' } "
            >

                <button class="btn join-item">Get Code</button>
            </RouterLink>
            <RouterLink
            :to="{ name: 'CreateCode' } "
            >

                <button class="btn join-item">Save Code</button>
            </RouterLink>

          </div>
      </div>
</template>