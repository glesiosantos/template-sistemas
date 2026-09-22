<script setup lang="ts">
import { onBeforeUnmount, watch } from 'vue'
import AppSidebar from '../components/layout/AppSidebar.vue'
import SettingsSidebar from '../components/layout/SettingsSidebar.vue'
import MobileHeader from '../components/layout/MobileHeader.vue'
import MobileDrawer from '../components/layout/MobileDrawer.vue'
import { useLayoutStore } from '../stores/layout'
const layout = useLayoutStore()
watch(() => layout.mobileDrawerOpen, (open) => { document.body.style.overflow = open ? 'hidden' : '' })
onBeforeUnmount(() => { document.body.style.overflow = '' })
</script>
<template><div class="flex h-dvh min-h-0 overflow-hidden bg-white"><AppSidebar /><div class="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden lg:pl-[72px]"><MobileHeader @menu="layout.openMobileDrawer" /><MobileDrawer :open="layout.mobileDrawerOpen" @close="layout.closeMobileDrawer" /><div class="flex min-h-0 min-w-0 flex-1"><SettingsSidebar /><slot /></div></div></div></template>
