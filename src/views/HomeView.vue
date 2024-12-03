<script setup>
import { useAuthStore } from '../stores/authStore'; // นำเข้า authStore

const authStore = useAuthStore(); // ใช้ Pinia store

</script>

<template>
  
  <div class="mockup-browser h-64 m-8 bg-base-300 border">
    <div class="mockup-browser-toolbar">
      <div class="input">https://get-code.netlify.app/</div>
      <label class="grid cursor-pointer place-items-center ps-2">
        <input
          type="checkbox"
          value="cmyk"
          class="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1" />
        <svg
          class="stroke-base-100 fill-base-100 col-start-2 row-start-1"
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
        <svg
          class="stroke-base-100 fill-base-100 col-start-1 row-start-1"
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round">
          <circle cx="12" cy="12" r="5" />
          <path
            d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </svg>
      </label>
    </div>

    <div class="join lg:join-horizontal flex items-center justify-center mt-5">
      <!-- ปุ่ม Get Code -->
      <RouterLink :to="{ name: 'code' }">
        <button class="btn btn-success join-item">
          <font-awesome-icon icon="fa-solid fa-code" /> Get Code
        </button>
      </RouterLink>

      <!-- ปุ่ม Save Code -->
      <RouterLink v-if="authStore.user" :to="{ name: 'CreateCode' }">
        <button class="btn btn-warning join-item">
          <font-awesome-icon icon="fa-regular fa-floppy-disk" /> Save Code
        </button>
      </RouterLink>

      <!-- ปุ่ม Login/Logout -->
      <button
        v-if="!authStore.user"
        @click="authStore.loginWithGoogle"
        class="btn btn-secondary join-item"
      >
        <font-awesome-icon icon="fa-solid fa-right-to-bracket" /> Login
      </button>
      <button
        v-else
        @click="authStore.logout"
        class="btn btn-error join-item"
      >
        <font-awesome-icon icon="fa-solid fa-right-from-bracket" /> Logout
      </button>
    </div>
  </div>
</template>
