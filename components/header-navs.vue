<template>
  <ul class="text-gray-500 flex-row flex items-center mr-10 list-none">
    <!--    <li class="cursor-pointer hover:(opacity-70) transition">-->
    <!--      <a href="/">Home</a>-->
    <!--    </li>-->
    <!--    <el-divider direction="vertical" class="!mx-6 text-gray-200" />-->
    <!--    <li class="cursor-pointer hover:(opacity-70) transition">-->
    <!--      <a href="https://hyperspace.yoga/#faucet" target="_blank">Faucet</a>-->
    <!--    </li>-->
    <li class="cursor-pointer hover:(opacity-70) transition">
      <a target="_blank" href="https://opengate-lab.gitbook.io/fns/">{{ t('menu.docs') }}</a>
    </li>
    <el-divider direction="vertical" class="!mx-6 text-gray-200" />

    <li class="cursor-pointer hover:(opacity-70) transition">
      <a target="_blank" href="https://fil.opengatenft.com/#/fnslist">{{ t('menu.market') }}</a>
    </li>
    <el-divider direction="vertical" class="!mx-6 text-gray-200" />

    <template v-for="(nav, index) in navs" :key="nav.label">
      <li class="cursor-pointer hover:(opacity-70) transition">
        <NuxtLink :to="nav.path">{{ nav.label }}</NuxtLink>
      </li>
      <el-divider
        v-if="index < navs.length - 1"
        direction="vertical"
        class="md:!mx-6 !mx-2 text-gray-200"
      />
    </template>
  </ul>
</template>

<script setup lang="ts">
import { useAccountStore } from '~~/store'
const t = useNuxtApp().$i18n.t

const accountStore = useAccountStore()
const navs = computed(() => {
  const account = accountStore.$state.account
  if (accountStore.connected) {
    return [
      { label: t('menu.account'), path: `/address/${account}` },
      // { label: 'Favourite', path: '/favourite' },
      // { label: t('menu.docs'), path: '/faq' }
    ]
  }
  return [
    // { label: 'Favourite', path: '/favourite' },
    // { label: t('menu.docs'), path: '/faq' }
  ]
})
</script>
