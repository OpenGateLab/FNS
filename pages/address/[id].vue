<template>
  <div v-loading="loading" class="flex-1 p-4 max-w-full sm:w-auto">
    <!-- :domains="relation.reverses" -->
    <AddressBar :address="relation.address" />
    <el-alert
      v-if="relation.domains.length"
      :title="`${$t('fns.primary')}: ${relation.reverses}`"
      type="success"
      :description="$t('fns.register')"
      class="!mb-4"
      :closable="false"
      show-icon
    />
    <el-alert
      v-else
      :title="`${$t('fns.primary')}:${$t('result.notSet')}`"
      type="warning"
      :description="$t('fns.register2')"
      class="!mb-4"
      :closable="false"
      show-icon
    />

    <el-tabs type="border-card" class="rounded overflow-hidden">
      <el-tab-pane>
        <template #label>
          <span class="flex-center">
            <el-icon>
              <UserFilled />
            </el-icon>
            <span class="ml-1">{{ $t('result.registrant') }}</span>
          </span>
        </template>
        <AddressTabRegisteredDomains
          :primary-name="relation.reverses"
          :data="relation.registrant"
          :is-mine="isMine"
        />
      </el-tab-pane>
      <el-tab-pane :label="$t('domain.address')">
        <template #label>
          <span class="flex-center">
            <el-icon>
              <User />
            </el-icon>
            <span class="ml-1">{{ $t('result.controller') }}</span>
          </span>
        </template>
        <AddressTabManagedDomains :data="relation.controller" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import API from '~/libs/api'
import { NoteError } from '~~/composables'
import { eventHub } from '~~/libs/event-hub'
import { useAccountStore } from '~/store'

const loading = ref(true)
const route = useRoute()
const t = useNuxtApp().$i18n.t
const { account } = storeToRefs(useAccountStore())
const relation = reactive({
  address: route.params.id,
  reverses: '', // [],
  domains: [],
  registrant: [],
  controller: [],
  setResolver: false
})
const isMine = computed(() => account.value === relation.address)

async function getAddressRelation() {
  loading.value = true
  const reverses = await API.findReverseViaAddress(relation.address)
  relation.reverses = reverses[0]
  relation.setResolver = reverses[1]
  // if (!reverses) return
  // relation.reverses = Array.isArray(reverses) ? reverses : [reverses]

  try {
    const domains = await API.findNamesViaAddress(relation.address)
    if (!domains) return
    relation.domains = Array.isArray(domains) ? domains : [domains]
    // relation.registrant = await Promise.all(relation.domains.map(domain => API.getNameInfo(domain)))
    relation.registrant = relation.domains.map((domain: any) => {
      return {
        name: domain.name,
        tokenId: domain.tokenId,
        available: false,
        address: '',
        expires: '',
        contenthash: '',
        registrant: '',
        controller: '',
        texts: {},
        coins: {}
      }
    })
  } catch (error) {
    NoteError(t('error.record'))
  } finally {
    loading.value = false
  }
}

eventHub.on('update', getAddressRelation)
onUnmounted(() => eventHub.off('update'))
onMounted(getAddressRelation)
</script>
