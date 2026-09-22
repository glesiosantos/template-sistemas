<script setup lang="ts">
import { computed, ref } from 'vue'
import { CalendarDays, CircleHelp, DollarSign, LayoutDashboard, MoreVertical, Settings, Users, WandSparkles, type LucideIcon } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import { useLayoutStore } from '../../stores/layout'
import SidebarNavItem from './SidebarNavItem.vue'

const props = withDefaults(defineProps<{ mobile?: boolean }>(), { mobile: false })
const emit = defineEmits<{ navigate: [] }>()
const layout = useLayoutStore()
const isHovered = ref(false)
const userMenuOpen = ref(false)
const isExpanded = computed(() => props.mobile || isHovered.value || layout.sidebarPinned || userMenuOpen.value)

interface NavItem { label: string; icon: LucideIcon; route: string }
const topItems: NavItem[] = [
  { label: 'Visão geral', icon: LayoutDashboard, route: '/' },
  { label: 'Agenda', icon: CalendarDays, route: '/agenda' },
  { label: 'Financeiro', icon: DollarSign, route: '/financeiro' },
  { label: 'Automações', icon: WandSparkles, route: '/automacoes' },
  { label: 'Usuários', icon: Users, route: '/usuarios' },
]
const bottomItems: NavItem[] = [
  { label: 'Ajuda', icon: CircleHelp, route: '/ajuda' },
  { label: 'Configurações', icon: Settings, route: '/configuracoes/atendimentos' },
]
function closeUserMenu() { userMenuOpen.value = false }
</script>

<template>
  <aside class="border-[var(--color-border)] bg-white py-5" :class="props.mobile ? 'flex h-auto w-full shrink-0 flex-col overflow-hidden border-b' : 'fixed inset-y-0 left-0 z-40 hidden h-dvh flex-col overflow-hidden border-r transition-[width] duration-300 ease-in-out lg:flex ' + (isExpanded ? 'w-[235px] shadow-lg' : 'w-[72px]')" aria-label="Navegação principal" @mouseenter="!props.mobile && (isHovered = true)" @mouseleave="!props.mobile && (isHovered = false)">
    <div class="flex min-h-0 flex-1 flex-col px-4">
      <RouterLink to="/" class="mb-7 flex h-10 shrink-0 items-center overflow-hidden rounded-full border border-[var(--color-border)] transition-[width] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime-500" :class="isExpanded ? 'w-full justify-start gap-3 px-3' : 'mx-auto w-10 justify-center'" aria-label="Consultório">
        <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-lime-100 text-sm">⌖</span>
        <span class="min-w-0 overflow-hidden whitespace-nowrap transition-[opacity] duration-150" :class="isExpanded ? 'visible opacity-100 delay-100' : 'invisible w-0 opacity-0'"><span class="block text-xs text-neutral-500">Consultório</span><span class="block truncate text-xs font-medium text-neutral-800">Glêsio Santos da Silva</span></span>
      </RouterLink>

      <nav class="flex flex-col gap-2" aria-label="Navegação principal">
        <SidebarNavItem v-for="item in topItems" :key="item.label" :icon="item.icon" :label="item.label" :route="item.route" :expanded="isExpanded" @navigate="emit('navigate')" />
      </nav>
      <div class="min-h-0 flex-1" />

      <section class="overflow-hidden transition-[max-height,opacity,margin] duration-200" :class="isExpanded ? 'mb-5 max-h-48 opacity-100' : 'mb-0 max-h-0 opacity-0'" aria-label="Novidades">
        <div class="rounded-2xl bg-neutral-50 p-4"><p class="text-[10px] font-semibold uppercase tracking-widest text-neutral-400">Novidades</p><p class="mt-3 text-sm leading-5 text-neutral-700">Veja o que chegou de novo</p><RouterLink to="/" class="mt-3 inline-block text-xs font-medium text-neutral-900 underline underline-offset-2">Ver novidades</RouterLink></div>
      </section>

      <nav class="flex shrink-0 flex-col gap-2" aria-label="Navegação secundária">
        <SidebarNavItem v-for="item in bottomItems" :key="item.label" :icon="item.icon" :label="item.label" :route="item.route" :expanded="isExpanded" @navigate="emit('navigate')" />
      </nav>

      <div class="relative mt-4 flex h-10 shrink-0 items-center overflow-visible rounded-full bg-neutral-800 text-white" :class="isExpanded ? 'justify-start gap-3 px-2' : 'mx-auto w-10 justify-center'">
        <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-600 text-xs font-medium">GS</span>
        <span class="min-w-0 flex-1 truncate whitespace-nowrap text-xs transition-[opacity] duration-150" :class="isExpanded ? 'visible opacity-100 delay-100' : 'invisible w-0 opacity-0'">Glêsio Santos da Silva</span>
        <button v-if="isExpanded" aria-label="Abrir menu do usuário" class="shrink-0 rounded-full p-1 hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime-300" :aria-expanded="userMenuOpen" @click="userMenuOpen = !userMenuOpen"><MoreVertical :size="16" /></button>
        <div v-if="userMenuOpen" class="absolute bottom-12 right-0 z-50 w-44 rounded-xl border border-[var(--color-border)] bg-white p-1.5 text-sm text-neutral-700 shadow-xl"><RouterLink to="/" class="block rounded-lg px-3 py-2 hover:bg-neutral-100" @click="closeUserMenu">Minha conta</RouterLink><RouterLink to="/" class="block rounded-lg px-3 py-2 hover:bg-neutral-100" @click="closeUserMenu">Trocar empresa</RouterLink><button class="block w-full rounded-lg px-3 py-2 text-left hover:bg-neutral-100" @click="closeUserMenu">Sair</button></div>
      </div>
    </div>
  </aside>
</template>
