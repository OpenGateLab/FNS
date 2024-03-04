<template>
  <div
    v-loading="loading"
    class="px-4 py-10 flex flex-col items-center rounded"
    :element-loading-text="$t('result.submitting')"
  >
    <div class="w-2/3 lg:w-1/2">
      <el-alert type="success" :closable="false" class="!p-5">
        <template #title>
          <span class="flex-center justify-start">
            <span class="text-2xl font-semibold font-mono">{{ domain.name }}</span>
            <template v-if="address">
              <el-icon class="mx-2"><Right /></el-icon>
              <el-tag effect="dark" type="success">{{ address }}</el-tag>
            </template>
          </span>
        </template>
        <span class="text-sm font-extralight">{{ $t('domain.pleaseSetAddress') }}</span>
      </el-alert>
      <el-input
        ref="addressInput"
        v-model="address"
        maxlength="50"
        class="mt-5"
        size="large"
        :clearable="true"
        :placeholder="$t('hint.association')"
      >
        <template #prepend>
          <div class="min-w-32 text-center font-bold">{{ $t('domain.address') }}</div>
        </template>
      </el-input>
      <div class="mt-10 flex-center">
        <el-button plain type="primary" @click="resetAddress">{{ $t('result.reset') }}</el-button>
        <el-button
          v-if="!canSubmit && props.domain.tokenId"
          type="primary"
          :disabled="!accountStore.connected"
          @click="reclaimAddress"
          >{{ $t('result.reclaim') }}</el-button
        >
        <el-button
          v-if="canSubmit"
          type="primary"
          :disabled="!address || !accountStore.connected"
          @click="submitAddress"
          >{{ $t('result.submit') }}</el-button
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TipError, TipSuccess } from '~~/libs/utils'
import API from '~~/libs/api'
import { eventHub } from '~~/libs/event-hub'
import { useAccountStore } from '~/store'
const props = withDefaults(defineProps<{ domain?: any }>(), { domain: () => {} })
console.log('domain', props.domain)
const accountStore = useAccountStore()
const t = useNuxtApp().$i18n.t
const loading = ref(false)
const addressInput = ref(null)
const address = ref(props.domain.address)
const canSubmit = ref(false)

async function getCanSetResolver() {
  loading.value = true
  const owner = await API.findClaimOwner(props.domain.name)
  canSubmit.value = accountStore.account === owner.toString().toLowerCase()
  loading.value = false
}

onMounted(() => {
  getCanSetResolver()
  eventHub.on('update', getCanSetResolver)
})

onUnmounted(() => eventHub.off('update'))

async function submitAddress() {
  try {
    loading.value = true
    await API.setAddress(props.domain.name, address.value)
    TipSuccess(t('tip.submit'))
  } catch (error) {
    TipError(t('error.submit'))
    console.error(error)
  } finally {
    loading.value = false
  }
}

async function reclaimAddress() {
  try {
    loading.value = true
    await API.reclaim(props.domain.tokenId, accountStore.account)
    TipSuccess(t('tip.submit'))
  } catch (error) {
    TipError(t('error.submit'))
    console.error(error)
  } finally {
    loading.value = false
  }
}

function resetAddress() {
  address.value = ''
  addressInput.value.focus()
}
</script>
