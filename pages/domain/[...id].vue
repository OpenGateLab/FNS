<template>
  <div v-loading="loading" :element-loading-text="$t('result.loading')" class="flex-1 p-4">
    <DomainBar :name="domain.name" :address="domain.address" :available="domain.available" />
    <el-tabs v-model="activeTab" type="border-card" class="rounded overflow-hidden">
      <el-tab-pane name="base">
        <template #label>
          <span class="flex-center">
            <el-icon><DocumentCopy /></el-icon>
            <span class="ml-1">{{ $t('domain.base') }}</span>
          </span>
        </template>
        <DomainTabInfo :domain="domain" @register="activeTab = 'register'" />
      </el-tab-pane>

      <el-tab-pane v-if="domain.mine && accountStore.connected" name="address">
        <template #label>
          <span class="flex-center">
            <el-icon><Tickets /></el-icon>
            <span class="ml-1">{{ $t('domain.address') }}</span>
          </span>
        </template>
        <DomainTabAddress :domain="domain" />
      </el-tab-pane>

      <el-tab-pane v-if="domain.mine && accountStore.connected" name="text">
        <template #label>
          <span class="flex-center">
            <el-icon><Tickets /></el-icon>
            <span class="ml-1">{{ $t('domain.text') }}</span>
          </span>
        </template>
        <DomainTabText :domain="domain" />
      </el-tab-pane>

      <el-tab-pane v-if="domain.available && accountStore.connected" name="register">
        <template #label>
          <span class="flex-center">
            <el-icon><SetUp /></el-icon>
            <span class="ml-1">{{ $t('domain.register2') }}</span>
          </span>
        </template>
        <DomainTabRegister :domain="domain" />
      </el-tab-pane>

      <el-tab-pane v-if="domain.mine && accountStore.connected">
        <template #label>
          <span class="flex-center">
            <el-icon><Setting /></el-icon>
            <span class="ml-1">{{ $t('domain.resolver') }}</span>
          </span>
        </template>
        <DomainTabResolver :domain="domain" />
      </el-tab-pane>

      <el-tab-pane v-if="domain.mine && accountStore.connected">
        <template #label>
          <span class="flex-center">
            <el-icon><Setting /></el-icon>
            <span class="ml-1">{{ $t('result.content') }}</span>
          </span>
        </template>
        <DomainTabContent :domain="domain" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { traditionToSimple } from 'chinese-simple2traditional'
import { TipError } from '~~/composables'
import API from '~~/libs/api'
import { eventHub } from '~~/libs/event-hub'
import { useAccountStore } from '~~/store'
import { TipWarning, isDomainValid } from '~~/libs/utils'

function ConverterToSimplified(str) {
  const simplified = traditionToSimple(str)
  console.log(str + '=>' + simplified)
  return simplified
}

const accountStore = useAccountStore()
const loading = ref(true)
const route = useRoute()
const activeTab = ref('base')
const t = useNuxtApp().$i18n.t

const domain = reactive({
  name: ConverterToSimplified(route.params.id[0]),
  tokenId: route.params.id.length > 1 ? route.params.id[1] : '',
  content: '',
  address: '',
  available: false,
  parent: 'fil',
  registrant: '',
  controller: '',
  expires: '',
  mine: false,
  coins: {},
  texts: {}
})

async function getName() {
  try {
    if (!isDomainValid(domain.name)) {
      TipWarning(t('tip.searchSpecialChar'))
      return
    }
    loading.value = true
    const Name = await API.getNameInfo(domain.name)
    console.log('name info', Name)
    domain.available = Name.available
    domain.address = Name.address
    domain.expires = Name.expires
    domain.content = Name.contenthash
    domain.controller = Name.controller
    domain.registrant = Name.registrant
    domain.mine = domain.registrant.toLowerCase() === accountStore.$state.account.toLowerCase()
    domain.texts = Name.texts
    domain.coins = Name.coins
  } catch (error) {
    TipError(t('error.network'))
  } finally {
    loading.value = false
  }
}

eventHub.on('update', getName)
onUnmounted(() => eventHub.off('update'))
onMounted(getName)
</script>
