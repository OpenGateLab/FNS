<template>
  <div
    v-loading="loading"
    :element-loading-text="$t('result.loading')"
    class="p-4 flex-1 flex flex-col items-end max-w-full md:w-auto overflow-x-auto"
  >
    <div v-if="accountStore.logined" class="flex flex-col sm:flex-row items-center w-full mb-4">
      <div class="bg-[#f3f8fe] p-4 text-xl text-black w-full sm:w-auto flex-1">
        {{ $t('referral.tip') }}
      </div>
      <div
        class="flex flex-row ml-0 sm:ml-8 mt-3 sm:mt-0 flex-1 justify-center items-end sm:justify-start w-full sm:w-auto"
      >
        <div class="flex flex-col items-center mr-4">
          <h6>{{ $t('referral.id') }}</h6>
          <p class="border-b px-4">{{ accountStore.inviteCode }}</p>
        </div>
        <el-button size="large" type="primary" @click="copyLink">{{
          $t('referral.share')
        }}</el-button>
      </div>
    </div>
    <el-table border size="large" header-cell-class-name="!bg-gray-100" :data="users" stripe>
      <el-table-column
        prop="publicAddress"
        :label="$t('domain.address')"
        class-name="font-mono"
        sortable
      >
        <template #default="scope">
          <span class="flex-center justify-start">
            {{ scope.row.publicAddress }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="expires"
        :label="$t('result.date')"
        align="center"
        width="300"
        sortable
      >
        <template #default="scope">
          <el-tag disable-transitions>{{ scope.row.creationDate.toLocaleString() }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from '~/store'
import { TipError } from '~~/composables'
import { Copy } from '~/libs/utils'

interface SubUser {
  address: string
  nonce: string
  email: string
  creationDate: Date
  fullName: string
  id: string
  inviterId: string
  isActive: boolean
  myInviterNumber: number
  phoneNumber: string
  publicAddress: string
  role: string
}

const loading = ref(false)
const accountStore = useAccountStore()
const users = ref<SubUser[]>([])
const t = useNuxtApp().$i18n.t

async function getSubUsers() {
  if (!accountStore.logined) {
    users.value = []
    return
  }
  try {
    loading.value = true
    const data = await $fetch<SubUser[]>(`/api/Account/getSubUsers/${accountStore.id}`, {
      baseURL: useRuntimeConfig().public.apiBase
    })
    console.log(data)
    users.value = data
  } catch (e) {
    console.log(e)
    if (typeof e === 'string') {
      TipError(e)
    } else if (e instanceof Error) {
      TipError(e.message)
    }
  } finally {
    loading.value = false
  }
}

const copyLink = () => {
  Copy(`${window.location.origin}?code=${accountStore.inviteCode}`, t('tip.copyLink'))
}

watchEffect(getSubUsers)
</script>

<style scoped lang="less"></style>
