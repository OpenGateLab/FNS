<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { wallet } from '~/libs/wallet'
import { useDomainsStore, useAccountStore } from '~/store'
import { TipError } from '~/libs/utils'
import { LoginResponse } from '~/libs/model'
interface NonceResponse {
  publicAddress: string
  nonce: string
}

const accountStore = useAccountStore()
const router = useRouter()
useDomainsStore()

onMounted(async () => {
  console.log(useRuntimeConfig().public.apiBase)
  if (router.currentRoute.value.query.hasOwnProperty('code'))
    accountStore.setInviteId(router.currentRoute.value.query.code)
  await wallet.connect()
  if (accountStore.account && accountStore.logined) {
    if (accountStore.account !== accountStore.publicAddress) {
      accountStore.loginOut()
      await login()
    }
  } else if (accountStore.account) await login()
  watch(
    () => accountStore.connected,
    (newVal, oldVal) => {
      console.log('connect', newVal, oldVal)
      if (newVal) login()
    }
  )
})

const { locale } = useI18n()
const defaultLocaleCode = locale.value
if (process.client) {
  locale.value = accountStore.language ?? defaultLocaleCode
}

const login = async () => {
  try {
    const data = await $fetch<NonceResponse>(`/api/Account/nonce/${accountStore.account}`, {
      baseURL: useRuntimeConfig().public.apiBase
    })
    console.log(data)
    const signature = await wallet.signature(data.nonce)
    console.log(signature)
    if (signature) {
      const loginData = await $fetch<LoginResponse>('/api/Account/login', {
        baseURL: useRuntimeConfig().public.apiBase,
        method: 'POST',
        body: {
          publicAddress: accountStore.account,
          signature,
          inviterCode: accountStore.inviteId
        }
      })
      console.log(loginData)
      accountStore.loginIn(loginData)
    }
  } catch (e) {
    console.log(e)
    if (typeof e === 'string') {
      TipError(e)
    } else if (e instanceof Error) {
      TipError(e.message)
    }
  }
}
</script>
