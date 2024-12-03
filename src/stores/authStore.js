import { defineStore } from 'pinia';
import { getAuth, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { provider } from '../firebase';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isLoading: true, // ใช้สำหรับตรวจสอบสถานะการโหลด
  }),
  actions: {
    async loginWithGoogle() {
      const auth = getAuth();
      try {
        const result = await signInWithPopup(auth, provider);
        this.user = result.user; // บันทึกข้อมูลผู้ใช้
      } catch (error) {
        console.error('Login failed:', error);
      }
    },
    async logout() {
      const auth = getAuth();
      try {
        await signOut(auth);
        this.user = null; // เคลียร์สถานะผู้ใช้
      } catch (error) {
        console.error('Logout failed:', error);
      }
    },
    initAuthState() {
      const auth = getAuth();
      onAuthStateChanged(auth, (firebaseUser) => {
        this.user = firebaseUser;
        this.isLoading = false;
      });
    },
  },
});
