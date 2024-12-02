<script setup>
import { ref, onMounted } from "vue";
import axios from "axios"; // นำเข้า axios
import 'highlight.js/styles/monokai-sublime.min.css'; // ใช้ธีมจาก Highlight.js
const codetext = ref(""); // เก็บข้อความโค้ดที่ดึงมาจาก Google Sheet
const btnCopy = ref("Copy");
const loading = ref(true); // สถานะโหลดข้อมูล
const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbyzYo2TdOwW4Q58tb4jK2p8votEZf_xnlvyFUfqwYze6NiqrFJ-gQFyQ7M1d_ym3mfH/exec"; // ใส่ URL ของ Apps Script Web App

// ฟังก์ชันสำหรับดึงข้อมูลจาก Google Sheet
const fetchCode = async () => {
  try {
    loading.value = true;
    const response = await axios.get(WEB_APP_URL); // ใช้ axios ดึงข้อมูลจาก Web App
    const result = response.data; // เอาข้อมูลจาก axios ที่ตอบกลับ

    codetext.value = result[0].code; // อัปเดตค่า codetext จากข้อมูลใน Google Sheet
  } catch (error) {
    console.log(`Error fetching code: ${error}`);
  } finally {
    loading.value = false;
  }
};

// ฟังก์ชันคัดลอกข้อความ
const copyCode = async (code) => {
  if (!code) {
    btnCopy.value = "No code to copy";
    setTimeout(() => {
      btnCopy.value = "Copy";
    }, 3000);
    return;
  }

  btnCopy.value = "✓ Copied";
  try {
    await navigator.clipboard.writeText(code);
    setTimeout(() => {
      btnCopy.value = "Copy";
    }, 3000);
  } catch (err) {
    btnCopy.value = "Failed to copy";
    console.log("Error", err);
    setTimeout(() => {
      btnCopy.value = "Copy";
    }, 3000);
  }
};

// ดึงข้อมูลโค้ดเมื่อหน้าเว็บโหลด
onMounted(() => {
  fetchCode();
});
</script>

<template>
  <div class="relative ">
    <div class="ms-8 mt-8">
      
      <button
        @click="copyCode(codetext)"
        type="button"
        class="stikey text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
      <font-awesome-icon icon="fa-regular fa-copy" v-show="btnCopy == 'Copy'" /> {{ btnCopy }}
      </button>
    </div>

    <div class="mockup-code ms-8 mt-2 mb-2 me-8">
      <div class="code-area ps-5">
        <!-- แสดงสถานะ Loading หรือ Error -->
        <div v-if="loading" class="text-center text-gray-500">Loading...</div>
        <div v-if="errorMessage" class="text-center text-red-500">
          {{ errorMessage }}
        </div>

        <!-- แสดงโค้ด -->
        <pre v-if="!loading" v-highlightjs><code class="language-javascript">{{ codetext }}
  
        </code>
      </pre>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* ใช้ Tailwind CSS สำหรับจัดสไตล์เพิ่มเติม */

</style>