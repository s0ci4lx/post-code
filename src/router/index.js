import { createRouter, createWebHistory } from 'vue-router';
import ShowCode from '../views/ShowCodeView.vue';
import CreateCode from '../views/CreateCodeView.vue';
import Home from '../views/HomeView.vue';
import { getAuth } from "firebase/auth";

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

// Helper function for checking auth status
const checkAuth = () => {
  return new Promise((resolve) => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe(); // ยกเลิก listener เพื่อป้องกันการทำงานซ้ำ
      resolve(user); // คืนค่าผู้ใช้ (ถ้าไม่ได้ล็อกอิน user จะเป็น null)
    });
  });
};

// Global Navigation Guard
router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const currentUser = await checkAuth(); // รอผลจาก checkAuth()
    if (!currentUser) {
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

export default router;
