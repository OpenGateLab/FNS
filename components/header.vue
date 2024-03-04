<template>
  <div class="bg-white sticky top-0 shadow-sm md:shadow-none lg:static lg:overflow-y-visible">
    <div class="max-w-screen px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center flex-row">
        <Logo />
        <div class="flex-1 px-2 md:px-8 flex flex-row justify-end">
          <HeaderNavs v-if="$route.path === '/'" class="hidden sm:flex flex-shrink-0" />
          <HeaderSearch v-else class="flex-1 mr-2 hidden sm:flex sm:md-4" />
        </div>
        <div class="flex items-center sm:hidden">
          <!-- Mobile menu button -->
          <button
            type="button"
            class="-mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            aria-expanded="false"
            @click="toggleMenu"
          >
            <span class="sr-only">Open menu</span>
            <svg
              v-if="!menuOpen"
              class="h-8 w-8"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="black"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            <svg
              v-else
              class="h-8 w-8"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="black"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <ClientOnly><connect-wallet class="hidden sm:flex" /></ClientOnly>
      </div>
      <HeaderSearch v-if="$route.path !== '/'" class="flex-1 block sm:hidden w-full mx-4 my-2" />
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <nav v-if="menuOpen" aria-label="Global">
      <div class="mx-auto max-w-3xl space-y-1 px-2 pt-2 pb-3 sm:px-4">
        <a
          target="_blank"
          href="https://opengate-lab.gitbook.io/fns/"
          class="bg-gray-100 text-gray-900 block rounded-md py-2 px-3 text-base font-medium text-center"
          @click="closeMenu"
          >{{ $t('menu.docs') }}</a
        >
        <a
          target="_blank"
          href="https://fil.opengatenft.com/#/fnslist"
          class="bg-gray-100 text-gray-900 block rounded-md py-2 px-3 text-base font-medium text-center"
          @click="closeMenu"
          >{{ $t('menu.market') }}</a
        >
        <NuxtLink
          to="/"
          class="bg-gray-100 text-gray-900 block rounded-md py-2 px-3 text-base font-medium text-center"
          @click="closeMenu"
          >{{ $t('menu.search') }}</NuxtLink
        >
        <NuxtLink
          v-if="isConnected"
          :to="`/address/${accountStore.$state.account}`"
          class="bg-gray-100 text-gray-900 block rounded-md py-2 px-3 text-base font-medium text-center"
          @click="closeMenu"
          >{{ $t('menu.domain') }}</NuxtLink
        >
        <a
          href="https://opengate-lab.gitbook.io/fns/overview/faq"
          class="bg-gray-100 text-gray-900 block rounded-md py-2 px-3 text-base font-medium text-center"
          @click="closeMenu"
          >{{ $t('menu.faq') }}</a
        >
        <NuxtLink
          to="/favourite"
          class="bg-gray-100 text-gray-900 block rounded-md py-2 px-3 text-base font-medium text-center"
          @click="closeMenu"
          >{{ $t('menu.fav') }}</NuxtLink
        >
        <NuxtLink
          to="/referral"
          class="bg-gray-100 text-gray-900 block rounded-md py-2 px-3 text-base font-medium text-center"
          @click="closeMenu"
          >{{ $t('menu.referral') }}</NuxtLink
        >
      </div>
      <div class="border-t border-gray-200 py-4">
        <ClientOnly><connect-wallet /></ClientOnly>
      </div>
    </nav>
  </div>
  <!--  <div
    class="flex sticky flex-row items-center justify-between px-4 sm:px-8 top-0 pt-2 divide-gray-500"
  >
    <Logo />
    <HeaderNavs v-if="$route.path === '/'" class="hidden sm:block" />
    <HeaderSearch v-else class="flex-1 mr-1/12" />
    <ConnectWallet class="hidden sm:block ml-auto" />
  </div>-->
</template>

<script setup lang="ts">
import { useAccountStore } from '~~/store'
const accountStore = useAccountStore()
const isConnected = computed(() => {
  return accountStore.connected
})

const menuOpen = ref(false)
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}
const closeMenu = () => {
  menuOpen.value = false
}
</script>
