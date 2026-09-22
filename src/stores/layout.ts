import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLayoutStore = defineStore('layout', () => {
  const sidebarPinned = ref(false)
  const mobileDrawerOpen = ref(false)
  const toggleSidebarPinned = () => { sidebarPinned.value = !sidebarPinned.value }
  const openMobileDrawer = () => { mobileDrawerOpen.value = true }
  const closeMobileDrawer = () => { mobileDrawerOpen.value = false }
  const toggleMobileDrawer = () => { mobileDrawerOpen.value = !mobileDrawerOpen.value }
  // Compatibility aliases keep the store usable by both desktop and mobile layouts.
  const openMobileSidebar = openMobileDrawer
  const closeMobileSidebar = closeMobileDrawer
  const toggleMobileSidebar = toggleMobileDrawer
  return { sidebarPinned, mobileDrawerOpen, toggleSidebarPinned, openMobileDrawer, closeMobileDrawer, toggleMobileDrawer, openMobileSidebar, closeMobileSidebar, toggleMobileSidebar }
})
