<script setup>
import { ref } from "vue";
import axios from "axios";

// State variables
const code = ref(""); // เก็บข้อความจาก textarea
const message = ref(""); // ข้อความแสดงผลหลังการบันทึก
const messageClass = ref(""); // คลาส CSS สำหรับข้อความ

// URL ของ Web App
const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbyg3FXC4lQAR1lVODVPOjAqIq5vYEWvRhM5bYTOl6BAqIgbKC5o4VQfmuedSsmkeSaf/exec"; // แทนที่ด้วย URL ของ Apps Script

// ฟังก์ชันบันทึกโค้ด
const saveCode = async () => {
  if (!code.value.trim()) {
    message.value = "Please enter some code!";
    messageClass.value = "text-red-500";
    return;
  }

  try {
    // ส่งคำขอผ่าน axios
    const response = await axios.get(WEB_APP_URL, {
      params: { code: code.value }, // ส่งพารามิเตอร์ผ่าน URL
    });

    // ตรวจสอบสถานะการตอบกลับ
    if (response.data.status === "success") {
      message.value = "Code saved successfully!";
      messageClass.value = "text-green-500";
      code.value = ""; // ล้างฟอร์ม
    } else {
      message.value = `Error: ${response.data.message}`;
      messageClass.value = "text-red-500";
    }
  } catch (error) {
    // จัดการข้อผิดพลาด
    message.value = `Network error: ${error.message}`;
    messageClass.value = "text-red-500";
  }
};
</script>

<template>
  <div class="bg-gray-100 min-h-screen flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
      <h1 class="text-2xl font-bold mb-4 text-gray-800">
        Save your code
      </h1>
      <form @submit.prevent="saveCode" class="space-y-4">
        <!-- Textarea -->
        <div>
          <label for="codeInput" class="block text-gray-700 font-medium mb-2">
            Paste your code here:
          </label>
          <textarea
            id="codeInput"
            v-model="code"
            rows="10"
            class="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-300 focus:outline-none"
            placeholder="Enter your code here..."
          ></textarea>
        </div>
        <!-- Save Button -->
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Save
        </button>
      </form>
      <!-- Message -->
      <div v-if="message" :class="messageClass" class="mt-4 text-center text-sm">
        {{ message }}
      </div>
    </div>
  </div>
</template>
