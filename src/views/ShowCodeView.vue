<script setup>
import { ref, onMounted } from "vue";

const codetext = ref(""); // เก็บข้อความโค้ดที่ดึงมาจาก Google Sheet
const btnCopy = ref("Copy");
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyzYo2TdOwW4Q58tb4jK2p8votEZf_xnlvyFUfqwYze6NiqrFJ-gQFyQ7M1d_ym3mfH/exec"; // ใส่ URL ของ Apps Script Web App

// ฟังก์ชันสำหรับดึงข้อมูลจาก Google Sheet
const fetchCode = async () => {
  try {
    const response = await fetch(WEB_APP_URL);
    const result = await response.json();

    if (result.status === "success") {
      codetext.value = result.code; // อัปเดตค่า codetext จากข้อมูลใน Google Sheet
    } else {
      console.error("Error fetching code:", result.message);
    }
  } catch (error) {
    console.error("Error fetching code:", error.message);
  }
};

// ฟังก์ชันคัดลอกข้อความ
const copyCode = async (code) => {
  btnCopy.value = "Copied";
  try {
    await navigator.clipboard.writeText(code);
    setTimeout(() => {
      btnCopy.value = "Copy";
    }, 3000);
  } catch (err) {
    console.log("Error", err);
  }
};

// ดึงข้อมูลโค้ดเมื่อหน้าเว็บโหลด
onMounted(() => {
  fetchCode();
});
</script>

<template>
  <div class="mockup-code m-8">
    <div class="code-area px-12">
      <pre data-prefix="Code:"><br /><code>{{ codetext }}</code></pre>
      <button
        @click="copyCode(codetext)"
        type="button"
        class="absolute top-1 right-1 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        {{ btnCopy }}
      </button>
    </div>
  </div>
</template>
