import { createRouter, createWebHistory } from 'vue-router';
import ShowCode from '../views/ShowCodeView.vue';
import CreateCode from '../views/CreateCodeView.vue';
import Home from '../views/HomeView.vue';
import { getAuth, onAuthStateChanged } from "firebase/auth"; // ใช้ onAuthStateChanged เพื่อตรวจสอบสถานะผู้ใช้

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/code',
      name: 'code',
      component: ShowCode,
    },
    {
      path: '/postcode',
      name: 'CreateCode',
      component: CreateCode,
      meta: { requiresAuth: true }, // ระบุว่า route นี้ต้องล็อกอินก่อน
    },
  ],
});

// Global Navigation Guard
router.beforeEach((to, from, next) => {
  const auth = getAuth();

  // ตรวจสอบสถานะผู้ใช้แบบ asynchronous โดยใช้ Promise
  onAuthStateChanged(auth, (currentUser) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (!currentUser) {
        // หากยังไม่ได้ล็อกอิน ให้ redirect ไปหน้า Home
        next({
          path: '/',
          query: { redirect: to.fullPath }, // เก็บ path ที่ต้องการ redirect กลับ
        });
      } else {
        next(); // ให้ผ่านถ้าล็อกอินแล้ว
      }
    } else {
      next(); // ให้ผ่านถ้า route ไม่ต้องล็อกอิน
    }
  });
});

export default router;
