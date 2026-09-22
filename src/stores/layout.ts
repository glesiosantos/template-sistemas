import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLayoutStore = defineStore('layout', () => {
  const mobileDrawerOpen = ref(false)
  const openMobileDrawer = () => { mobileDrawerOpen.value = true }
  const closeMobileDrawer = () => { mobileDrawerOpen.value = false }
  const toggleMobileDrawer = () => { mobileDrawerOpen.value = !mobileDrawerOpen.value }
  return { mobileDrawerOpen, openMobileDrawer, closeMobileDrawer, toggleMobileDrawer }
})
