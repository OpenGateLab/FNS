<template>
  <div
    v-loading="loading"
    class="px-4 py-10 flex flex-col items-center rounded"
    :element-loading-text="$t('result.submitting')"
  >
    <div class="w-2/3 lg:w-1/2">
      <el-alert type="warning" :closable="false" class="!p-5">
        <template #title>
          <span class="text-2xl font-semibold font-mono">{{ domain.name }}</span>
        </template>
        <span class="text-sm font-extralight"
          >{{ $t('domain.pleaseSet') }}</span
        >
      </el-alert>
      <el-input
        ref="contentInput"
        v-model="content"
        maxlength="50"
        class="mt-5"
        size="large"
        :clearable="true"
        :placeholder="$t('domain.content')"
      >
        <template #prepend>
          <div class="min-w-32 text-center font-bold">Content</div>
        </template>
      </el-input>
      <div class="mt-10 flex-center">
        <el-button plain type="primary" @click="resetContent">{{ $t('result.reset') }}</el-button>
        <el-button type="primary" :disabled="!content" @click="submitContent">{{ $t('result.submit') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TipError, TipSuccess } from '~~/libs/utils'
import API from '~~/libs/api'
const props = withDefaults(defineProps<{ domain?: any }>(), { domain: () => {} })

const loading = ref(false)
const contentInput = ref(null)
const content = ref(props.domain.content)
const t = useNuxtApp().$i18n.t

async function submitContent() {
  try {
    loading.value = true
    await API.setContent(props.domain.name, content.value)
    TipSuccess(t('tip.submit'))
  } catch (error) {
    TipError(t('error.submit'))
    console.error(error)
  } finally {
    loading.value = false
  }
}

function resetContent() {
  content.value = ''
  contentInput.value.focus()
}
</script>
