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
        ref="inputRefs[feild]"
        v-model="texts[feild]"
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
        <el-button plain type="primary" @click="resetContent">{{ $t('result.reset') }}</el-button>
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
const feilds = props.domain.texts ? Object.keys(props.domain.texts) : []
const t = useNuxtApp().$i18n.t
const texts = ref({})
for (const feild of feilds) {
  inputRefs[feild] = ref(null)
  texts.value[feild] = props.domain.texts[feild]
}
const loading = ref(false)
const content = ref(props.domain.content)

async function submitContent() {
  try {
    loading.value = true
    const changes = {}
    let changed = false
    for (const feild of feilds) {
      if (texts.value[feild] != props.domain.texts[feild]) {
        changes[feild] = texts.value[feild]
        changed = true
      }
    }
    if (!changed) return
    await API.setTexts(props.domain.name, changes)
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
    texts.value[feild] = props.domain.texts[feild]
  }
  inputRefs[feilds[0]].value.focus
}
</script>
