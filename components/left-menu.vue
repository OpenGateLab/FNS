<template>
  <div class="p-4 pr-0">
    <el-menu router class="wh-full pr-6" :default-active="$route.path" active-text-color="#0092FA">
      <el-menu-item index="/">
        <el-icon><Search /></el-icon>
        <span class="text-xl font-light">{{ $t('menu.search') }}</span>
      </el-menu-item>
      <el-menu-item
        v-if="accountStore.connected"
        :index="`/address/${accountStore.$state.account}`"
      >
        <el-icon><User /></el-icon>
        <span class="text-xl font-light">{{ $t('menu.domain') }}</span>
      </el-menu-item>
      <el-menu-item index="#" @click="onCLickOpenFaq">
        <el-icon><Finished /></el-icon>
        <span class="text-xl font-light">{{ $t('menu.faq') }}</span>
      </el-menu-item>
      <el-menu-item index="/favourite">
        <el-icon><Star /></el-icon>
        <span class="text-xl font-light">{{ $t('menu.fav') }}</span>
      </el-menu-item>
      <el-menu-item v-if="accountStore.logined" index="/referral">
        <el-icon><User /></el-icon>
        <span class="text-xl font-light">{{ $t('menu.referral') }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from '~/store'
const accountStore = useAccountStore()

function onCLickOpenFaq(event) {
  window.open('https://opengate-lab.gitbook.io/fns/overview/faq')
  event.preventDefault()
}
</script>
