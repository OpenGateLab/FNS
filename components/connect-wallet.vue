<template>
  <div class="flex sm:flex-row flex-col items-center text-gray-500 font-light">
    <template v-if="accountStore.connected">
      <client-only>
        <el-popover placement="bottom" width="auto" trigger="hover">
          <template #reference>
            <div class="flex flex-col items-center sm:mr-2 mr-0">
              <el-tag effect="dark" style="background-color: #e7b31d; border: 0">{{
                accountStore.network
              }}</el-tag>
              <span> {{ accountStore.shortAccount }}</span>
            </div>
          </template>
          <template #default>
            <div class="flex flex-col items-center">
              <div class="flex flex-row items-center">
                <h6 class="text-gray-600 text-sm">{{ $t('menu.referral') }}</h6>
                <el-icon
                  v-if="accountStore.logined"
                  class="ml-2 cursor-pointer"
                  @click="copyReferral"
                  ><Share
                /></el-icon>
              </div>
              <NuxtLink to="/referral">
                <div class="text-black mt-1 flex flex-row items-center">
                  <span class="text-base">{{ accountStore.inviteCode }}</span
                  ><el-icon size="1rem" class="bg-white border text-base rounded-full ml-2"
                    ><ArrowRight
                  /></el-icon>
                </div>
              </NuxtLink>
            </div>
          </template>
        </el-popover>
      </client-only>
    </template>
    <div
      class="border rounded-md px-2 sm:px-4 lg:px-6 py-1 text-center transition cursor-pointer"
      style="background-color: #0092fa; color: white"
      @click="accountStore.connected ? wallet.disconnect() : wallet.connect()"
    >
      {{ accountStore.connected ? $t('wallet.disconnect') : $t('wallet.connect') }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { wallet } from '~/libs/wallet'
import { useAccountStore } from '~/store'
import { Copy } from '~/libs/utils'
const t = useNuxtApp().$i18n.t

const accountStore = useAccountStore()
const copyReferral = () => {
  Copy(`${window.location.origin}?code=${accountStore.inviteCode}`, t('tip.copyLink'))
}
</script>
