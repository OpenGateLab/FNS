<template>
  <div
    v-loading="loading"
    class="px-4 py-10 flex flex-col items-center rounded"
    :element-loading-text="$t('result.submitting')"
  >
    <div class="w-2/3 lg:w-1/2">
      <el-input
        v-for="feild in feilds"
        :key="feild"
        v-model="coins[feild]"
        maxlength="50"
        class="mt-5"
        size="large"
        :clearable="true"
        :placeholder="$t('result.notSet')"
      >
        <template #prepend>
          <div class="min-w-32 text-center font-bold">{{ feild }}</div>
        </template>
      </el-input>

      <div class="mt-10 flex-center">
        <el-button plain type="primary" @click="resetContent">Reset</el-button>
        <el-button type="primary" :disabled="!content" @click="submitContent">{{
          $t('result.submit')
        }}</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TipError, TipSuccess } from '~~/libs/utils'
import API from '~~/libs/api'
const props = withDefaults(defineProps<{ domain?: any }>(), { domain: () => {} })
const inputRefs = {}
const feilds = props.domain.coins ? Object.keys(props.domain.coins) : []
const coins = ref({})
for (const feild of feilds) {
  inputRefs[feild] = ref(null)
  coins.value[feild] = props.domain.coins[feild]
}
const loading = ref(false)
const content = ref(props.domain.content)
const t = useNuxtApp().$i18n.t

async function submitContent() {
  try {
    loading.value = true
    const changes = {}
    let changed = false
    for (const feild of feilds) {
      if (coins.value[feild] != props.domain.coins[feild]) {
        changes[feild] = coins.value[feild]
        changed = true
      }
    }
    if (!changed) return
    await API.setAddresss(props.domain.name, changes)
    TipSuccess(t('tip.submit'))
  } catch (error) {
    TipError(t('error.submit'))
    console.error(error)
  } finally {
    loading.value = false
  }
}

function resetContent() {
  for (const feild of feilds) {
    coins.value[feild] = props.domain.coins[feild]
  }
  inputRefs[feilds[0]].value.focus
}
</script>
