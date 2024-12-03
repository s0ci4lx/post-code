<script setup>
import { ref, watch, onMounted } from 'vue';

import { useAuthStore } from './stores/authStore';
const authStore = useAuthStore(); // ใช้ Pinia store
const userPhotoURL = ref(authStore.user?.photoURL || 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp');

// ใช้ watch เพื่อตรวจสอบการเปลี่ยนแปลงของ authStore.user และ photoURL
watch(() => authStore.user?.photoURL, (newPhotoURL) => {
  if (newPhotoURL) {
    userPhotoURL.value = newPhotoURL;
  }
});
onMounted(() => {
  authStore.initAuthState(); // ตรวจสอบสถานะล็อกอิน
});
</script>

<template>
  <main>
    <div class="navbar bg-base-100">
      <div class="navbar-start">
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li>
              <RouterLink :to="{ name: 'home' }">
                <a>Homepage</a>
              </RouterLink>
            </li>
            <li>
              <RouterLink :to="{ name: 'code' }">
                <a>Get Code</a>
              </RouterLink>
            </li>
            <li v-if="authStore.user">
              <RouterLink :to="{ name: 'CreateCode' }">
                <a>Save Code</a>
              </RouterLink>
            </li>

          </ul>
        </div>
      </div>
      <div class="navbar-center">
        <a class="btn btn-ghost text-xl">getCode</a>
      </div>
      <div class="navbar-end">
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img :src="userPhotoURL" alt="User Photo" class="w-8 h-8 rounded-full mr-2" />
            </div>
          </div>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li v-if="authStore.user">
              <span>{{ authStore.user.email }}</span>
            </li>
            <li v-if="authStore.user">
              <RouterLink :to="{ name: 'home' }">
                <span @click="authStore.logout">Logout</span> 
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-if="authStore.isLoading">Loading...</div>
    <RouterView v-else />
  </main>
</template>
